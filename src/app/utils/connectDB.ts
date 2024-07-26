import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    mongoose
      .connect("mongodb://localhost:27017", {
        dbName: "event_management_system",
      })
      .then(() => {
        console.log("successfully connected to db");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
