<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MemberDashboardController extends Controller
{
    public function dashboard()
    {
        try {

            $user = auth()->user()->load([
                'activeMembership',
                'activeWorkoutPlan',
                'activeDietPlan.dietPlan'
            ]);

            return response()->json([
                'status' => true,
                'data' => [
                    'user' => $user,
                    'membership' => $user->activeMembership ? $user->activeMembership : null,
                    'workout_plan' => $user->activeWorkoutPlan->first() ? $user->activeWorkoutPlan->first() : null,
                    'diet_plan' => $user->activeDietPlan ? $user->activeDietPlan : null,
                ]
            ]);

        } catch (\Throwable $th) {

            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ], 500);
        }
    }
}
