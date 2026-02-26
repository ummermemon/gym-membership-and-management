<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MembershipPlan;


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
    public function list(Request $request)
    {
        $data = MembershipPlan::all();
        return response()->json([
            'status' => true,
            'message' => 'Membership plans fetch successfully',
            'data' => $data
        ]);
    }
    public function destroy(Request $request, $id)
    {
        $mp = MembershipPlan::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'Membership Deleted Successfully'
        ]);
    }   
}
