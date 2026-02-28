<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPlanAssignment extends Model
{
    protected $fillable = [
        'user_id',
        'diet_plan_id',
        'start_date'
    ];

    public function dietPlan()
    {
        return $this->belongsTo(DietPlan::class);
    }
}
