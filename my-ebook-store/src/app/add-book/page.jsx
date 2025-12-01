"use client";

import { createBook } from "@/actions/book";
import { motion } from "framer-motion";
import { Feather, Save } from "lucide-react";

export default function AddBookPage() {
  return (
    <div className="min-h-screen bg-[#2D1B14] relative flex items-center justify-center p-6">
      {/* Background Textures */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40"></div>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80 pointer-events-none"></div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-2xl bg-[#FDFBF7] p-10 md:p-14 rounded-sm shadow-2xl rotate-1"
      >
        {/* Paper Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 rounded-sm pointer-events-none"></div>
        
        {/* Tape Effect at corners */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e0e0e0]/80 rotate-1 shadow-sm backdrop-blur-sm"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <Feather className="w-10 h-10 mx-auto text-[#3e2723] mb-4 opacity-80" />
            <h1 className="text-4xl font-serif font-bold text-[#3e2723] tracking-wide">
              The Author's Desk
            </h1>
            <p className="text-[#5d4037] font-serif italic mt-2">
              "Drafting a new masterpiece..."
            </p>
            <div className="h-1 w-20 bg-[#3e2723] mx-auto mt-4 rounded-full opacity-20"></div>
          </div>

          <form action={createBook} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-serif text-[#3e2723] font-bold">Title of the Work</label>
                <input type="text" name="title" placeholder="e.g. The Great Adventure" className="w-full bg-transparent border-b-2 border-[#8d6e63] py-2 font-serif text-[#2c1810] placeholder-[#a1887f] focus:outline-none focus:border-[#3e2723] transition-colors" required />
              </div>
              
              <div className="space-y-2">
                <label className="font-serif text-[#3e2723] font-bold">Author's Name</label>
                <input type="text" name="author" placeholder="e.g. John Doe" className="w-full bg-transparent border-b-2 border-[#8d6e63] py-2 font-serif text-[#2c1810] placeholder-[#a1887f] focus:outline-none focus:border-[#3e2723] transition-colors" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-serif text-[#3e2723] font-bold">Synopsis (Description)</label>
              <textarea name="description" rows="4" placeholder="What is this story about?" className="w-full bg-[#fcfbf9] border-2 border-[#8d6e63]/30 rounded p-3 font-serif text-[#2c1810] placeholder-[#a1887f] focus:outline-none focus:border-[#3e2723] focus:bg-white transition-all resize-none" required></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-serif text-[#3e2723] font-bold">Price (₹)</label>
                <input type="number" name="price" placeholder="299" className="w-full bg-transparent border-b-2 border-[#8d6e63] py-2 font-serif text-[#2c1810] placeholder-[#a1887f] focus:outline-none focus:border-[#3e2723] transition-colors" required />
              </div>

              <div className="space-y-2">
                <label className="font-serif text-[#3e2723] font-bold">Cover Image URL</label>
                <input type="text" name="coverImage" placeholder="https://..." className="w-full bg-transparent border-b-2 border-[#8d6e63] py-2 font-serif text-[#2c1810] placeholder-[#a1887f] focus:outline-none focus:border-[#3e2723] transition-colors" required />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full mt-8 py-4 bg-[#3e2723] text-[#FDFBF7] font-serif font-bold text-xl rounded shadow-[0_4px_14px_0_rgba(62,39,35,0.39)] hover:shadow-[0_6px_20px_rgba(62,39,35,0.23)] hover:bg-[#2c1810] transition-all flex items-center justify-center gap-3"
            >
              <Save className="w-5 h-5" />
              Publish to Shelf
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}