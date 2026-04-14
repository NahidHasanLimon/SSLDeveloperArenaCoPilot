<?php

namespace App\Services\AI;

use App\Models\KnowledgeChunk;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class SslCommerzDocsRetriever
{
    public function __construct(
        protected SslCommerzKnowledgeBootstrapper $bootstrapper,
    ) {
    }

    public function retrieve(string $query, int $limit = 4): Collection
    {
        if (! Schema::hasTable('knowledge_documents') || ! Schema::hasTable('knowledge_chunks')) {
            return collect();
        }

        $this->bootstrapper->ensureSeeded();

        $terms = $this->extractTerms($query);

        return KnowledgeChunk::query()
            ->with('document')
            ->get()
            ->map(function (KnowledgeChunk $chunk) use ($terms, $query) {
                $keywords = collect($chunk->keywords ?? [])->map(
                    fn (string $keyword) => Str::lower($keyword)
                )->all();

                $haystack = Str::lower(
                    implode(' ', [
                        $chunk->title,
                        $chunk->section,
                        $chunk->topic,
                        $chunk->content,
                        implode(' ', $keywords),
                    ])
                );

                $score = 0;

                foreach ($terms as $term) {
                    if (in_array($term, $keywords, true)) {
                        $score += 8;
                    }

                    if (str_contains($haystack, $term)) {
                        $score += 4;
                    }
                }

                if ($score === 0 && str_contains($haystack, Str::lower($query))) {
                    $score = 2;
                }

                return [
                    'chunk' => $chunk,
                    'score' => $score,
                ];
            })
            ->filter(fn (array $item) => $item['score'] > 0)
            ->sortByDesc('score')
            ->take($limit)
            ->values()
            ->map(fn (array $item) => $item['chunk']);
    }

    protected function extractTerms(string $query): array
    {
        return collect(preg_split('/[^a-zA-Z0-9_]+/', Str::lower($query)) ?: [])
            ->filter(fn (?string $term) => filled($term) && mb_strlen($term) >= 3)
            ->reject(fn (string $term) => in_array($term, [
                'what', 'when', 'where', 'which', 'with', 'from', 'that', 'this', 'your', 'into', 'after',
                'should', 'would', 'could', 'there', 'their', 'have', 'about', 'sslcommerz', 'payment',
            ], true))
            ->unique()
            ->values()
            ->all();
    }
}
