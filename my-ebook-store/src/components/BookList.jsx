import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function BookList({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16 px-4">
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} className="group relative perspective-1000 flex flex-col items-center">
            
            {/* Book Cover (3D Effect) */}
            <div className="relative w-full aspect-[2/3] max-w-[240px] rounded-r-md rounded-l-sm shadow-[15px_15px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 transform group-hover:-translate-y-4 group-hover:rotate-y-[-12deg] group-hover:shadow-[20px_20px_50px_rgba(0,0,0,0.7)] cursor-pointer bg-[#3e2723]">
              
              {/* Main Image */}
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover rounded-r-md rounded-l-sm opacity-90 group-hover:opacity-100 transition-opacity"
              />
              
              {/* Spine Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/30 to-transparent pointer-events-none"></div>
              
              {/* Texture Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20 mix-blend-overlay pointer-events-none rounded-r-md rounded-l-sm"></div>

              {/* Gold Border */}
              <div className="absolute inset-3 border border-[#d4af37]/40 rounded-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Shelf Shadow */}
            <div className="absolute -bottom-10 w-32 h-6 bg-black/50 blur-xl rounded-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-x-125"></div>

            {/* Book Info */}
            <div className="mt-6 text-center w-full">
              <h3 className="text-xl font-bold text-[#FDFBF7] truncate px-2 group-hover:text-[#d4af37] transition-colors">
                {book.title}
              </h3>
              <p className="text-[#a1887f] text-sm mb-3 italic">by {book.author}</p>
              
              <div className="flex items-center justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[#FDFBF7] font-bold bg-[#3e2723] px-3 py-1 rounded border border-[#5d4037] shadow-sm">
                  ₹{book.price}
                </span>
                <button className="bg-[#d4af37] text-[#1a0f0a] px-3 py-1 rounded text-sm font-bold hover:bg-[#ffd700] transition-colors shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        // Empty State
        <div className="col-span-full py-24 flex flex-col items-center justify-center text-center opacity-60">
          <BookOpen className="w-16 h-16 text-[#5d4037] mb-4" />
          <p className="text-[#d4af37] text-2xl italic font-serif">The shelves are currently gathering dust...</p>
          <p className="text-[#a1887f] mt-2">Add some books to bring this library to life.</p>
          <Link href="/add-book" className="mt-6 text-[#FDFBF7] border-b border-[#FDFBF7] hover:text-[#d4af37] hover:border-[#d4af37] transition-all pb-1">
            Stock the Shelves &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}