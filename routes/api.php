<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\Admin\MembershipPlanController;
use App\Http\Controllers\Api\Admin\UsersController;



Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'getUser']);

    Route::prefix('member')->group(function () {
        Route::post('/edit-profile', [MemberController::class, 'editProfile']);
        Route::post('/change-password', [MemberController::class, 'changePassword']);
    });

    Route::prefix('admin')->group(function () {
        Route::post('/membership-plans/store', [MembershipPlanController::class, 'store']);
        Route::prefix('users')->group(function () {
            Route::get('/list', [UsersController::class, 'list']);
        });
    });

});