<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MockSslCommerzController extends Controller
{
    public function __invoke(Request $request, string $mode): JsonResponse
    {
        $payload = $request->input('payload', []);

        return response()->json(match ($mode) {
            'initiate' => $this->initiatePayload($payload),
            'validation' => $this->validationPayload($payload),
            'refund' => $this->refundPayload($payload),
            'transactionQuery' => $this->queryPayload($payload),
            default => [
                'request_type' => $mode,
                'sandbox' => true,
                'note' => 'Unsupported mock mode.',
            ],
        });
    }

    protected function initiatePayload(array $payload): array
    {
        $tranId = $payload['tran_id'] ?? 'session';

        return [
            'request_type' => 'initiate',
            'sandbox' => true,
            'status' => 'SUCCESS',
            'failedreason' => '',
            'sessionkey' => 'sandbox_mock_'.Str::lower(Str::random(8)),
            'GatewayPageURL' => "https://sandbox.sslcommerz.com/gwprocess/v4/mock/{$tranId}",
            'redirectGatewayURL' => "https://sandbox.sslcommerz.com/gwprocess/v4/mock/{$tranId}",
            'directPaymentURL' => "https://sandbox.sslcommerz.com/gwprocess/v4/mock/direct/{$tranId}",
            'gw' => 'visa,master,bkash,nagad,internetbank',
            'tran_id' => $payload['tran_id'] ?? '',
            'amount' => $payload['total_amount'] ?? '',
            'currency' => $payload['currency'] ?? 'BDT',
            'note' => 'Mocked sandbox response only. No real SSLCommerz request sent.',
        ];
    }

    protected function validationPayload(array $payload): array
    {
        return [
            'request_type' => 'validation',
            'sandbox' => true,
            'status' => 'VALID',
            'APIConnect' => 'DONE',
            'validated_on' => now()->toIso8601String(),
            'val_id' => $payload['val_id'] ?? '',
            'amount' => '1200.00',
            'currency_type' => 'BDT',
            'risk_level' => '0',
            'risk_title' => 'Safe',
            'note' => 'Mocked sandbox response only. No real SSLCommerz request sent.',
        ];
    }

    protected function refundPayload(array $payload): array
    {
        return [
            'request_type' => 'refund',
            'sandbox' => true,
            'APIConnect' => 'DONE',
            'bank_tran_id' => $payload['bank_tran_id'] ?? '',
            'refund_ref_id' => $payload['refund_ref_id'] ?? '',
            'refund_amount' => $payload['refund_amount'] ?? '',
            'status' => 'Processing',
            'note' => 'Mocked sandbox response only. No real SSLCommerz request sent.',
        ];
    }

    protected function queryPayload(array $payload): array
    {
        return [
            'request_type' => 'transactionQuery',
            'sandbox' => true,
            'APIConnect' => 'DONE',
            'status' => 'VALIDATED',
            'tran_id' => $payload['tran_id'] ?? '',
            'sessionkey' => $payload['sessionkey'] ?? '',
            'amount' => '1200.00',
            'currency_amount' => '1200.00',
            'currency_type' => 'BDT',
            'note' => 'Mocked sandbox response only. No real SSLCommerz request sent.',
        ];
    }
}
