"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Amit Sharma", role: "Bookworm", text: "The collection here is unmatched! Found rare editions instantly.", rating: 5 },
  { name: "Sarah J.", role: "Student", text: "Instant downloads saved my semester. Love the clean UI!", rating: 5 },
  { name: "Rajesh K.", role: "Developer", text: "Technical books are super cheap here. Great resource.", rating: 4 },
  { name: "Emily Blunt", role: "Author", text: "Publishing my book was so easy. The support team is amazing.", rating: 5 },
  { name: "Michael S.", role: "Reader", text: "Night mode reading on the web app is a game changer.", rating: 5 },
  { name: "Priya V.", role: "Mom", text: "My kids love the storybooks available here. Safe & secure.", rating: 5 },
  { name: "David G.", role: "Historian", text: "Found excellent historical archives. Very happy!", rating: 4 },
  { name: "Lisa M.", role: "Designer", text: "The book covers and layout inspiration are endless.", rating: 5 },
];

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="w-80 flex-shrink-0 p-6 mx-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-lg shadow-indigo-500/5 hover:scale-105 hover:shadow-xl transition-all duration-300">
    <div className="flex gap-1 mb-3 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
      ))}
    </div>
    <p className="text-slate-600 text-sm mb-4 leading-relaxed italic">"{review.text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
        {review.name[0]}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{review.role}</p>
      </div>
    </div>
  </div>
);

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/50">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 mb-16 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-100"
        >
          <Quote className="w-3 h-3 fill-current" /> Community Feedback
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
        >
          Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Thousands</span>
        </motion.h2>
        
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See what our readers and authors have to say about their journey with us.
        </p>
      </div>

      {/* === Marquee Rows === */}
      <div className="relative z-0 space-y-8">
        
        {/* Row 1: Moves Left */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex overflow-hidden">
          <motion.div 
            className="flex"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} />
            ))}
          </motion.div>
        </div>

      </div>

      {/* Bottom Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center relative z-20"
      >
        <p className="text-slate-500 font-medium">
          Rated <span className="text-slate-900 font-bold">4.9/5</span> on TrustPilot & Google Reviews
        </p>
      </motion.div>

    </section>
  );
}