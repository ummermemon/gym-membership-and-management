<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MembershipPlan extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'duration_days',
        'price',
        'is_active'
    ];

    public function memberships()
    {
        return $this->hasMany(UserMembership::class);
    }
}
