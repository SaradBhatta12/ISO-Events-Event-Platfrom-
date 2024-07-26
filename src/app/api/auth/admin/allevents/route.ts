import connectDB from "@/app/utils/connectDB";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import EvnetModel from "@/app/models/Event.models";
export const GET = async (req:NextRequest , res:NextResponse){
    await connectDB();
    const IsAdmin  = cookies().get("token")?.value
    if(!IsAdmin){
        return NextResponse.json({
            message: "You are not authorized to access this page",
            success: false,
            status: 404,
          });
    }
    const jwtToken = process.env.JWT_TOKEN as string;
    const decoded = jwt.verify(IsAdmin , jwtToken) as JwtPayload
    const adminMail = decoded.email;
    if(!(adminMail == process.env.email)){
        return NextResponse.json({
            message: "You are not authorized to access this page",
            success: false,
            status: 404,
          });
    }

    const allEvants  = await EvnetModel.find()
    return NextResponse.json({
        allEvants,
        message: "your all events are here ",
        success: true,
        status: 200,
      });
}

