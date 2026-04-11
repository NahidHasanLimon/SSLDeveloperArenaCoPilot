<?php

namespace App\Services\AI;

class FallbackAiResponder
{
    public function respondToChat(string $message): string
    {
        $normalized = mb_strtolower($message);

        return match (true) {
            str_contains($normalized, 'ipn') =>
                'IPN is the backend notification channel. Keep it server-to-server and still validate the transaction before marking the order paid.',
            str_contains($normalized, 'validation') =>
                'Validation should confirm transaction status, amount, transaction id, and risk signals before fulfillment.',
            str_contains($normalized, 'refund') =>
                'For refund flows, keep the original bank transaction id, a unique refund transaction id, the refund amount, and remarks together for traceability.',
            str_contains($normalized, 'payload') =>
                'Paste the payload into the analyzer endpoint. The first useful checks are missing required fields, signature-sensitive identifiers, amount mismatches, and callback URL assumptions.',
            default =>
                'The AI backend is scaffolded without RAG. Once you connect a model key, this fallback will be replaced by model-generated responses through the Laravel service layer.',
        };
    }

    public function analyzePayload(array $payload): array
    {
        $requiredKeys = ['store_id', 'store_passwd'];
        $missing = array_values(array_filter($requiredKeys, fn ($key) => ! array_key_exists($key, $payload) || $payload[$key] === ''));

        return [
            'summary' => 'Deterministic payload analysis fallback.',
            'missing_required_keys' => $missing,
            'detected_keys' => array_keys($payload),
            'recommendations' => [
                'Confirm request mode matches the fields you are sending.',
                'Verify auth fields are sandbox credentials when testing.',
                'Compare amount, transaction id, and callback fields against the official docs.',
            ],
            'confidence' => 'fallback',
        ];
    }

    public function analyzeLog(string $log): array
    {
        $issues = [];

        if (str_contains(strtolower($log), 'timeout')) {
            $issues[] = 'Timeout detected. Check upstream connectivity, SSL handshake, and proxy timeout limits.';
        }

        if (str_contains(strtolower($log), 'invalid')) {
            $issues[] = 'Validation-related failure detected. Re-check required parameters and identifiers.';
        }

        if ($issues === []) {
            $issues[] = 'No deterministic issue signature found. Use model-backed analysis for deeper log interpretation.';
        }

        return [
            'summary' => 'Deterministic log analysis fallback.',
            'findings' => $issues,
            'confidence' => 'fallback',
        ];
    }
}
