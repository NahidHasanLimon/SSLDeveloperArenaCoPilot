<?php

namespace App\Http\Controllers;

use App\Models\AiSession;
use App\Services\AI\ChatOrchestrator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiChatController extends Controller
{
    public function __invoke(Request $request, ChatOrchestrator $orchestrator): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:8000'],
            'session_id' => ['nullable', 'integer', 'exists:ai_sessions,id'],
            'title' => ['nullable', 'string', 'max:255'],
        ]);

        $session = isset($validated['session_id'])
            ? AiSession::query()->findOrFail($validated['session_id'])
            : AiSession::query()->create([
                'title' => $validated['title'] ?? null,
                'channel' => 'chat',
                'status' => 'active',
            ]);

        $assistantMessage = $orchestrator->reply($session, $validated['message']);
        $session->load(['messages' => fn ($query) => $query->oldest('id')]);

        return response()->json([
            'session' => [
                'id' => $session->id,
                'title' => $session->title,
                'status' => $session->status,
                'last_message_at' => optional($session->last_message_at)->toIso8601String(),
            ],
            'assistant_message' => [
                'id' => $assistantMessage->id,
                'role' => $assistantMessage->role,
                'content' => $assistantMessage->content,
                'meta' => $assistantMessage->meta,
                'created_at' => $assistantMessage->created_at?->toIso8601String(),
            ],
            'messages' => $session->messages->map(fn ($message) => [
                'id' => $message->id,
                'role' => $message->role,
                'content' => $message->content,
                'meta' => $message->meta,
                'created_at' => $message->created_at?->toIso8601String(),
            ])->values(),
        ]);
    }
}
