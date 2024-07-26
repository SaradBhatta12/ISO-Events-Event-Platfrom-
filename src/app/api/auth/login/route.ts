import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/app/utils/connectDB";
import UserModel from "@/app/models/User.models";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    await connectDB();
    const { username, password } = await req.json();
    const userExist = await UserModel.findOne({ username });

    if (!userExist) {
      return NextResponse.json({
        success: false,
        message: "User does not exist in the database",
        status: 401,
      });
    }

    const pass = userExist.password;
    const matchPass = await bcrypt.compare(password, pass);

    if (!matchPass) {
      return NextResponse.json({
        success: false,
        status: 401,
        message: "Password does not match",
      });
    }

    const userId = userExist.id;
    const token = jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "4h",
    });

    const res = NextResponse.json({
      success: true,
      status: 200,
      message: "Successfully logged in",
    });

    res.cookies.set("auth", token, { httpOnly: true });

    return res;
  } catch (error) {
    console.error("Failed to login", error);
    return NextResponse.json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};
