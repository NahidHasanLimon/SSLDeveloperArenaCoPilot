<?php

namespace App\Services\AI;

use App\Models\AiMessage;
use App\Models\AiSession;
use App\Models\KnowledgeChunk;
use App\Models\KnowledgeDocument;
use Illuminate\Support\Collection;
use Throwable;

class ChatOrchestrator
{
    public function __construct(
        protected AiChatClient $client,
        protected SslCommerzDocsRetriever $retriever,
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
        $chunks = $this->retriever->retrieve($message);

        if ($chunks->isEmpty()) {
            return [
                'content' => 'I could not ground that question in the current SSLCommerz knowledge base yet. Try using more specific terms like initiate payment, validation, IPN, refund, sessionkey, or tran_id.',
                'meta' => [
                    'provider' => 'grounded-chat',
                    'grounded' => false,
                    'sources' => [],
                ],
            ];
        }

        $messages = [
            [
                'role' => 'system',
                'content' => 'You are an SSLCommerz integration assistant inside a Laravel product. Answer concisely, focus on implementation, and answer only from the supplied SSLCommerz knowledge context. If the context is insufficient, say so explicitly and do not invent unsupported behavior.',
            ],
            [
                'role' => 'system',
                'content' => $this->buildKnowledgeContext($chunks),
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
                    'grounded' => true,
                    'provider' => $result['provider'],
                    'model' => $result['model'],
                    'sources' => $this->formatSources($chunks),
                ],
            ];
        } catch (Throwable $exception) {
            return [
                'content' => $this->fallback->respondToChat($message),
                'meta' => [
                    'provider' => 'fallback',
                    'error' => $exception->getMessage(),
                    'grounded' => false,
                    'sources' => $this->formatSources($chunks),
                ],
            ];
        }
    }

    protected function buildKnowledgeContext(Collection $chunks): string
    {
        return $chunks->values()->map(function (KnowledgeChunk $chunk, int $index): string {
            $document = $chunk->document;

            return implode("\n", [
                '[Source '.($index + 1).']',
                'Title: '.$chunk->title,
                'Section: '.($chunk->section ?: $document?->section ?: 'general'),
                'URL: '.($document?->url ?: 'n/a'),
                'Content: '.$chunk->content,
            ]);
        })->implode("\n\n");
    }

    protected function formatSources(Collection $chunks): array
    {
        return $chunks->values()->map(function (KnowledgeChunk $chunk): array {
            $document = $chunk->document ?: KnowledgeDocument::query()->find($chunk->knowledge_document_id);

            return [
                'title' => $chunk->title,
                'section' => $chunk->section ?: $document?->section,
                'url' => $document?->url,
                'source_type' => $document?->source_type,
            ];
        })->all();
    }

    protected function makeTitle(string $message): string
    {
        return mb_substr(trim($message), 0, 80);
    }
}
