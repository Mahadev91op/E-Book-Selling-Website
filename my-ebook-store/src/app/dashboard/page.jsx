import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { Book } from "@/models/Book"; // Model register karne ke liye zaroori hai
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User as UserIcon, BookOpen, Calendar, LayoutDashboard, Settings } from "lucide-react";

async function getUserData() {
  const session = await auth();
  if (!session) return null;

  try {
    await connectDB();
    // Library ko populate karein taaki books count mil sake
    const user = await User.findById(session.user.id).populate("library").lean();
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  
  // Agar login nahi hai to login page bhejo
  if (!session) {
    redirect("/login");
  }

  const user = await getUserData();
  
  // Date format karein
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : "N/A";

  const totalBooks = user?.library?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar session={session} />
      
      <main className="container mx-auto px-6 py-28">
        <div className="max-w-5xl mx-auto">
          
          {/* === Header Card === */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100 border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg z-10">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left z-10">
              <h1 className="text-3xl font-bold text-slate-900 mb-1">{user?.name}</h1>
              <p className="text-slate-500 mb-3">{user?.email}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
                  <Calendar className="w-3 h-3" /> Member since {joinDate}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold capitalize">
                  <UserIcon className="w-3 h-3" /> {session.user.role || "Reader"}
                </span>
              </div>
            </div>
          </div>

          {/* === Stats Grid === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Books Owned</p>
                <p className="text-3xl font-bold text-slate-900">{totalBooks}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                <LayoutDashboard className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Account Status</p>
                <p className="text-3xl font-bold text-slate-900">Active</p>
              </div>
            </div>
          </div>

          {/* === Quick Actions === */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-400" /> Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/my-orders" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group border border-slate-100 hover:border-indigo-100">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-semibold">Go to My Library</span>
              </Link>
              
              <Link href="/books" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors group border border-slate-100 hover:border-indigo-100">
                <div className="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform text-blue-600">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <span className="font-semibold">Browse Store</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}