import { connectDB } from "@/lib/db";
import { Book } from "@/models/Book";
import { User } from "@/models/User"; // User import
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

async function getBookContent(id) {
  try {
    await connectDB();
    const book = await Book.findById(id).select("title fileUrl price").lean();
    if (!book) return null;
    return { ...book, _id: book._id.toString() };
  } catch (e) {
    return null;
  }
}

// User fetch helper
async function getUser(email) {
  if (!email) return null;
  await connectDB();
  return await User.findOne({ email }).lean();
}

export default async function ReadBookPage({ params }) {
  const { id } = await params;
  const session = await auth();

  // 1. Check Login
  if (!session) {
    redirect("/login");
  }

  // 2. Check Ownership
  const user = await getUser(session.user.email);
  const hasPurchased = user?.library?.map(libId => libId.toString()).includes(id);

  // Agar user admin hai, toh wo padh sakta hai (Optional)
  const isAdmin = session.user?.role === 'admin'; 

  if (!hasPurchased && !isAdmin) {
    // Agar nahi kharidi, wapas details page par bhejo
    redirect(`/books/${id}`);
  }

  const book = await getBookContent(id);

  if (!book) {
    return notFound();
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">
      <header className="h-16 flex items-center justify-between px-6 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center gap-4">
          <Link href={`/books/${id}`} className="p-2 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold truncate max-w-md">{book.title}</h1>
        </div>
        <div className="text-sm text-green-400 font-medium flex items-center gap-2">
          <Lock className="w-3 h-3" /> Secure Reader
        </div>
      </header>

      <div className="flex-1 bg-slate-100 overflow-hidden relative">
        <iframe src={`${book.fileUrl}#toolbar=0`} className="w-full h-full border-none" title="Book Reader" />
      </div>
    </div>
  );
}