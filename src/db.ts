import mongoose from "mongoose";

export const connectMongo = mongoose
  .connect("mongodb+srv://roshini:roshini@library.zy2rvee.mongodb.net/")
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
