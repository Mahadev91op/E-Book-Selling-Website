"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, ShoppingBag, Menu, X, ChevronDown, LogOut, BookOpen, PlusCircle, Loader2, ChevronRight, Library, LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSearchSuggestions } from "@/actions/book";

const categories = [
  "Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Business", "Self-Help", "History", "Biography"
];

export default function Navbar({ session }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const searchRef = useRef(null);       
  const mobileSearchRef = useRef(null); 
  
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (event) => {
      const clickedOutsideDesktop = searchRef.current && !searchRef.current.contains(event.target);
      const isMobileRendered = mobileSearchRef.current;
      const clickedOutsideMobile = isMobileRendered ? !mobileSearchRef.current.contains(event.target) : true;

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    }, 300);

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
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-lg shadow-indigo-500/5 py-2" 
          : "bg-transparent border-b border-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-12 items-center justify-between gap-4">
            
            {/* === Logo === */}
            <Link href="/" className="flex items-center gap-2 group z-50">
              <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg">
                <BookOpen className="w-5 h-5" />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 tracking-tight">
                E-BookStore
              </span>
            </Link>

            {/* === Desktop Nav & Search === */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-6">
              
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors py-2">
                  Categories <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-56 pt-2"
                    >
                      <div className="bg-white rounded-xl border border-slate-100 shadow-xl overflow-hidden p-2">
                        {categories.map((cat) => (
                          <Link 
                            key={cat} 
                            href={`/books?search=${cat}`}
                            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                          >
                            {cat} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                        <div className="h-px bg-slate-100 my-1"></div>
                        <Link href="/books" className="block px-4 py-2 text-xs font-bold text-center text-blue-600 hover:underline">
                          View All Categories
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/books" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Browse All
              </Link>

              {/* Desktop Search Box */}
              <div className="relative w-full max-w-sm group" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search books..." 
                    className="h-10 w-full rounded-full border border-indigo-100/50 bg-white/60 pl-10 pr-10 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm hover:bg-white/80"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                  />
                  {isSearching && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>
                  )}
                </div>

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
                          {suggestions.map((book) => (
                            <Link 
                              key={book._id} 
                              href={`/books/${book._id}`}
                              onClick={() => setShowSuggestions(false)}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group cursor-pointer"
                            >
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

            {/* === RIGHT: Cart & Mobile Toggle === */}
            <div className="flex items-center gap-3 md:gap-5">
              
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

              {/* Desktop Profile Dropdown */}
              {session ? (
                <div className="relative hidden md:block">
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
                        
                        <Link href="/dashboard" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors mb-1">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link href="/my-orders" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors mb-1">
                          <Library className="w-4 h-4" /> My Library
                        </Link>

                        <Link href="/api/auth/signout" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login" className="text-sm font-semibold text-slate-700 hover:text-blue-600">Log in</Link>
                  <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition-all">Sign up</Link>
                </div>
              )}

              <button 
                className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* === MOBILE MENU OVERLAY === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="text-lg font-bold text-slate-900">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(e); }} 
                className="relative"
                ref={mobileSearchRef}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search books..." 
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
                />
                
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-slate-100 shadow-2xl ring-1 ring-black/5 overflow-hidden z-[70]"
                    >
                      {suggestions.length > 0 ? (
                        <div className="py-2 max-h-60 overflow-y-auto">
                          {suggestions.map((book) => (
                            <Link 
                              key={book._id} 
                              href={`/books/${book._id}`}
                              onClick={() => {
                                setShowSuggestions(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0"
                            >
                              <div className="w-8 h-10 bg-slate-200 rounded overflow-hidden flex-shrink-0 shadow-sm">
                                <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-700 truncate">
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
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-50 font-medium text-slate-700">
                Home
              </Link>
              
              <div className="px-4 py-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Categories</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link 
                      key={cat} 
                      href={`/books?search=${cat}`} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-slate-600 hover:text-blue-600 text-sm border-l-2 border-transparent hover:border-blue-500 pl-3"
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link href="/books" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-blue-600 font-semibold text-sm pl-3">
                    View All Categories &rarr;
                  </Link>
                </div>
              </div>

              {session?.user?.role === "admin" && (
                <Link href="/add-book" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 font-medium mt-4">
                  <PlusCircle className="w-5 h-5" /> Add New Book
                </Link>
              )}
            </div>

            {/* Mobile Footer (Auth & User Links) */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              {session ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {session.user.name?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{session.user.name}</p>
                      <p className="text-xs text-slate-500">{session.user.email}</p>
                    </div>
                  </div>

                  {/* 👇 YEH NAYE BUTTONS HAIN JO PAKKA DIKHENGE (Agar Logged in ho) */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm shadow-sm"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link 
                      href="/my-orders" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm"
                    >
                      <Library className="w-4 h-4" /> My Library
                    </Link>
                  </div>

                  <Link href="/api/auth/signout" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center py-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-white">
                    Log In
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-center py-3 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}