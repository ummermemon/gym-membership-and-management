<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MembershipPlanController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'duration' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0'
        ]);

        $plan = MembershipPlan::create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Membership Plan Created Successfully',
            'data' => $plan
        ]);
    }
    
}
