"use client";

import { doLogin } from "@/actions/login";
import Link from "next/link";
import { useActionState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, LogIn, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(doLogin, null);

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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-500/30 transform rotate-3">
            <LogIn className="w-7 h-7" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your credentials to access your library.
          </p>
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-5">
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium rounded-xl text-center flex items-center justify-center gap-2"
            >
              <span>⚠️</span> {errorMessage}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
                required 
              />
            </div>
            
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium placeholder:text-slate-400"
                required 
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-600 hover:text-slate-800 transition-colors">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Forgot password?
            </Link>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            disabled={isPending}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}