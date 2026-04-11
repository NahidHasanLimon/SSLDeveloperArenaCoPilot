<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AiSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'channel',
        'status',
        'context',
        'last_message_at',
    ];

    protected function casts(): array
    {
        return [
            'context' => 'array',
            'last_message_at' => 'datetime',
        ];
    }

    public function messages(): HasMany
    {
        return $this->hasMany(AiMessage::class)->latest('id');
    }
}
