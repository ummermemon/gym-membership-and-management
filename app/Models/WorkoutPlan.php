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
}
