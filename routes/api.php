<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->get('/me', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->post('/member/edit-profile', [MemberController::class, 'editProfile']);

