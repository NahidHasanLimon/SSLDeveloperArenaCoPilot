<?php

return [
    'provider' => env('AI_PROVIDER', 'openai'),
    'temperature' => (float) env('AI_TEMPERATURE', 0.2),
    'max_output_tokens' => (int) env('AI_MAX_OUTPUT_TOKENS', 900),
    'openai' => [
        'model' => env('AI_MODEL', 'gpt-4.1-mini'),
        'base_url' => env('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
        'api_key' => env('OPENAI_API_KEY'),
    ],
    'ollama' => [
        'base_url' => env('OLLAMA_BASE_URL', 'http://host.docker.internal:11434'),
        'model' => env('OLLAMA_MODEL', 'llama3.2:latest'),
    ],
];
