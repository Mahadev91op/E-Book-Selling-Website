"use client";

import { doLogin } from "@/actions/login";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form action={doLogin} className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Login</h2>
        
        <input type="email" name="email" placeholder="Email" className="mb-4 w-full rounded border p-2 text-black" required />
        <input type="password" name="password" placeholder="Password" className="mb-4 w-full rounded border p-2 text-black" required />
        
        <button type="submit" className="w-full rounded bg-green-600 p-2 text-white hover:bg-green-700 transition">Login</button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          No account? <Link href="/register" className="text-blue-500 hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}