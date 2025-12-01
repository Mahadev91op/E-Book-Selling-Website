"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Star, Zap, TrendingUp, Users } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    // Changed: min-h-screen, flex, items-center to center content perfectly
    // Added pt-20 to compensate for Navbar height
    <section className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden bg-slate-50">
      
      {/* === Grid & Noise Background === */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* === Animated Blobs === */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* === Left Content === */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-2xl lg:max-w-none mx-auto">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 shadow-sm mb-4"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700 tracking-wide">
                The #1 Digital Library
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
            >
              Fuel Your Mind with <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Limitless Knowledge
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed"
            >
              Access a vast collection of premium e-books anytime, anywhere. 
              Join a community of 50,000+ learners and start your journey today.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href="/books" className="group relative w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-slate-900 text-white font-bold text-lg shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Reading <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0"></div>
              </Link>
              
              <Link href="#about" className="w-full sm:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-slate-700 border border-slate-200 font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-sm">
                How it Works
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-8 flex items-center justify-center lg:justify-start gap-6 border-t border-slate-200/60"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 bg-[url('https://i.pravatar.cc/100?img=${i + 10}')] bg-cover`}></div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                  +2k
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-semibold text-slate-600">Trusted by readers</p>
              </div>
            </motion.div>
          </div>

          {/* === Right Content === */}
          <div className="flex-1 relative w-full flex justify-center lg:justify-end perspective-1000">
            <motion.div style={{ y: y1 }} className="relative z-10 w-[320px] md:w-[400px]">
              {/* Main Card */}
              <motion.div
                initial={{ rotateY: 15, rotateX: 5, opacity: 0, scale: 0.9 }}
                animate={{ rotateY: -5, rotateX: 5, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, type: "spring" }}
                className="relative aspect-[3/4] bg-white/80 rounded-[2rem] shadow-2xl border border-slate-100 p-6 flex flex-col backdrop-blur-sm"
              >
                <div className="w-full flex-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                    <BookOpen className="w-24 h-24 mx-auto mb-4 opacity-90 drop-shadow-md" />
                    <h3 className="text-2xl font-serif font-bold tracking-wider">MODERN<br/>READER</h3>
                  </div>
                  <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900">Trending Now</h4>
                    <p className="text-sm text-slate-500">Global Bestseller</p>
                  </div>
                  <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center text-white">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Widgets */}
              <motion.div style={{ y: y2 }} className="absolute -top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float">
                <div className="p-2 bg-green-100 rounded-full text-green-600"><TrendingUp className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-500 font-bold uppercase">Growth</p><p className="text-sm font-bold text-slate-900">+45% Sales</p></div>
              </motion.div>

              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600"><Users className="w-6 h-6" /></div>
                <div><p className="text-xs text-slate-500 font-bold uppercase">Community</p><p className="text-sm font-bold text-slate-900">12k Active</p></div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}