<?php

namespace App\Services\AI;

use RuntimeException;

class AiChatClient
{
    public function __construct(
        protected OpenAIChatClient $openAIClient,
        protected OllamaChatClient $ollamaClient,
    ) {
    }

    public function isConfigured(): bool
    {
        return match (config('ai.provider')) {
            'ollama' => $this->ollamaClient->isConfigured(),
            'openai' => $this->openAIClient->isConfigured(),
            default => false,
        };
    }

    public function generate(array $messages, array $options = []): array
    {
        return match (config('ai.provider')) {
            'ollama' => $this->ollamaClient->generate($messages, $options),
            'openai' => $this->openAIClient->generate($messages, $options),
            default => throw new RuntimeException('Unsupported AI provider: '.config('ai.provider')),
        };
    }
}
