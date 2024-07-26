import UserModel from "@/app/models/User.models";
import connectDB from "@/app/utils/connectDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

console.log(JWT_SECRET);

export async function POST(request: NextRequest) {
  await connectDB();
  let { username, email, password } = await request.json();
  if (!username || !email || !password) {
    return NextResponse.json({
      status: 201,
      message: "Please fill all the fields",
      success: false,
    });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        status: 201,
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    cookies().set("auth", token);

    return NextResponse.json({
      status: 200,
      success: true,
      user: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Server error",
      error,
    });
  }
}
