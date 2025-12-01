"use client";

import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UserPlus, User, Mail, Lock, ArrowRight } from "lucide-react";

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md relative z-10"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white mb-6 shadow-lg shadow-indigo-500/30 transform -rotate-3">
            <UserPlus className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Join Us</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Create your account and start reading today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
                required 
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
                required 
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
                required 
              />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-600/40 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                Sign Up <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition-colors">
              Log In Here
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}