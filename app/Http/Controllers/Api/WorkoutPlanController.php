<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\WorkoutPlan;
use App\Models\WorkoutDay;
use App\Models\WorkoutDayExercise;
use Illuminate\Support\Facades\DB;



class WorkoutPlanController extends Controller
{
    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'title' => 'required',
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

    public function destroy($id)
    {
        WorkoutPlan::destroy($id);

        return response()->json([
            'status' => true,
            'message' => 'Workout Plan Deleted'
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

    public function destroyWorkoutdayExercise(Request $request, $id){
        WorkoutDayExercise::destroy($id);

        return response()->json([
            'status' => true,
            'message' => 'Workout Day Excercise Deleted'
        ]);
    }
    
    public function destroyDay(Request $request, $id){
        WorkoutDay::destroy($id);

        return response()->json([
            'status' => true,
            'message' => 'Workout Day Deleted'
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

    public function show($id)
    {
        $plan = WorkoutPlan::with('days.exercises')->find($id);

        return response()->json([
            'status' => true,
            'data' => $plan
        ]);
    }

    public function list() {
        $plans = WorkoutPlan::all();

        return response()->json([
            'status' => true,
            'data' => $plans
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'level' => 'required|in:beginner,intermediate,advanced',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $title = $request->title;
        $level = $request->level;

        $plan = WorkoutPlan::findOrFail($id);

        $plan->update([
            'title' => $request->title,
            'level' => $request->level
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Workout Plan Updated',
            'data' => $plan
        ]);
    }

    public function assignToUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $plan = WorkoutPlan::findOrFail($id);

        $delete = DB::table('user_workout_plans')->where('user_id', $request->user_id)->where('workout_plan_id', $id)->delete();

        $plan->users()->attach($request->user_id, [
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Workout Plan Assigned Successfully'
        ]);
    }
    

}
