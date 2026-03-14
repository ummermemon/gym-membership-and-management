<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\MembershipPlan;
use App\Models\WorkoutPlan;
use App\Models\DietPlan;


class AdminController extends Controller
{
    public function dashboard(Request $request){

        $users = User::where('role', 'member')->get();
        $membership_plans = MembershipPlan::get();
        $workout_plans = WorkoutPlan::get();
        $diet_plans = DietPlan::get();

        $data = array('count' => array(
            'users' => $users->count(), 
            'membership_plans' => $membership_plans->count(), 
            'workout_plans' => $workout_plans->count(), 
            'diet_plans' => $diet_plans->count()
            ),
            'users' => $users,
            'workout_plans' => $workout_plans,
            'diet_plans' => $diet_plans,
            'membership_plans' => $membership_plans
        );
         return response()->json([
            'status' => true,
            'message' => 'Dashbaord',
            'data' => $data
        ]);
        return 'this called';
    }
}
