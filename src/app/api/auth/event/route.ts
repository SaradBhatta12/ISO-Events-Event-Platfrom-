import EvnetModel from "@/app/models/Event.models";
import { NextRequest, NextResponse } from "next/server";
import uploadImage from "@/app/utils/cloudinary";

export const POST = async (req: NextRequest, res: NextResponse) => {
  let { title, description, catagory, BookingPrice, image } = await req.json();
  // genarate a json file for me like above formet
  try {
    let eventImage = uploadImage(image, "eventImage");
    let eventPic = (await eventImage).secure_url;
    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "Please fill all the fields",
        status: 400,
      });
    }
    let newEvent = await EvnetModel.create({
      title,
      description,
      catagory,
      BookingPrice,
      image: eventPic,
    });
    return NextResponse.json({
      success: true,
      message: "Event Created Successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "internal server error ",
      status: 500,
    });
  }
};
