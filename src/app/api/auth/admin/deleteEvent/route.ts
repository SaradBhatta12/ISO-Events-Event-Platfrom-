import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/app/utils/connectDB";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import EvnetModel from "@/app/models/Event.models";

export const GET = async (req: NextRequest, res: NextResponse, { params }) => {
  await connectDB();
  const IsAdmin = cookies().get("token")?.value;
  //issue occouring here
  const eventId = params.id;

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

  const event = await EvnetModel.findById(eventId);

  if (!event) {
    return NextResponse.json({
      success: false,
      message: "you do not have any events ",
      status: 404,
    });
  }
  await EvnetModel.deleteOne(event);
  return NextResponse.json({
    success: true,
    message: "successfully deleted your event",
    status: 201,
  });
};
