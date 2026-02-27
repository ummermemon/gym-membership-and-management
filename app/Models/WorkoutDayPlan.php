<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutDayPlan extends Model
{
    public function exercises()
    {
        return $this->hasMany(WorkoutDayExercise::class);
    }

    public function workoutPlan()
    {
        return $this->belongsTo(WorkoutPlan::class);
    }
}
