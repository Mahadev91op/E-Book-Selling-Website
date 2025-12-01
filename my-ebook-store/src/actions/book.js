"use server";

import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { redirect } from "next/navigation";

export async function createBook(formData) {
  const title = formData.get("title");
  const author = formData.get("author");
  const description = formData.get("description");
  const price = formData.get("price");
  const coverImage = formData.get("coverImage");

  try {
    await connectDB();
    const newBook = new Book({
      title,
      author,
      description,
      price: parseFloat(price),
      coverImage,
    });
    await newBook.save();
  } catch (error) {
    console.error("Error creating book:", error);
    return { error: "Failed to publish book" };
  }
  
  redirect("/");
}