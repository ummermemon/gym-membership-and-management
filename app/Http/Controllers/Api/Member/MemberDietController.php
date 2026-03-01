<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MemberDietController extends Controller
{
    public function viewDietPlan(){
        try {
            $assignment = auth()->user()->activeDietPlan;

            return response()->json([
                'status' => true,
                'data' => $assignment?->dietPlan
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ]);
        }
    }
}
