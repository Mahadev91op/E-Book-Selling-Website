import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  image: { type: String },
  // 👇 Yeh naya field add karein
  library: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
}, { timestamps: true });

export const User = mongoose.models?.User || mongoose.model("User", userSchema);