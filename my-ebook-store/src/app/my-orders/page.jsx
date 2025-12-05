import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Book } from "@/models/Book"; // Book model register hona zaroori hai
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Library } from "lucide-react";

async function getMyBooks() {
  const session = await auth();
  if (!session) return null;

  try {
    await connectDB();
    // User ki library field ko populate karein (Book details layein)
    const user = await User.findById(session.user.id).populate("library").lean();
    
    if (!user || !user.library) return [];

    // Data ko serialize karein
    return user.library.map(book => ({
      ...book,
      _id: book._id.toString()
    }));
  } catch (error) {
    console.error("Library fetch error:", error);
    return [];
  }
}

export default async function MyOrdersPage() {
  const session = await auth();
  
  // Agar login nahi hai to login page bhejo
  if (!session) {
    redirect("/login");
  }

  const myBooks = await getMyBooks();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar session={session} />
      
      <main className="container mx-auto px-6 py-32">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Library className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              My Personal Library
            </h1>
          </div>
          <p className="text-slate-600 ml-1">
            You own {myBooks?.length || 0} books. Happy Reading!
          </p>
        </div>

        {/* Books Grid */}
        {myBooks && myBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myBooks.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Your library is empty</h3>
            <p className="text-slate-500 mb-6">
              Looks like you haven't purchased any books yet.
            </p>
            <Link href="/books" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors">
              Browse Store
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}