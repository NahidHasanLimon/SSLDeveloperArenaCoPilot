<?php

namespace App\Services\AI;

use App\Models\KnowledgeDocument;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SslCommerzKnowledgeBootstrapper
{
    public function ensureSeeded(): void
    {
        if (KnowledgeDocument::query()->exists()) {
            return;
        }

        $config = config('sslcommerz_knowledge');
        $documents = Arr::get($config, 'documents', []);
        $version = Arr::get($config, 'version');

        DB::transaction(function () use ($documents, $version): void {
            foreach ($documents as $documentData) {
                $document = KnowledgeDocument::query()->create([
                    'source_type' => $documentData['source_type'] ?? 'docs',
                    'title' => $documentData['title'],
                    'section' => $documentData['section'] ?? null,
                    'topic' => $documentData['topic'] ?? null,
                    'url' => $documentData['url'] ?? null,
                    'version' => $version,
                    'synced_at' => now(),
                ]);

                foreach ($documentData['chunks'] ?? [] as $position => $chunkData) {
                    $content = trim($chunkData['content']);

                    $document->chunks()->create([
                        'position' => $position,
                        'title' => $chunkData['title'],
                        'section' => $chunkData['section'] ?? $document->section,
                        'topic' => $chunkData['topic'] ?? $document->topic,
                        'content' => $content,
                        'keywords' => $chunkData['keywords'] ?? [],
                        'token_count' => str_word_count(Str::lower($content)),
                    ]);
                }
            }
        });
    }
}
