<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SslCommerzRequestController extends Controller
{
    public function __invoke(Request $request, string $mode): JsonResponse
    {
        $payload = $request->input('payload', []);

        if (! is_array($payload)) {
            return response()->json([
                'ok' => false,
                'mode' => $mode,
                'message' => 'Payload must be an object.',
            ], 422);
        }

        [$method, $endpoint, $normalizedPayload] = $this->resolveRequest($mode, $payload);

        if ($endpoint === null) {
            return response()->json([
                'ok' => false,
                'mode' => $mode,
                'message' => 'Unsupported SSLCommerz mode.',
            ], 404);
        }

        try {
            $response = $this->sendRequest($method, $endpoint, $normalizedPayload);

            return response()->json([
                'ok' => $response->successful(),
                'mode' => $mode,
                'sandbox' => true,
                'endpoint' => $endpoint,
                'request' => [
                    'method' => $method,
                    'payload' => $normalizedPayload,
                ],
                'upstream' => [
                    'status' => $response->status(),
                    'content_type' => $response->header('Content-Type'),
                ],
                'result' => $this->parseResponseBody($response),
                'raw' => $response->body(),
            ], $response->successful() ? 200 : 502);
        } catch (\Throwable $exception) {
            return response()->json([
                'ok' => false,
                'mode' => $mode,
                'sandbox' => true,
                'endpoint' => $endpoint,
                'request' => [
                    'method' => $method,
                    'payload' => $normalizedPayload,
                ],
                'message' => 'Unable to complete the SSLCommerz sandbox request.',
                'error' => $exception->getMessage(),
            ], 502);
        }
    }

    protected function resolveRequest(string $mode, array $payload): array
    {
        return match ($mode) {
            'initiate' => [
                'POST',
                'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
                $payload,
            ],
            'validation' => [
                'GET',
                'https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php',
                $this->withDefaultFormat($payload),
            ],
            'refund' => [
                'GET',
                'https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php',
                $this->withDefaultFormat($payload),
            ],
            'transactionQuery' => [
                'GET',
                'https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php',
                $this->withDefaultFormat($payload),
            ],
            default => [null, null, $payload],
        };
    }

    protected function withDefaultFormat(array $payload): array
    {
        if (! isset($payload['format']) || $payload['format'] === '') {
            $payload['format'] = 'json';
        }

        return $payload;
    }

    protected function sendRequest(string $method, string $endpoint, array $payload): Response
    {
        $client = Http::timeout(45)
            ->connectTimeout(20)
            ->withHeaders([
                'Accept' => 'application/json, text/plain, */*',
            ]);

        if ($method === 'POST') {
            return $client->asForm()->post($endpoint, $payload);
        }

        return $client->get($endpoint, $payload);
    }

    protected function parseResponseBody(Response $response): mixed
    {
        $body = trim($response->body());

        if ($body === '') {
            return null;
        }

        $json = json_decode($body, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            return $json;
        }

        $xml = @simplexml_load_string($body);

        if ($xml !== false) {
            return json_decode(json_encode($xml), true);
        }

        parse_str($body, $queryStringData);

        if ($queryStringData !== []) {
            return $queryStringData;
        }

        return $body;
    }
}
