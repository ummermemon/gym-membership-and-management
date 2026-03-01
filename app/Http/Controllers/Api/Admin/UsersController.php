<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;


class UsersController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'fname' => $request->first_name,
            'lname' => $request->last_name,
            'email' => $request->email,
            'role' => 'member',
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'message' => 'User Registered Successful',
            'status' => true,
            'user' => $user
        ], 201);
    }
    public function list(Request $request)
    {
        $users = User::with('activeMembership')->where('role', 'member')->get();
        return response()->json([
            'status' => true,
            'message' => 'Users fetch successfully',
            'data' => $users
        ]);
    }   
    public function destroy(Request $request, $id)
    {
        $user = User::destroy($id);
        return response()->json([
            'status' => true,
            'message' => 'User Deleted Successfully'
        ]);
    }
    public function view(Request $request, $id)
    {
        // $user = User::with(['activeMembership', 'memberships'])->where('id', $id)->get();
        $user = User::with([
            'activeMembership',
            'memberships',
            'activeWorkoutPlan.days.exercises'
        ])->find($id);

        return response()->json([
            'status' => true,
            'message' => 'User Fetch Successfully',
            'user' => $user
        ]);
    }      
}
