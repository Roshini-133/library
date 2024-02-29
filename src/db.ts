import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const mongo_uri = process.env.MONGODB_URI!;

export const connectMongo = mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
