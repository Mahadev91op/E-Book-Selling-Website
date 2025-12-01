"use client";

import { doLogin } from "@/actions/login";
import Link from "next/link";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { Loader2, BookKey } from "lucide-react";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(doLogin, null);

  return (
    <motion.div 
      initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-5xl"
    >
      {/* Book Shadow for Depth */}
      <div className="absolute top-4 left-4 w-full h-full bg-black/40 blur-xl rounded-lg -z-10 transform rotate-1"></div>

      {/* Main Book Container */}
      <div className="flex flex-col md:flex-row bg-[#FDFBF7] rounded-r-2xl rounded-l-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[600px] relative">
        
        {/* === Left Page: The Leather Cover === */}
        <div className="hidden md:flex w-5/12 bg-[#2c1810] text-[#FDFBF7] p-10 flex-col justify-center relative border-r-2 border-[#1a0f0a] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
          
          {/* Leather Texture Overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay"></div>
          
          {/* Gold Border Frame */}
          <div className="absolute inset-6 border-2 border-[#d4af37]/30 rounded-sm pointer-events-none"></div>
          <div className="absolute inset-8 border border-[#d4af37]/20 rounded-sm pointer-events-none"></div>

          <div className="z-10 text-center relative">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="p-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <BookKey className="w-12 h-12 text-[#d4af37]" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-4xl font-serif font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#aa882c] drop-shadow-md"
            >
              The E-Book<br/>Collection
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 font-serif italic text-[#d4af37]/80 text-lg"
            >
              "Unlock a world of stories."
            </motion.p>
          </div>
        </div>

        {/* === Right Page: The Paper & Form === */}
        <div className="w-full md:w-7/12 bg-[#f4e4bc] relative p-10 md:p-14 flex flex-col justify-center">
          
          {/* Paper Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
          
          {/* Inner Shadow (Spine) */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10"></div>

          {/* Bookmark Ribbon */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "120px" }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="absolute top-0 right-10 w-8 bg-red-800 shadow-md z-20 flex flex-col items-center"
          >
            <div className="w-full h-full bg-gradient-to-b from-red-900 to-red-700"></div>
            {/* Triangle Cut at bottom */}
            <div className="w-0 h-0 border-l-[16px] border-l-red-700 border-r-[16px] border-r-red-700 border-b-[16px] border-b-transparent absolute -bottom-4"></div>
          </motion.div>

          {/* 3D Pages Effect on Right Edge */}
          <div className="absolute top-2 bottom-2 right-0 w-4 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] border-l border-gray-300 shadow-inner rotate-y-12 origin-left md:block hidden"></div>

          <div className="relative z-10">
            <div className="mb-8">
              <span className="font-serif text-[#5d4037] text-lg italic block mb-2 opacity-60">Chapter 1</span>
              <h2 className="text-4xl font-serif font-bold text-[#3e2723] border-b-2 border-[#3e2723] pb-2 inline-block">
                Member Login
              </h2>
            </div>

            <form action={formAction} className="space-y-6">
              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50/80 border border-red-800/20 text-red-900 text-sm font-serif italic text-center rounded shadow-sm"
                >
                  {errorMessage}
                </motion.div>
              )}

              <div className="space-y-5">
                <div className="relative group">
                  <input 
                    type="email" 
                    name="email" 
                    id="email"
                    className="block w-full px-4 py-3 text-[#3e2723] bg-[#FDFBF7]/50 border-2 border-[#8d6e63]/30 rounded-lg focus:outline-none focus:border-[#5d4037] focus:bg-[#FDFBF7] transition-all font-serif placeholder-transparent peer"
                    placeholder="Email"
                    required 
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 -top-2.5 bg-[#f2e2bb] px-1 text-sm font-serif text-[#5d4037] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#8d6e63] peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[#3e2723] peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    type="password" 
                    name="password" 
                    id="password"
                    className="block w-full px-4 py-3 text-[#3e2723] bg-[#FDFBF7]/50 border-2 border-[#8d6e63]/30 rounded-lg focus:outline-none focus:border-[#5d4037] focus:bg-[#FDFBF7] transition-all font-serif placeholder-transparent peer"
                    placeholder="Password"
                    required 
                  />
                  <label 
                    htmlFor="password" 
                    className="absolute left-4 -top-2.5 bg-[#f2e2bb] px-1 text-sm font-serif text-[#5d4037] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#8d6e63] peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[#3e2723] peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center space-x-2 cursor-pointer text-[#5d4037]/80 hover:text-[#3e2723] transition-colors font-serif">
                  <input type="checkbox" className="accent-[#5d4037]" />
                  <span>Keep me signed in</span>
                </label>
                <Link href="#" className="text-[#5d4037]/80 hover:text-[#3e2723] hover:underline font-serif italic">
                  Forgot Password?
                </Link>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(62, 39, 35, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isPending}
                className="w-full py-3.5 bg-gradient-to-r from-[#3e2723] to-[#5d4037] text-[#FDFBF7] font-serif font-bold text-xl rounded-lg shadow-md border border-[#2d1b18] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
              >
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity"></div>
                {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : "Open The Book"}
              </motion.button>
            </form>

            <div className="mt-8 text-center pt-4 border-t border-[#3e2723]/10">
              <p className="text-[#5d4037] font-serif">
                Don't have a library card?{" "}
                <Link href="/register" className="text-[#8d6e63] font-bold hover:text-[#3e2723] hover:underline transition-colors">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}