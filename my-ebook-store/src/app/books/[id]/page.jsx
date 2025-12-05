import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { User } from "@/models/User"; 
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import BuyButton from "@/components/BuyButton"; // 👈 Yahan Naya Component Import Kiya
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, CheckCircle, ArrowLeft, BookOpen, Share2, BookOpenText } from "lucide-react";

// Database se book fetch karne ka function
async function getBook(id) {
  try {
    await connectDB();
    const book = await Book.findById(id).lean();
    if (!book) return null;
    return { ...book, _id: book._id.toString() };
  } catch (e) {
    return null;
  }
}

// User ka data lane ka function (taaki check karein ki book kharidi hai ya nahi)
async function getUser(email) {
  if (!email) return null;
  await connectDB();
  return await User.findOne({ email }).lean();
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBook(id);
  const session = await auth();

  if (!book) {
    return notFound();
  }

  // Check karna ki user ne book pehle se khareedi hai ya nahi
  let hasPurchased = false;
  if (session?.user?.email) {
    const user = await getUser(session.user.email);
    // User ki library check karein
    hasPurchased = user?.library?.map(libId => libId.toString()).includes(id);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar session={session} />

      <main className="container mx-auto px-6 py-28">
        {/* Back Button */}
        <Link href="/books" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left: Book Cover Image */}
            <div className="lg:col-span-5 bg-slate-100 relative p-8 md:p-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/50"></div>
              <div className="relative shadow-2xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-500 max-w-[300px]">
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right: Book Details */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
              
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> In Stock
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Best Seller
                </span>
              </div>

              {/* Title & Author */}
              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-slate-500 font-medium mb-8">
                by <span className="text-blue-600 underline decoration-blue-200 underline-offset-4">{book.author}</span>
              </p>

              {/* Price Block */}
              <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
                <div className="text-4xl font-bold text-slate-900">₹{book.price}</div>
                <div className="text-xl text-slate-400 line-through mb-1">₹{book.price + 200}</div>
                <div className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-1">
                  Save ₹200
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" /> Synopsis
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {book.description}
                </p>
              </div>

              {/* Action Buttons Area */}
              <div className="mt-auto flex flex-col gap-4">
                
                {hasPurchased ? (
                  // Agar book khareed li hai, to "Read Now" button dikhao
                  <Link 
                    href={`/books/${book._id}/read`}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpenText className="w-6 h-6" /> Read Now (Owned)
                  </Link>
                ) : (
                  // Agar nahi khareedi, to humara Naya BuyButton dikhao
                  <BuyButton bookId={book._id.toString()} price={book.price} />
                )}

                <div className="flex gap-4">
                  <button className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-slate-400 transition-all flex items-center justify-center gap-2 w-full">
                    <Share2 className="w-5 h-5" /> Share
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}