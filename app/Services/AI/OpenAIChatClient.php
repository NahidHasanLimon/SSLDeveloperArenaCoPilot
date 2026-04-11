<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class OpenAIChatClient
{
    public function isConfigured(): bool
    {
        return (bool) config('ai.openai.api_key');
    }

    public function generate(array $messages, array $options = []): array
    {
        if (! $this->isConfigured()) {
            throw new RuntimeException('OPENAI_API_KEY is not configured.');
        }

        $response = Http::timeout(60)
            ->withToken((string) config('ai.openai.api_key'))
            ->baseUrl((string) config('ai.openai.base_url'))
            ->acceptJson()
            ->post('/responses', [
                'model' => $options['model'] ?? config('ai.openai.model'),
                'temperature' => $options['temperature'] ?? config('ai.temperature'),
                'max_output_tokens' => $options['max_output_tokens'] ?? config('ai.max_output_tokens'),
                'input' => $this->formatMessages($messages),
            ])
            ->throw()
            ->json();

        return [
            'content' => $this->extractText($response),
            'raw' => $response,
            'provider' => 'openai',
            'model' => $response['model'] ?? ($options['model'] ?? config('ai.openai.model')),
        ];
    }

    protected function formatMessages(array $messages): array
    {
        return array_map(function (array $message): array {
            return [
                'role' => $message['role'],
                'content' => [
                    [
                        'type' => 'input_text',
                        'text' => $message['content'],
                    ],
                ],
            ];
        }, $messages);
    }

    protected function extractText(array $response): string
    {
        $segments = [];

        foreach ($response['output'] ?? [] as $outputItem) {
            foreach ($outputItem['content'] ?? [] as $contentItem) {
                if (($contentItem['type'] ?? null) === 'output_text') {
                    $segments[] = $contentItem['text'];
                }
            }
        }

        return trim(implode("\n\n", $segments));
    }
}
