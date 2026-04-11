<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('channel')->default('chat');
            $table->string('status')->default('active');
            $table->json('context')->nullable();
            $table->timestamp('last_message_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_sessions');
    }
};
