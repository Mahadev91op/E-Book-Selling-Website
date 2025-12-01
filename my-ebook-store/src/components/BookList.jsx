"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import BookCard from "@/components/BookCard"; // Import kiya

export default function BookList({ books, session }) {
  return (
    <section id="books" className="py-20 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Latest <span className="text-blue-600">Arrivals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Explore our curated collection of premium e-books. Purchase to unlock instant access.
          </motion.p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.length > 0 ? (
            books.map((book, index) => (
              // Yahan ab naya BookCard component use ho raha hai
              <BookCard key={book._id} book={book} index={index} />
            ))
          ) : (
            // Empty State
            <div className="col-span-full py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6 text-slate-400">
                <BookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Books Available</h3>
              <p className="text-slate-500">
                {session?.user?.role === "admin" 
                  ? "You haven't added any books yet." 
                  : "Check back later for new arrivals."}
              </p>
              
              {/* Sirf Admin ko Add Book ka button dikhega */}
              {session?.user?.role === "admin" && (
                <Link href="/add-book" className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors">
                  Add Your First Book
                </Link>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
} 