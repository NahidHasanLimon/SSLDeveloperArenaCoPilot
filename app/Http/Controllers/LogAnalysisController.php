<?php

namespace App\Http\Controllers;

use App\Services\AI\LogAnalysisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogAnalysisController extends Controller
{
    public function __invoke(Request $request, LogAnalysisService $service): JsonResponse
    {
        $validated = $request->validate([
            'log' => ['required', 'string', 'max:30000'],
            'context' => ['nullable', 'string', 'max:1000'],
        ]);

        return response()->json($service->analyze(
            $validated['log'],
            $validated['context'] ?? null,
        ));
    }
}
