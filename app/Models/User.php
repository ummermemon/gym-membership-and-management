<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'fname',
        'lname',
        'email',
        'password',
    ];
    public function memberships()
    {
        return $this->hasMany(UserMembership::class);
    }

    public function activeMembership()
    {
        return $this->hasOne(UserMembership::class)
                    ->where('status', 'active');
    }
    public function workoutPlans()
    {
        return $this->belongsToMany(WorkoutPlan::class, 'user_workout_plans')
                    ->withPivot('start_date', 'end_date')
                    ->withTimestamps();
    }
    public function activeWorkoutPlan()
    {
        return $this->belongsToMany(WorkoutPlan::class, 'user_workout_plans')
            ->withPivot('start_date', 'end_date')
            ->where(function ($query) {
                $query->whereNull('user_workout_plans.end_date')
                    ->orWhere('user_workout_plans.end_date', '>=', now());
            });
    }
    public function dietAssignments()
{
    return $this->hasMany(DietPlanAssignment::class);
}
public function activeDietPlan()
{
    return $this->hasOne(DietPlanAssignment::class)
        ->where('is_active', true)
        ->with('dietPlan.days.meals');
}

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
