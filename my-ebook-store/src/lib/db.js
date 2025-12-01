import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) {
      return;
    }
    const { connection } = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ebook-store",
    });
    console.log(`Connected to MongoDB: ${connection.host}`);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};