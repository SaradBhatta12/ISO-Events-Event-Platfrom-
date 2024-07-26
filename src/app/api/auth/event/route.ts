import EventModel from "@/app/models/Event.models";
import { NextRequest, NextResponse } from "next/server";
import uploadImage from "@/app/utils/cloudinary";
import UserModel from "@/app/models/User.models";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const bookingPrice = formData.get("bookingPrice");
    const image = formData.get("image");

    const token = cookies().get("auth")?.value;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userid = decoded.id;

    if (!userid) {
      return NextResponse.json({
        success: false,
        message: "Cannot find user",
        status: 404,
      });
    }

    const user = await UserModel.findById(userid);
    const isOrganizer = user?.isOrganizer;
    const isAdmin = user?.isAdmin;

    if (!isOrganizer && !isAdmin) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to create events",
        status: 403,
      });
    }

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "Please fill all the fields",
        status: 400,
      });
    }

    const eventImage = await uploadImage(image, "eventImage");
    const eventPic = eventImage.secure_url;

    const newEvent = await EventModel.create({
      title,
      description,
      category,
      BookingPrice: bookingPrice,
      image: eventPic,
      user: userid,
    });

    user.Events.push(newEvent._id);
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Event Created Successfully",
      status: 200,
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

//update post

export const PUT = async (req: NextRequest) => {
  try {
    const { postId, title, description, catagory, BookingPrice, image } =
      await req.json();
    const token = cookies().get("auth")?.value;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "You are not authorized to access this page",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const userid = decoded.id;

    if (!userid) {
      return NextResponse.json({
        success: false,
        message: "Cannot find user",
        status: 404,
      });
    }

    const event = await EventModel.findById(postId);
    if (!event) {
      return NextResponse.json({
        success: false,
        message: "Event not found",
        status: 404,
      });
    }

    const user = await UserModel.findById(userid);
    if (!user || !user.isOrganizer) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to update this event",
        status: 403,
      });
    }

    if (event.user.toString() !== userid) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized to update this event",
        status: 403,
      });
    }

    if (image) {
      const eventImage = await uploadImage(image, "eventImage");
      event.image = eventImage.secure_url;
    }

    if (title) event.title = title;
    if (description) event.description = description;
    if (catagory) event.catagory = catagory;
    if (BookingPrice) event.BookingPrice = BookingPrice;

    return NextResponse.json({
      success: true,
      message: "Event updated successfully",
      status: 200,
      event,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  // Extract EventId from request (assuming it's passed as a query parameter)
  const { searchParams } = new URL(req.url);
  const EventId = searchParams.get("id");

  if (!EventId) {
    return NextResponse.json({
      success: false,
      message: "Event ID is required",
      status: 400,
    });
  }

  // Find the event
  let event = await EventModel.findById(EventId);

  if (!event) {
    return NextResponse.json({
      success: false,
      message: "Event not found",
      status: 404,
    });
  }

  let userid = event.user;

  // Get the token from cookies
  let token = cookies().get("auth")?.value;
  let jwt_token = process.env.JWT_TOKEN;

  if (!token || !jwt_token) {
    return NextResponse.json({
      success: false,
      message: "User unauthorized",
      status: 401,
    });
  }

  // Verify the token and extract user ID
  let decoded;
  try {
    decoded = jwt.verify(token, jwt_token) as jwt.JwtPayload;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid token",
      status: 401,
    });
  }

  let anotherUserId = decoded.id;

  // Check if the user is authorized to delete the event
  if (!(userid === anotherUserId)) {
    return NextResponse.json({
      success: false,
      status: 403,
      message: "You are not authorized to delete this event",
    });
  }

  // Delete the event
  await EventModel.findByIdAndDelete(EventId);

  return NextResponse.json({
    success: true,
    message: "Event deleted successfully",
    status: 200,
  });
};
