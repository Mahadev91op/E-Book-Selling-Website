"use client";

import Link from "next/link"; // Link import karein
import { motion } from "framer-motion";
import { BookOpen, Star, ShoppingCart, Lock } from "lucide-react";

export default function BookCard({ book, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl border border-slate-100 shadow-xl shadow-blue-900/5 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
    >
      {/* Book Cover Area */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100">
        {/* Image */}
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          {/* Link yahan add kiya gaya hai */}
          <Link 
            href={`/books/${book._id}`} 
            className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-blue-50"
          >
            <BookOpen className="w-4 h-4" /> View Details
          </Link>
        </div>

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-blue-700 shadow-sm border border-white">
          ₹{book.price}
        </div>
      </div>

      {/* Book Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-1 text-yellow-400 mb-2 text-xs">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" />
          ))}
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 font-medium mb-4">{book.author}</p>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Secure Read
          </div>
          
          {/* Buy Button */}
          <button className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}