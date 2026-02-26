<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserMembership;

use App\Models\User;
use App\Models\MembershipPlan;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserMembershipController extends Controller
{
    public function assign(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'membership_plan_id' => 'required|exists:membership_plans,id'
        ]);

        DB::beginTransaction();

        try {

            $user = User::findOrFail($request->user_id);

            $plan = MembershipPlan::where('id', $request->membership_plan_id)->where('is_active', true)->firstOrFail();

            $startDate = now();
            $endDate = Carbon::parse($startDate)->addDays($plan->duration);

            // Expire old active membership
            UserMembership::where('user_id', $user->id)->where('status', 'active')->update(['status' => 'expired']);

            $membership = UserMembership::create([
                'user_id' => $user->id,
                'membership_plan_id' => $plan->id,
                'plan_name' => $plan->name,
                'plan_price' => $plan->price,
                'plan_duration' => $plan->duration,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'active'
            ]);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Membership assigned successfully',
                'data' => $membership
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
