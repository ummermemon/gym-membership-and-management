<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\DietPlan;
use App\Models\DietPlanDay;
use App\Models\DietPlanMeal;



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

    public function destroy($id)
    {
        DietPlan::destroy($id);

        return response()->json([
            'status' => true,
            'message' => 'Diet Plan Deleted'
        ]);
    }
    public function deleteDay($id)
    {
        $day = DietPlanDay::find($id);

        if (!$day) {
            return response()->json([
                'status' => false,
                'message' => 'Day not found'
            ], 404);
        }

        $day->delete();

        return response()->json([
            'status' => true,
            'message' => 'Day deleted successfully'
        ]);
    }
    public function deleteMeal($id)
    {
        $meal = DietPlanMeal::find($id);

        if (!$meal) {
            return response()->json([
                'status' => false,
                'message' => 'Meal not found'
            ], 404);
        }

        $meal->delete();

        return response()->json([
            'status' => true,
            'message' => 'Meal deleted successfully'
        ]);
    }

    public function addDay(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'day_name' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }
        $day_name = $request->day_name;

        $day = DietPlanDay::create([
            'diet_plan_id' => $id,
            'day_name' => $day_name
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Day Added',
            'data' => $day
        ]);
    }

    public function addMeal(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'meal_type' => 'required',
            'food_name' => 'required',
            'quantity' => 'required',
            'calories' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $meal_type = $request->meal_type;
        $food_name = $request->food_name;
        $quantity = $request->quantity;
        $calories = $request->calories;

        $meal = DietPlanMeal::create([
            'diet_plan_day_id' => $id,
            'meal_type' => $meal_type,
            'food_name' => $food_name,
            'quantity' => $quantity,
            'calories' => $calories
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
