<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class MemberWorkoutController extends Controller
{
    public function viewWorkoutPlan(){
        try {
            $user = auth()->user()->load(['activeWorkoutPlan.days.exercises', 'activeMembership']);
            if (isset($user->activeMembership) && $user->activeMembership->status == "active") {
                return response()->json([
                    'status' => true,
                    'data' => $user->activeWorkoutPlan
                ]);
            }else {
                return response()->json([
                    'status' => false,
                    'message' => "Access Denied"
                ]);
            }
            

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ]);
        }
    }
}
