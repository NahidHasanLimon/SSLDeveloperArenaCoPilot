<?php

namespace App\Services\AI;

use Throwable;

class LogAnalysisService
{
    public function __construct(
        protected AiChatClient $client,
        protected FallbackAiResponder $fallback,
    ) {
    }

    public function analyze(string $log, ?string $context = null): array
    {
        try {
            $result = $this->client->generate([
                [
                    'role' => 'system',
                    'content' => 'You analyze payment integration logs. Identify probable causes, impacted flow stage, and concrete remediation steps.',
                ],
                [
                    'role' => 'user',
                    'content' => "Context: ".($context ?: 'not provided')."\n\nLog:\n{$log}",
                ],
            ]);

            return [
                'analysis' => $result['content'],
                'provider' => $result['provider'],
                'model' => $result['model'],
            ];
        } catch (Throwable $exception) {
            return [
                'analysis' => $this->fallback->analyzeLog($log),
                'provider' => 'fallback',
                'error' => $exception->getMessage(),
            ];
        }
    }
}
