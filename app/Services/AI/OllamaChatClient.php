<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class OllamaChatClient
{
    public function isConfigured(): bool
    {
        return (bool) config('ai.ollama.base_url') && (bool) config('ai.ollama.model');
    }

    public function generate(array $messages, array $options = []): array
    {
        if (! $this->isConfigured()) {
            throw new RuntimeException('OLLAMA_BASE_URL or OLLAMA_MODEL is not configured.');
        }

        $response = Http::timeout(120)
            ->baseUrl((string) config('ai.ollama.base_url'))
            ->acceptJson()
            ->post('/api/chat', [
                'model' => $options['model'] ?? config('ai.ollama.model'),
                'messages' => $this->formatMessages($messages),
                'stream' => false,
                'options' => [
                    'temperature' => $options['temperature'] ?? config('ai.temperature'),
                ],
            ])
            ->throw()
            ->json();

        return [
            'content' => trim((string) data_get($response, 'message.content', '')),
            'raw' => $response,
            'provider' => 'ollama',
            'model' => data_get($response, 'model', $options['model'] ?? config('ai.ollama.model')),
        ];
    }

    protected function formatMessages(array $messages): array
    {
        return array_map(fn (array $message): array => [
            'role' => $message['role'],
            'content' => $message['content'],
        ], $messages);
    }
}
