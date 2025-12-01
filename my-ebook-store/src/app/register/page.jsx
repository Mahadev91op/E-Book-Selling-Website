"use client";

import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await register(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-96 rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
        {error && <p className="mb-4 text-red-500 text-center text-sm">{error}</p>}
        
        <input type="text" name="name" placeholder="Name" className="mb-4 w-full rounded border p-2 text-black" required />
        <input type="email" name="email" placeholder="Email" className="mb-4 w-full rounded border p-2 text-black" required />
        <input type="password" name="password" placeholder="Password" className="mb-4 w-full rounded border p-2 text-black" required />
        
        <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700 transition">Register</button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}