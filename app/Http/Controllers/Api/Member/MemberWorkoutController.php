<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MemberWorkoutController extends Controller
{
    public function viewWorkoutPlan(){
        try {
            // $plan = User::with('activeWorkoutPlan.days.exercises')->where('id', $id)->get();
            $user = auth()->user()->load('activeWorkoutPlan.days.exercises');
            return response()->json([
                'status' => true,
                'data' => $user->activeWorkoutPlan
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ]);
        }
    }
}
