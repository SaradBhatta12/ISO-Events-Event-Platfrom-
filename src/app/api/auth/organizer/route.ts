// route.ts
import { NextResponse, NextRequest } from "next/server";
import uploadImage from "@/app/utils/cloudinary";
import UserModel from "@/app/models/User.models";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  try {
    let formdata = request.formData();
    let documentNumber = (await formdata).get("documentNumber");
    let documentType = (await formdata).get("documentType");
    let passportPhoto = (await formdata).get("passportPhoto");
    let documentPhoto = (await formdata).get("documentPhoto");
    let companyName = (await formdata).get("companyName");

    // Upload passport photo to Cloudinary
    let passport;
    let document;
    try {
      passport = await uploadImage(passportPhoto as File, "passport");
      document = await uploadImage(documentPhoto as File, "document");
    } catch (error) {
      console.error("Error uploading passport photo to Cloudinary:", error);
      return NextResponse.json({
        success: false,
        message: "Failed to upload passport photo",
        status: 500,
      });
    }

    let PassportImg = passport.secure_url;
    let DocumentImg = document.secure_url;

    const token = await cookies().get("auth")?.value;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token || !JWT_SECRET) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
        status: 400,
      });
    }
    // Decode token and verify token
    let userid: string | undefined;
    if (typeof token === "string") {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      userid = decoded.id;
    }

    if (!userid) {
      return NextResponse.json({
        success: false,
        message: "User not found. Please log in first.",
        status: 400,
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userid, {
      documentNumber: documentNumber,
      documentType: documentType,
      passportPhoto: PassportImg,
      documentPhoto: DocumentImg,
      companyName: companyName,
      isOrganizer: true,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully updated all fields. Wait for approval.",
      status: 201,
    });
  } catch (error) {
    console.error("Internal server error", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
};
