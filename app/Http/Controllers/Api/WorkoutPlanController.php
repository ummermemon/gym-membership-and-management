<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\WorkoutPlan;


class WorkoutPlanController extends Controller
{
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description' => 'required',
            'level' => 'required|in:beginner,intermediate,advanced',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $plan = WorkoutPlan::create([
            'title' => $request->title,
            'description' => $request->description,
            'level' => $request->level,
            'is_active' => true
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Workout Plan Created Successfully',
            'data' => $plan
        ]);
    }
}
