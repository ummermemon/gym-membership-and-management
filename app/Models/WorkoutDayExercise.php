<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutDayExercise extends Model
{
    protected $fillable = [
        'exercise_name',
        'workout_day_id',
        'sets',
        'reps',
        'rest_time',
    ];
    
    public function workoutDay()
    {
        return $this->belongsTo(WorkoutDay::class);
    }
}
