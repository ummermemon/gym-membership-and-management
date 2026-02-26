<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\Admin\MembershipPlanController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\Admin\UserMembershipController;



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
        Route::prefix('membership-plans')->group(function () {
            Route::get('/list', [MembershipPlanController::class, 'list']);
            Route::get('/destroy/{id}', [MembershipPlanController::class, 'destroy']);
            Route::post('/store', [MembershipPlanController::class, 'store']);
        });
        Route::prefix('user-membership')->group(function () {
            Route::post('/assign', [UserMembershipController::class, 'assign']);
        });
        Route::prefix('users')->group(function () {
            Route::get('/list', [UsersController::class, 'list']);
            Route::get('/destroy/{id}', [UsersController::class, 'destroy']);
            Route::post('/store', [UsersController::class, 'store']);
            Route::get('/view/{id}', [UsersController::class, 'view']);
        });
    });

});