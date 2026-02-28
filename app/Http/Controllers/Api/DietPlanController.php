<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DietPlan;



class DietPlanController extends Controller
{
    public function index() {
        $plans = DietPlan::all();

        return response()->json([
            'status' => true,
            'data' => $plans
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'level' => 'required|in:beginner,intermediate,advanced',
            'goal' => 'required|in:weight_loss,weight_gain,maintenance',
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
        $goal = $request->goal;

        $plan = DietPlan::create([
            'title' => $title,
            'level' => $level,
            'goal' => $goal
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Diet Plan Created',
            'data' => $plan
        ]);
    }

    public function addDay(Request $request, $id)
    {
        $request->validate([
            'day_name' => 'required'
        ]);

        $day = DietPlanDay::create([
            'diet_plan_id' => $id,
            'day_name' => $request->day_name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Day Added',
            'data' => $day
        ]);
    }

    public function addMeal(Request $request, $id)
    {
        $request->validate([
            'meal_type' => 'required',
            'food_name' => 'required'
        ]);

        $meal = DietPlanMeal::create([
            'diet_plan_day_id' => $id,
            'meal_type' => $request->meal_type,
            'food_name' => $request->food_name,
            'quantity' => $request->quantity,
            'calories' => $request->calories
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Meal Added',
            'data' => $meal
        ]);
    }

    public function show($id)
    {
        $plan = DietPlan::with('days.meals')->find($id);

        return response()->json([
            'status' => true,
            'data' => $plan
        ]);
    }
}
