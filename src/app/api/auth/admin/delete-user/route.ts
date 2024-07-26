import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/app/utils/connectDB";
import UserModel from "@/app/models/User.models";

// Utility function to connect to the database
connectDB();

export const GET = async (req: NextRequest) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({
      message: "You are not authorized to access this page",
      success: false,
      status: 401,
    });
  }

  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const adminMail = decoded.email;

    if (adminMail !== process.env.email) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to access this page",
        status: 401,
      });
    }

    const userId = req.nextUrl.searchParams.get("id");

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
        status: 400,
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }

    await UserModel.deleteOne({ _id: userId });

    return NextResponse.json({
      success: true,
      message: "Successfully deleted user",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token",
      status: 401,
    });
  }
};
