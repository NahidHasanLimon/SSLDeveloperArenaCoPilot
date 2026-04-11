<?php

namespace App\Services\AI;

use App\Models\AiMessage;
use App\Models\AiSession;
use Throwable;

class ChatOrchestrator
{
    public function __construct(
        protected AiChatClient $client,
        protected FallbackAiResponder $fallback,
    ) {
    }

    public function reply(AiSession $session, string $message): AiMessage
    {
        $session->messages()->create([
            'role' => 'user',
            'content' => $message,
        ]);

        $assistantContent = $this->generateAssistantReply($session, $message);

        $assistantMessage = $session->messages()->create([
            'role' => 'assistant',
            'content' => $assistantContent['content'],
            'meta' => $assistantContent['meta'],
        ]);

        $session->forceFill([
            'last_message_at' => now(),
            'title' => $session->title ?: $this->makeTitle($message),
        ])->save();

        return $assistantMessage;
    }

    protected function generateAssistantReply(AiSession $session, string $message): array
    {
        $messages = [
            [
                'role' => 'system',
                'content' => 'You are an SSLCommerz integration assistant inside a Laravel product. Answer concisely, focus on implementation, and do not invent unsupported API behavior.',
            ],
        ];

        foreach ($session->messages()->oldest('id')->limit(8)->get(['role', 'content']) as $historyItem) {
            $messages[] = [
                'role' => $historyItem->role,
                'content' => $historyItem->content,
            ];
        }

        $messages[] = [
            'role' => 'user',
            'content' => $message,
        ];

        try {
            $result = $this->client->generate($messages);

            return [
                'content' => $result['content'] ?: $this->fallback->respondToChat($message),
                'meta' => [
                    'provider' => $result['provider'],
                    'model' => $result['model'],
                ],
            ];
        } catch (Throwable $exception) {
            return [
                'content' => $this->fallback->respondToChat($message),
                'meta' => [
                    'provider' => 'fallback',
                    'error' => $exception->getMessage(),
                ],
            ];
        }
    }

    protected function makeTitle(string $message): string
    {
        return mb_substr(trim($message), 0, 80);
    }
}
