<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPlanMeal extends Model
{
    protected $fillable = [
        'diet_plan_day_id',
        'meal_type',
        'food_name',
        'quantity',
        'calories'
    ];
}
