import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
export const GET = async (req: NextRequest) => {
  let token = cookies().get("auth")?.value;
  if (!token) {
    return NextResponse.json({
      success: false,
      message: "login first ",
      status: 402,
    });
  }
  //   make cookie for logout
  await cookies().delete("auth");
  return NextResponse.json({
    success: true,
    message: "successfully logged out ",
    status: 200,
  });
};
