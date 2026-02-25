<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;


class UsersController extends Controller
{
    public function list(Request $request)
    {
        $users = User::all();
        return response()->json([
            'status' => true,
            'message' => 'Users fetch successfully',
            'data' => $users
        ]);
    }   
}
