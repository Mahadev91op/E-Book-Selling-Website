"use server";

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function buyBook(bookId) {
  const session = await auth();
  
  if (!session) {
    return { error: "Please login to purchase" };
  }

  try {
    await connectDB();
    const user = await User.findById(session.user.id);
    
    if (!user) {
        return { error: "User account not found" };
    }

    // FIX: Agar library array nahi hai, to usse initialize karein
    if (!user.library) {
        user.library = [];
    }

    // Check karein ki book pehle se hai ya nahi (String comparison safe hai)
    const alreadyOwns = user.library.some(id => id.toString() === bookId);
    
    if (alreadyOwns) {
        return { message: "You already own this book" };
    }

    // Book add karein
    user.library.push(bookId);
    await user.save();
    
    revalidatePath(`/books/${bookId}`);
    return { success: true };
  } catch (error) {
    console.error("Detailed Purchase Error:", error); // Terminal mein error dekhein
    // Error message user ko dikhayen taaki debugging aasan ho
    return { error: `Error: ${error.message}` };
  }
}