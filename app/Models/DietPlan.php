<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DietPlan extends Model
{
    protected $fillable = [
        'title',
        'description',
        'goal',
        'level',
        'status'
    ];

    public function days()
    {
        return $this->hasMany(DietPlanDay::class);
    }

    public function assignments()
    {
        return $this->hasMany(DietPlanAssignment::class);
    }
}
