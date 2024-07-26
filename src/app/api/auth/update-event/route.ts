import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/app/models/User.models";
import uploadImage from "@/app/utils/cloudinary";
import EvnetModel from "@/app/models/Event.models";
export const PUT = async (req: NextRequest) => {
  let token = cookies().get("auth")?.value;
  if (!token) {
    return NextResponse.json({
      success: false,
      status: 201,
      message: "unauthorized user",
    });
  }
  const jwt_token = process.env.jwt_token as string;
  const decoded = jwt.verify(token, jwt_token) as JwtPayload;
  let userId = decoded.id;
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "login first ",
      status: 203,
    });
  }
  let user = await UserModel.findById(userId);
  if (!user.isOrganizer == true) {
    return NextResponse.json({
      message: "yourare not authorized for this",
      success: false,
      status: 203,
    });
  }

  let EventId = req.params;
  let formdata = req.formData();
  let title = (await formdata).get("title");
  let description = (await formdata).get("description");
  let image = (await formdata).get("image") as File;
  let bookingPrice = (await formdata).get("bookingPrice");
  let catagory = (await formdata).get("catagory");

  let imageUrl = uploadImage(image, "updatedImage");
  let url = (await imageUrl).secure_url;

  let updateEvent = await EvnetModel.findByIdAndUpdate(EventId, {
    title,
    description,
    image: url,
    catagory,
    BookingPrice: bookingPrice,
  });

  return NextResponse.json({
    success: true,
    message: "successfully updated Event",
    status: 401,
  });
};
