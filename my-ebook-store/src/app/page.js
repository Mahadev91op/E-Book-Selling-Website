import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { auth } from "@/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BookCard from "@/components/BookCard";

// Sirf 4 Latest Books Fetch karein
async function getFeaturedBooks() {
  try {
    await connectDB();
    const books = await Book.find({}).sort({ createdAt: -1 }).limit(4).lean();
    return books.map(book => ({ ...book, _id: book._id.toString() }));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default async function Home() {
  const books = await getFeaturedBooks();
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      <Navbar session={session} />
      <HeroSection />
      
      {/* Featured Books Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Collection</h2>
              <p className="text-slate-600">Handpicked e-books just for you.</p>
            </div>
            {/* View All Button */}
            <Link href="/books" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
              View All Books <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book, index) => (
              <BookCard key={book._id} book={book} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/books" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors w-full">
              Explore All Books
            </Link>
          </div>
        </div>
      </section>
      
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
}