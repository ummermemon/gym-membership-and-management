<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserMembership extends Model
{
    protected $fillable = [
        'user_id',
        'membership_plan_id',
        'plan_name',
        'plan_price',
        'plan_duration',
        'start_date',
        'end_date',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
