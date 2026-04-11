<?php

use App\Http\Controllers\AiChatController;
use App\Http\Controllers\AiSessionController;
use App\Http\Controllers\LogAnalysisController;
use App\Http\Controllers\PayloadAnalysisController;
use App\Http\Controllers\SslCommerzRequestController;
use Illuminate\Support\Facades\Route;

Route::post('/sslcommerz/{mode}', SslCommerzRequestController::class);

Route::prefix('/ai')->group(function (): void {
    Route::get('/sessions', [AiSessionController::class, 'index']);
    Route::get('/sessions/{session}', [AiSessionController::class, 'show']);
    Route::post('/chat', AiChatController::class);
    Route::post('/analyze/payload', PayloadAnalysisController::class);
    Route::post('/analyze/log', LogAnalysisController::class);
});
