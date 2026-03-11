<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MemberDietController extends Controller
{
    public function viewDietPlan(){
        try {
            // $assignment = auth()->user()->activeDietPlan;
            // return response()->json([
                //     'status' => true,
                //     'data' => $assignment?->dietPlan
                // ]);
                
            $user = auth()->user()->load(['activeDietPlan', 'activeMembership']);
            if (isset($user->activeMembership) && $user->activeMembership->status == "active") {
                $assignment = auth()->user()->activeDietPlan;
                return response()->json([
                    'status' => true,
                    'data' => $assignment?->dietPlan
                ]);
            }else {
                return response()->json([
                    'status' => false,
                    'message' => "Access Denied"
                ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ]);
        }
    }
}
