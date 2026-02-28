<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPlanDay extends Model
{
    protected $fillable = [
        'diet_plan_id',
        'day_name'
    ];

    public function meals()
    {
        return $this->hasMany(DietPlanMeal::class);
    }

}
