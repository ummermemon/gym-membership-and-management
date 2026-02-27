<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{
    public function days()
    {
        return $this->hasMany(WorkoutDay::class);
    }
}
