import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

async function getBookContent(id) {
  try {
    await connectDB();
    const book = await Book.findById(id).select("title fileUrl").lean();
    if (!book) return null;
    return { ...book, _id: book._id.toString() };
  } catch (e) {
    return null;
  }
}

export default async function ReadBookPage({ params }) {
  const { id } = await params;
  const session = await auth();

  // Agar user login nahi hai to login page par bhej do
  if (!session) {
    redirect("/login");
  }

  const book = await getBookContent(id);

  if (!book) {
    return notFound();
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-4">
          <Link 
            href={`/books/${id}`} 
            className="p-2 rounded-full hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold truncate max-w-md">{book.title}</h1>
        </div>
        <div className="text-sm text-slate-400">
          Reading Mode
        </div>
      </header>

      {/* PDF Viewer / Content Area */}
      <div className="flex-1 bg-slate-100 overflow-hidden relative">
        <iframe 
          src={`${book.fileUrl}#toolbar=0`} 
          className="w-full h-full border-none"
          title="Book Reader"
        />
      </div>
    </div>
  );
}