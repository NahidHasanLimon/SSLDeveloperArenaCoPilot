<?php

namespace App\Http\Controllers;

use App\Models\AiSession;
use Illuminate\Http\JsonResponse;

class AiSessionController extends Controller
{
    public function index(): JsonResponse
    {
        $sessions = AiSession::query()
            ->latest('last_message_at')
            ->latest('id')
            ->get()
            ->map(fn (AiSession $session) => [
                'id' => $session->id,
                'title' => $session->title,
                'channel' => $session->channel,
                'status' => $session->status,
                'last_message_at' => optional($session->last_message_at)->toIso8601String(),
                'created_at' => $session->created_at?->toIso8601String(),
            ]);

        return response()->json(['data' => $sessions]);
    }

    public function show(AiSession $session): JsonResponse
    {
        $session->load(['messages' => fn ($query) => $query->oldest('id')]);

        return response()->json([
            'data' => [
                'id' => $session->id,
                'title' => $session->title,
                'channel' => $session->channel,
                'status' => $session->status,
                'context' => $session->context,
                'last_message_at' => optional($session->last_message_at)->toIso8601String(),
                'created_at' => $session->created_at?->toIso8601String(),
                'messages' => $session->messages->map(fn ($message) => [
                    'id' => $message->id,
                    'role' => $message->role,
                    'content' => $message->content,
                    'meta' => $message->meta,
                    'created_at' => $message->created_at?->toIso8601String(),
                ])->values(),
            ],
        ]);
    }
}
