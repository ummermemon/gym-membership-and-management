<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{
    protected $fillable = [
        'title',
        'description',
        'level',
        'is_active',
    ];
    public function days()
    {
        return $this->hasMany(WorkoutDay::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_workout_plans')
                    ->withPivot('start_date', 'end_date')
                    ->withTimestamps();
    }
}
