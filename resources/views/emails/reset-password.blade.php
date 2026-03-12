<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Password Reset</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,0.1);">

<!-- Header -->
<tr>
<td style="background:#111827;color:white;text-align:center;padding:25px;">
<h2 style="margin:0;">Gym Membership & Management System</h2>
</td>
</tr>

<!-- Content -->
<tr>
<td style="padding:35px;color:#333;">

<h3 style="margin-top:0;">Reset Your Password</h3>

<p>
We received a request to reset your password for your
<strong>Gym Membership & Management System</strong> account.
</p>

<p>
Click the button below to reset your password.
</p>

<div style="text-align:center;margin:30px 0;">
<a href="{{ $resetLink }}"
style="
background:#f5a524;
color:#000;
padding:14px 28px;
text-decoration:none;
border-radius:6px;
font-weight:bold;
display:inline-block;
">
Reset Password
</a>
</div>

<p>
If you did not request a password reset, you can safely ignore this email.
</p>

<hr style="border:none;border-top:1px solid #eee;margin:30px 0;">

<p style="font-size:12px;color:#777;">
For security reasons, please do not share this email with anyone.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#f9fafb;text-align:center;padding:20px;font-size:12px;color:#777;">

© {{ date('Y') }} Gym Membership & Management System  
<br>
All rights reserved.

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>