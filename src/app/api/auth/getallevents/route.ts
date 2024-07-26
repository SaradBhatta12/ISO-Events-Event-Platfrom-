import EvnetModel from "@/app/models/Event.models";
import connectDB from "@/app/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  connectDB(); // Ensure you connect to your database

  try {
    const allevents = await EvnetModel.find();
    return NextResponse.json({
      status: 200,
      allevents,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch events",
      success: false,
    });
  }
};
