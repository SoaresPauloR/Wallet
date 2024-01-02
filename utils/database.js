import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongoose connection established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DATABASE,
      useNewUrlParser: true,
    });

    isConnected = true;
    console.log("Mongoose connection established 1");
  } catch (error) {
    console.log(error);
  }
};
