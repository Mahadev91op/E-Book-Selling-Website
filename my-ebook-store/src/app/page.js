import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">My E-Book Store</h1>
        <div className="space-x-4">
          <Link 
            href="/register" 
            className="text-sm font-medium text-gray-600 hover:text-purple-600 transition"
          >
            Register
          </Link>
          <Link 
            href="/login" 
            className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 transition"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Your E-Book Empire 📚
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Discover, Read, and Sell E-Books easily. Join us to start your journey.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Get Started
          </Link>
          <Link 
            href="/add-book" 
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition shadow-sm"
          >
            Browse Books
          </Link>
        </div>
      </main>
    </div>
  );
}