import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar"; // Header ki jagah Navbar import kiya
import BookList from "@/components/BookList"; 

// Database se books laane ka function
async function getBooks() {
  try {
    await connectDB();
    const books = await Book.find({}).sort({ createdAt: -1 }).lean();
    return books.map(book => ({
      ...book, 
      _id: book._id.toString()
    }));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      {/* Updated Navbar Component */}
      <Navbar session={session} />

      <main className="container mx-auto px-6 py-12">
        {/* Modern Hero Section */}
        <section className="mb-16 text-center space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
            Discover Your Next Adventure
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Explore the World of <span className="text-blue-600">Digital Books</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get access to thousands of premium e-books across fiction, business, science, and more. Instant download, read anywhere.
          </p>
        </section>

        {/* Books Grid */}
        <BookList books={books} />
      </main>
    </div>
  );
}