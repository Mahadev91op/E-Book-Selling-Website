import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, required: true }, // Image URL
}, { timestamps: true });

export const Book = mongoose.models?.Book || mongoose.model("Book", bookSchema);