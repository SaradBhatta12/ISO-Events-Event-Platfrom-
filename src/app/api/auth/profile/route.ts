import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import EvnetModel from "@/app/models/Event.models";
import UserModel from "@/app/models/User.models";

export const GET = async (req: NextRequest) => {
  let token = cookies().get("auth")?.value as string;
  if (!token) {
    return NextResponse.json({
      message: "Unauthorized",
      success: false,
      status: 401,
    });
  }

  const jwttoken = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, jwttoken) as JwtPayload;
  let userid = decoded.id;
  //   events find by userid
  const events = await EvnetModel.find({ user: userid });
  const userdetails = await UserModel.findById(userid);
  return NextResponse.json({
    message: "Events fetched successfully",
    success: true,
    status: 200,
    events,
    userdetails,
  });
};
