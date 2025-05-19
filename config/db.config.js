import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB).then(() => {
      console.log("Connected to MongoDB");
    }).catch((error) => {
      console.log(error);
    })
  } catch (error) {
    console.log(error);
    return null;
  }
}
