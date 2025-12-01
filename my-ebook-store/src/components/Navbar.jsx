"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  BookOpen,
  PlusCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              E-BookStore
            </span>
          </Link>

          {/* 2. Desktop Navigation & Search (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors py-2"
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Content */}
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setIsCategoryOpen(true)}
                    onMouseLeave={() => setIsCategoryOpen(false)}
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-gray-900/5"
                  >
                    {["Fiction", "Non-Fiction", "Sci-Fi & Fantasy", "Business", "Self Help"].map((item) => (
                      <Link 
                        key={item} 
                        href={`/category/${item.toLowerCase().replace(" ", "-")}`}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/bestsellers" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Bestsellers
            </Link>

            {/* Search Box */}
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search books, authors..." 
                className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          {/* 3. Right Section: Cart, Add Book, Profile */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Add Book Button (Only for Admins) */}
            {session?.user?.role === "admin" && (
                <Link href="/add-book" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Add Book</span>
                </Link>
            )}

            {/* Cart Icon */}
            <button className="relative p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            </button>

            {/* User Profile / Login Button */}
            {session ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold uppercase">
                    {session.user.name?.[0] || "U"}
                  </div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl ring-1 ring-gray-900/5 origin-top-right"
                    >
                      <div className="px-3 py-2 border-b border-gray-100 mb-2">
                        <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                      </div>
                      <Link href="/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <Link href="/orders" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <ShoppingBag className="w-4 h-4" /> My Orders
                      </Link>
                      <Link href="/api/auth/signout" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-blue-600 px-4 py-2">
                  Log in
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Expandable) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <Link href="/" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Home</Link>
                <Link href="/categories" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Categories</Link>
                <Link href="/bestsellers" className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50">Bestsellers</Link>
                {!session && (
                    <>
                        <Link href="/login" className="block px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50">Log in</Link>
                        <Link href="/register" className="block px-3 py-2 rounded-lg text-base font-medium text-blue-600 hover:bg-blue-50">Sign up</Link>
                    </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}