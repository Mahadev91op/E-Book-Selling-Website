"use client";

import { useActionState } from "react";
import { buyBook } from "@/actions/order";
import { Loader2, ShoppingCart } from "lucide-react";

export default function BuyButton({ bookId, price }) {
  // Server Action ko bind karein
  const buyBookWithId = buyBook.bind(null, bookId);

  // Form State manage karein (React 19 feature)
  const [state, formAction, isPending] = useActionState(buyBookWithId, null);

  return (
    <form action={formAction} className="w-full">
      {/* Agar koi error aata hai to yahan dikhega */}
      {state?.error && (
        <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
          {state.error}
        </div>
      )}
      
      {/* Agar success message hai to */}
      {state?.message && (
        <div className="p-3 mb-3 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm rounded-lg text-center">
          {state.message}
        </div>
      )}

      <button 
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" /> Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" /> Buy Now for ₹{price}
          </>
        )}
      </button>
    </form>
  );
}