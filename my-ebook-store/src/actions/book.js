"use server";

import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { redirect } from "next/navigation";

// Existing createBook function...
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

// --- New Function for Search Suggestions ---
export async function getSearchSuggestions(query) {
  try {
    if (!query || query.trim().length < 2) return []; // Kam se kam 2 akshar hone chahiye

    await connectDB();
    
    // Case-insensitive search (Regex)
    const regex = new RegExp(query, "i");
    
    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex }
      ]
    })
    .select("title author coverImage _id") // Sirf ye fields chahiye
    .limit(5) // Sirf top 5 suggestions dikhayenge
    .lean();

    return books.map(book => ({...book, _id: book._id.toString()}));
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
}