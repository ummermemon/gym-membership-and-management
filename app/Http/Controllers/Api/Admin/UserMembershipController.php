<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserMembership;


class UserMembershipController extends Controller
{
    public function assign(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'membership_plan_id' => 'required|integer'
        ]);

        $user_id = $request->user_id;
        $membership_plan_id = $request->membership_plan_id;
        

        $plan = UserMembership::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Membership Plan Created Successfully',
            'data' => $plan
        ]);
    }
}
