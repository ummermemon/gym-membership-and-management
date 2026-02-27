<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutDay extends Model
{
    protected $fillable = [
        'workout_plan_id',
        'day_number',
        'title',
    ];
    public function exercises()
    {
        return $this->hasMany(WorkoutDayExercise::class);
    }

    public function workoutPlan()
    {
        return $this->belongsTo(WorkoutPlan::class);
    }
}
