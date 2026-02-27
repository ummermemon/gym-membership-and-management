<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\WorkoutPlan;
use App\Models\WorkoutDay;
use App\Models\WorkoutDayExercise;


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
    public function addDay(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'day_number' => 'required|integer',
            'title' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $day = WorkoutDay::create([
            'workout_plan_id' => $id,
            'day_number' => $request->day_number,
            'title' => $request->title
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Day Added',
            'data' => $day
        ]);
    }
    public function addExcercise(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'exercise_name' => 'required|string',
            'sets' => 'required|integer',
            'reps' => 'required|integer',
            'rest_time' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $exercise = WorkoutDayExercise::create([
            'workout_day_id' => $id,
            'exercise_name' => $request->exercise_name,
            'sets' => $request->sets,
            'reps' => $request->reps,
            'rest_time' => $request->rest_time
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Exercise Added',
            'data' => $exercise
        ]);
    }
}
