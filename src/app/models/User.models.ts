import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  forgotPassToken?: string;
  forgotPassTokenExpiry?: Date;
  isOrganizer?: boolean;
  isAdmin?: boolean;
  documentNumber: string;
  documentType: string;
  image?: string;
  KycDocument?: string;
  OrganizationName?: string;
  OrganizationsEmail?: string;
  Events: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    verifyToken: { type: String },
    verifyTokenExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
    }, // 1 hour expiry
    forgotPassToken: { type: String },
    forgotPassTokenExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
    }, // 1 hour expiry
    isOrganizer: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    image: { type: String },
    documentNumber: { type: String },
    documentType: { type: String },
    KycDocument: { type: String },
    OrganizationName: { type: String },
    OrganizationsEmail: { type: String },
    Events: [{ type: mongoose.Schema.Types.ObjectId, ref: "EventModel" }],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.UserModel || mongoose.model<IUser>("UserModel", UserSchema);

export default UserModel;
