<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class MemberController extends Controller
{
    public function editProfile(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'profile_img' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation errors',
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        $user = Auth::user();

        $user->fname = $request->first_name;
        $user->lname  = $request->last_name;

        if ($request->hasFile('profile_img')) {
            $file = $request->file('profile_img');
            $filename = time() . '_' . $user->id . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('users/profile_images', $filename, 'public');
            $user->profile_img = $filename;
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'status'  => true,
            'user'    => $user,
            'image_url' => $user->profile_img 
                ? asset('storage/' . $user->profile_img)
                : null
        ]);

    }
}
