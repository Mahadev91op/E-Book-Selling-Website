"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-16 pb-24 md:pt-24 md:pb-32">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-4 border border-blue-200">
                <Zap className="w-3 h-3 fill-current" /> New Arrivals Available
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Discover Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Great Read
                </span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0 leading-relaxed"
            >
              Explore thousands of premium e-books across all genres. 
              From bestsellers to hidden gems, your digital library starts here.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
            >
              <Link href="#books" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                Start Reading <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="#categories" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                Explore Genres
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-8 flex items-center justify-center md:justify-start gap-8 border-t border-slate-200/60"
            >
              <div>
                <p className="text-3xl font-bold text-slate-900">50k+</p>
                <p className="text-sm text-slate-500 font-medium">Active Readers</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-3xl font-bold text-slate-900">12k+</p>
                <p className="text-sm text-slate-500 font-medium">Books Available</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative w-full max-w-lg md:max-w-none flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative z-10"
            >
              {/* Floating Book Card */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-72 md:w-80 aspect-[4/5] bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-6 flex flex-col items-center text-center backdrop-blur-sm"
              >
                <div className="w-full h-4/5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-inner flex items-center justify-center mb-6 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <BookOpen className="w-24 h-24 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-1">Featured Masterpiece</h3>
                <p className="text-slate-500 text-sm mb-3">By Best Selling Author</p>
                
                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>

              <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}