<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\Admin\MembershipPlanController;
use App\Http\Controllers\Api\Admin\UsersController;
use App\Http\Controllers\Api\Admin\UserMembershipController;

use App\Http\Controllers\Api\Member\MemberWorkoutController;
use App\Http\Controllers\Api\Member\MemberDashboardController;
use App\Http\Controllers\Api\Member\MemberDietController;
use App\Http\Controllers\Api\Member\MemberMembershipController;

use App\Http\Controllers\Api\WorkoutPlanController;
use App\Http\Controllers\Api\DietPlanController;
use App\Http\Controllers\Api\Admin\AdminController;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'getUser']);

    Route::prefix('member')->group(function () {
        Route::post('/edit-profile', [MemberController::class, 'editProfile']);
        Route::post('/change-password', [MemberController::class, 'changePassword']);
        
        Route::get('dashboard', [MemberDashboardController::class, 'dashboard']);

        Route::get('membership/view', [MemberMembershipController::class, 'viewMembership']);

        Route::get('workout-plans/view', [MemberWorkoutController::class, 'viewWorkoutPlan']);

        Route::get('diet-plans/view', [MemberDietController::class, 'viewDietPlan']);
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

        Route::prefix('workout-plans')->group(function () {
            Route::post('/store', [WorkoutPlanController::class, 'store']);
            Route::get('/show/{id}', [WorkoutPlanController::class, 'show']);
            Route::post('/update/{id}', [WorkoutPlanController::class, 'update']);
            Route::get('/destroy/{id}', [WorkoutPlanController::class, 'destroy']);

            Route::post('/{id}/assign', [WorkoutPlanController::class, 'assignToUser']);
            
            Route::post('/{id}/add-days', [WorkoutPlanController::class, 'addDay']);
            Route::get('/destroy-day/{id}', [WorkoutPlanController::class, 'destroyDay']);
            
            Route::post('/days/{id}/add-exercises', [WorkoutPlanController::class, 'addExcercise']);
            Route::get('/destroy-day-exercise/{id}', [WorkoutPlanController::class, 'destroyWorkoutdayExercise']);
            Route::get('/list', [WorkoutPlanController::class, 'list']);
        });

        Route::prefix('diet-plans')->group(function () {
            Route::post('/store', [DietPlanController::class, 'store']);
            Route::get('/list', [DietPlanController::class, 'index']);
            Route::get('/show/{id}', [DietPlanController::class, 'show']);
            // Route::post('/update/{id}', [DietPlanController::class, 'update']);
            Route::get('/destroy/{id}', [DietPlanController::class, 'destroy']);

            Route::post('/{id}/add-day', [DietPlanController::class, 'addDay']);
            Route::get('/day/{id}', [DietPlanController::class, 'deleteDay']);

            Route::post('/day/{id}/add-meal', [DietPlanController::class, 'addMeal']);
            Route::get('/meal/{id}', [DietPlanController::class, 'deleteMeal']);

            Route::post('/assign', [DietPlanController::class, 'assignToUser']);
        });
        
        Route::prefix('users')->group(function () {
            Route::get('/list', [UsersController::class, 'list']);
            Route::get('/destroy/{id}', [UsersController::class, 'destroy']);
            Route::post('/store', [UsersController::class, 'store']);
            Route::get('/view/{id}', [UsersController::class, 'view']);
        });

        Route::get('dashboard', [AdminController::class, 'dashboard']);
    });

});