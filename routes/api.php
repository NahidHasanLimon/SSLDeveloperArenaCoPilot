<?php

use App\Http\Controllers\SslCommerzRequestController;
use Illuminate\Support\Facades\Route;

Route::post('/sslcommerz/{mode}', SslCommerzRequestController::class);
