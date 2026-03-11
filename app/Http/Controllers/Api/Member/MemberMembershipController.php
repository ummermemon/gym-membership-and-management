<?php

namespace App\Http\Controllers\Api\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MemberMembershipController extends Controller
{
    public function viewMembership(){
        try {
            $user = auth()->user()->load('activeMembership');
            return response()->json([
                'status' => true,
                'data' => $user->activeMembership
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Something went wrong'
            ]);
        }
    }

}
