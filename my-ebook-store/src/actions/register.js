"use server";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (formData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong!" };
  }
};