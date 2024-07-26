import UserModel from "@/app/models/User.models";
import { randomUUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/app/utils/nodemailer";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({
      success: false,
      message: "required email",
      status: 404,
    });
  }

  const emailInDb = await UserModel.findOne({ email: email });
  if (!emailInDb) {
    return NextResponse.json({
      success: false,
      message: "wrong email given by user ",
      status: 400,
    });
  }

  const forgotPassToken = uuidv4();
  sendMail(email, forgotPassToken);
  emailInDb.forgotPassToken = forgotPassToken;
  return NextResponse.json({
    success: true,
    message: "mail successfully send you can reset",
    status: 200,
  });
};
