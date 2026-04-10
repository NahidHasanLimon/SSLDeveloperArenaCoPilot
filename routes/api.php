<?php

use App\Http\Controllers\MockSslCommerzController;
use Illuminate\Support\Facades\Route;

Route::post('/mock/{mode}', MockSslCommerzController::class);
