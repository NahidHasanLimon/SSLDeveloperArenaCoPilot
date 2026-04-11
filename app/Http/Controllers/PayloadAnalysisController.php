<?php

namespace App\Http\Controllers;

use App\Services\AI\PayloadAnalysisService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PayloadAnalysisController extends Controller
{
    public function __invoke(Request $request, PayloadAnalysisService $service): JsonResponse
    {
        $validated = $request->validate([
            'payload' => ['required', 'array'],
            'mode' => ['nullable', 'string', 'max:100'],
        ]);

        return response()->json($service->analyze(
            $validated['payload'],
            $validated['mode'] ?? null,
        ));
    }
}
