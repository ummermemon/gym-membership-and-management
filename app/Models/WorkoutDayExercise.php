<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutDayExercise extends Model
{
    public function workoutDay()
    {
        return $this->belongsTo(WorkoutDay::class);
    }
}
