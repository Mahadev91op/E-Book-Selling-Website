import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard"; // BookList ki jagah Card use karte hain grid ke liye
import { Search, BookOpen } from "lucide-react";

async function getBooks(searchQuery) {
  try {
    await connectDB();
    
    let filter = {};
    if (searchQuery) {
      filter = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } },
          { author: { $regex: searchQuery, $options: "i" } }
        ]
      };
    }

    const books = await Book.find(filter).sort({ createdAt: -1 }).lean();
    return books.map(book => ({ ...book, _id: book._id.toString() }));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function BooksPage({ searchParams }) {
  const params = await searchParams; // Next.js 15+ needs await
  const query = params?.search || "";
  
  const books = await getBooks(query);
  const session = await auth();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar session={session} />
      
      <main className="container mx-auto px-6 py-32">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              {query ? `Search Results: "${query}"` : "All Books"}
            </h1>
          </div>
          <p className="text-slate-600 ml-1">
            Showing {books.length} {books.length === 1 ? "result" : "results"}
          </p>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-4 text-slate-400">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No books found</h3>
            <p className="text-slate-500">
              We couldn't find any books matching "{query}". <br/> Try searching for something else.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}