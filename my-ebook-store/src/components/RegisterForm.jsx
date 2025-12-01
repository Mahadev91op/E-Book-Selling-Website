"use client";

import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Feather } from "lucide-react";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    } else {
      router.push("/login");
    }
  };

  return (
    <motion.div 
      initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-5xl"
    >
      <div className="absolute top-4 left-4 w-full h-full bg-black/40 blur-xl rounded-lg -z-10 transform -rotate-1"></div>

      <div className="flex flex-col md:flex-row bg-[#FDFBF7] rounded-r-2xl rounded-l-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[650px] relative">
        
        {/* === Left Page: Cover Art === */}
        <div className="hidden md:flex w-5/12 bg-[#1a237e] text-[#FDFBF7] p-10 flex-col justify-center relative border-r-2 border-[#0d1245] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay"></div>
          
          {/* Silver Border Frame */}
          <div className="absolute inset-6 border-2 border-[#c0c0c0]/30 rounded-sm pointer-events-none"></div>
          
          <div className="z-10 text-center relative">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-8 flex justify-center"
            >
              <div className="p-4 rounded-full bg-[#c0c0c0]/10 border border-[#c0c0c0]/40 shadow-[0_0_15px_rgba(192,192,192,0.2)]">
                <Feather className="w-12 h-12 text-[#c0c0c0]" />
              </div>
            </motion.div>

            <h1 className="text-4xl font-serif font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-[#e0e0e0] via-[#c0c0c0] to-[#909090] drop-shadow-md">
              Start Your<br/>Story
            </h1>
            <p className="mt-6 font-serif italic text-[#c0c0c0]/80 text-lg">
              "Page one awaits."
            </p>
          </div>
        </div>

        {/* === Right Page: Form === */}
        <div className="w-full md:w-7/12 bg-[#f4e4bc] relative p-10 md:p-14 flex flex-col justify-center">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10"></div>

          {/* Bookmark (Blue for Signup) */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100px" }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
            className="absolute top-0 right-16 w-8 bg-blue-800 shadow-md z-20 flex flex-col items-center"
          >
            <div className="w-full h-full bg-gradient-to-b from-blue-900 to-blue-700"></div>
            <div className="w-0 h-0 border-l-[16px] border-l-blue-700 border-r-[16px] border-r-blue-700 border-b-[16px] border-b-transparent absolute -bottom-4"></div>
          </motion.div>

          <div className="relative z-10">
            <div className="mb-8">
              <span className="font-serif text-[#1a237e] text-lg italic block mb-2 opacity-60">The Prologue</span>
              <h2 className="text-4xl font-serif font-bold text-[#1a237e] border-b-2 border-[#1a237e] pb-2 inline-block">
                New Registration
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-50/80 border border-red-800/20 text-red-900 text-sm font-serif italic text-center rounded">
                  {error}
                </div>
              )}

              <div className="relative group">
                <input 
                  type="text" 
                  name="name" 
                  className="block w-full px-4 py-3 text-[#1a237e] bg-[#FDFBF7]/50 border-2 border-[#1a237e]/30 rounded-lg focus:outline-none focus:border-[#1a237e] focus:bg-[#FDFBF7] transition-all font-serif placeholder-transparent peer"
                  placeholder="Full Name"
                  required 
                />
                <label className="absolute left-4 -top-2.5 bg-[#f2e2bb] px-1 text-sm font-serif text-[#1a237e] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#1a237e]/70 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[#1a237e] peer-focus:text-sm">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email" 
                  className="block w-full px-4 py-3 text-[#1a237e] bg-[#FDFBF7]/50 border-2 border-[#1a237e]/30 rounded-lg focus:outline-none focus:border-[#1a237e] focus:bg-[#FDFBF7] transition-all font-serif placeholder-transparent peer"
                  placeholder="Email"
                  required 
                />
                <label className="absolute left-4 -top-2.5 bg-[#f2e2bb] px-1 text-sm font-serif text-[#1a237e] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#1a237e]/70 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[#1a237e] peer-focus:text-sm">
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="password" 
                  name="password" 
                  className="block w-full px-4 py-3 text-[#1a237e] bg-[#FDFBF7]/50 border-2 border-[#1a237e]/30 rounded-lg focus:outline-none focus:border-[#1a237e] focus:bg-[#FDFBF7] transition-all font-serif placeholder-transparent peer"
                  placeholder="Password"
                  required 
                />
                <label className="absolute left-4 -top-2.5 bg-[#f2e2bb] px-1 text-sm font-serif text-[#1a237e] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#1a237e]/70 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-[#1a237e] peer-focus:text-sm">
                  Password
                </label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isPending}
                className="w-full py-3.5 bg-gradient-to-r from-[#1a237e] to-[#283593] text-[#FDFBF7] font-serif font-bold text-xl rounded-lg shadow-md border border-[#0d1245] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isPending ? <Loader2 className="animate-spin w-6 h-6" /> : "Write First Chapter"}
              </motion.button>
            </form>

            <div className="mt-8 text-center pt-4 border-t border-[#1a237e]/10">
              <p className="text-[#1a237e] font-serif">
                Existing author?{" "}
                <Link href="/login" className="text-[#3949ab] font-bold hover:text-[#1a237e] hover:underline transition-colors">
                  Resume Story (Login)
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}