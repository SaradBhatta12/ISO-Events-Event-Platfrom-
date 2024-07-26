import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/app/models/User.models";
export const GET = async (req: NextRequest) => {
  const IsAdmin = cookies().get("token")?.value;
  if (!IsAdmin) {
    return NextResponse.json({
      message: "You are not authorized to access this page",
      success: false,
      status: 404,
    });
  }
  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(IsAdmin, secret) as JwtPayload;
  const adminMail = decoded.email;

  if (!(adminMail == process.env.email)) {
    return NextResponse.json({
      success: false,
      message: "You are not authorized to access this page",
      status: 404,
    });
  }

  const users = await UserModel.find();
  return NextResponse.json({ users, success: true, status: 200 });
};
