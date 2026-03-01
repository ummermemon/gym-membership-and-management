<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPlanAssignment extends Model
{
    protected $fillable = [
        'user_id',
        'diet_plan_id',
        'start_date',
        'end_date',
        'is_active'
    ];

    public function dietPlan()
    {
        return $this->belongsTo(DietPlan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
