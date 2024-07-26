import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const JWT_SECRET = process.env.JWT_SECRET as string;
  // Validate the request payload
  if (!email || !password) {
    return NextResponse.json({
      message: "Please enter email and password",
      status: 400,
      success: false,
    });
  }

  // Validate credentials
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({
      message: "Invalid Credentials",
      status: 400,
      success: false,
    });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  cookies().set("token", token);

  // Return success response with token
  return NextResponse.json({
    message: "Login Successful",
    token,
    status: 200,
    success: true,
  });
};

// for users and organizers
