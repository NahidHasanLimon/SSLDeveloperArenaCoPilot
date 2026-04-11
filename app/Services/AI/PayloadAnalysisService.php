<?php

namespace App\Services\AI;

use Throwable;

class PayloadAnalysisService
{
    public function __construct(
        protected AiChatClient $client,
        protected FallbackAiResponder $fallback,
    ) {
    }

    public function analyze(array $payload, ?string $mode = null): array
    {
        $modeLabel = $mode ?: 'unknown';

        try {
            $result = $this->client->generate([
                [
                    'role' => 'system',
                    'content' => 'You analyze SSLCommerz request or response payloads. Return a concise implementation-oriented explanation with issues, risks, and fixes.',
                ],
                [
                    'role' => 'user',
                    'content' => "Analyze this SSLCommerz payload for mode {$modeLabel}:\n".json_encode($payload, JSON_PRETTY_PRINT),
                ],
            ]);

            return [
                'mode' => $modeLabel,
                'analysis' => $result['content'],
                'provider' => $result['provider'],
                'model' => $result['model'],
            ];
        } catch (Throwable $exception) {
            return [
                'mode' => $modeLabel,
                'analysis' => $this->fallback->analyzePayload($payload),
                'provider' => 'fallback',
                'error' => $exception->getMessage(),
            ];
        }
    }
}
