import mongoose, { Schema, Document } from "mongoose";

interface Event extends Document {
  title: string;
  description: string;
  image: string;
  catagory: string;
  BookingPrice: number;
  user: {};
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    catagory: {},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    BookingPrice: { type: Number },
  },
  { timestamps: true }
);

const EvnetModel =
  mongoose.models.EventModel ||
  mongoose.model<Event>("EventModel", EventSchema);

export default EvnetModel;
