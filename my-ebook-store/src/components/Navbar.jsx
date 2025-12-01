"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react"; // useRef aur useEffect add kiya
import { useRouter } from "next/navigation";
import { 
  Search, ShoppingBag, User, Menu, X, ChevronDown, LogOut, BookOpen, PlusCircle, Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSearchSuggestions } from "@/actions/book"; // Server Action import kiya

export default function Navbar({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Suggestions store karne ke liye
  const [showSuggestions, setShowSuggestions] = useState(false); // Dropdown dikhana hai ya nahi
  const [isSearching, setIsSearching] = useState(false); // Loading state
  const searchRef = useRef(null); // Click outside detect karne ke liye
  const router = useRouter();

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    // Click Outside Handler to close suggestions
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search Suggestion Logic (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        const results = await getSearchSuggestions(searchQuery);
        setSuggestions(results);
        setIsSearching(false);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300); // 300ms ka delay (user ke rukne ka intezaar)

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    if ((e.key === "Enter" || e.type === "click") && searchQuery.trim() !== "") {
      router.push(`/books?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
        ? "bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-lg shadow-indigo-500/5 py-2" 
        : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-12 items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <BookOpen className="w-5 h-5" />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight">
              E-BookStore
            </span>
          </Link>

          {/* Desktop Nav & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-8">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors py-2">
                Categories <ChevronDown className="w-4 h-4" />
              </button>
              {/* Dropdown UI (Shortened for clarity) */}
            </div>

            <Link href="/books" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Browse All
            </Link>

            {/* === ADVANCED SEARCH BOX === */}
            <div className="relative w-full max-w-sm group" ref={searchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search books, authors..." 
                  className="h-10 w-full rounded-full border border-indigo-100/50 bg-white/60 pl-10 pr-10 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:bg-white/80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                />
                {/* Loading Spinner */}
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  </div>
                )}
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl ring-1 ring-black/5 overflow-hidden z-50"
                  >
                    {suggestions.length > 0 ? (
                      <div className="py-2">
                        <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-50 mb-1">
                          Suggested Books
                        </div>
                        {suggestions.map((book) => (
                          <Link 
                            key={book._id} 
                            href={`/books?search=${encodeURIComponent(book.title)}`} // Direct search page par le jayega
                            onClick={() => setShowSuggestions(false)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group cursor-pointer"
                          >
                            {/* Tiny Book Cover */}
                            <div className="w-8 h-10 bg-slate-200 rounded overflow-hidden flex-shrink-0 shadow-sm border border-slate-200">
                              <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-700 truncate group-hover:text-blue-700">
                                {book.title}
                              </p>
                              <p className="text-xs text-slate-500 truncate">
                                by {book.author}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-slate-500 text-sm">
                        {isSearching ? "Searching..." : "No books found."}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Section (Cart & Profile) */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Same as before... */}
            {session?.user?.role === "admin" && (
                <Link href="/add-book" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                <PlusCircle className="w-5 h-5" />
                <span>Add Book</span>
                </Link>
            )}
            
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative p-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            </motion.button>

            {/* Profile Logic (Same as before) */}
            {session ? (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 p-1 rounded-full border border-indigo-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold uppercase">
                    {session.user.name?.[0] || "U"}
                  </div>
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-gray-100 bg-white/90 backdrop-blur-xl p-2 shadow-2xl">
                      <div className="px-4 py-3 bg-indigo-50/50 rounded-xl mb-2">
                        <p className="text-sm font-bold text-slate-900">{session.user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                      </div>
                      <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="hidden md:inline-flex text-sm font-semibold text-slate-700 hover:text-blue-600">Log in</Link>
                <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-all">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}