"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Search, MessageCircle, ChevronDown } from "lucide-react";

const faqsData = [
  {
    question: "How do I download my e-books?",
    answer: "Once your purchase is complete, you can instantly download your e-books from your 'My Orders' section. You will also receive a download link via email."
  },
  {
    question: "Can I read on multiple devices?",
    answer: "Absolutely! Your e-books are tied to your account, not a specific device. You can access them on your phone, tablet, e-reader, or computer anytime."
  },
  {
    question: "What formats are available?",
    answer: "Most of our books are available in PDF, EPUB, and MOBI formats, ensuring compatibility with Kindle, Apple Books, and other popular readers."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we have a 7-day happiness guarantee. If you have technical issues with a file that we can't resolve, we will issue a full refund."
  },
  {
    question: "How can I publish my book here?",
    answer: "We love new authors! If you have a book to sell, please contact our support team or apply through the 'Add Book' portal (for authorized authors) to get started."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard encryption (SSL) to protect your payment details. We do not store your credit card information on our servers."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search
  const filteredFaqs = faqsData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" id="faq">
      
      {/* Background Blobs for Modern Feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* === Header Section === */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide mb-6 border border-blue-100 shadow-sm"
          >
            <HelpCircle className="w-4 h-4" /> <span>Help Center</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 mb-8"
          >
            Find answers to common questions about purchasing, downloading, and reading your favorite books.
          </motion.p>

          {/* Search Input */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg shadow-gray-200/20 transition-all"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        {/* === FAQ Grid === */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openIndex === index 
                      ? "bg-white border-blue-200 shadow-xl shadow-blue-900/5 ring-1 ring-blue-100 scale-[1.01]" 
                      : "bg-white/60 border-slate-200 hover:border-blue-200 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className={`text-lg font-medium transition-colors ${openIndex === index ? "text-blue-700" : "text-slate-800 group-hover:text-blue-600"}`}>
                      {faq.question}
                    </span>
                    <span className={`ml-4 flex-shrink-0 rounded-full p-2 transition-all duration-300 ${
                      openIndex === index 
                        ? "bg-blue-600 text-white rotate-180" 
                        : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600"
                    }`}>
                      <ChevronDown className="w-5 h-5" />
                    </span>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed">
                          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-100 to-transparent mb-4"></div>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              // Empty Search State
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No questions found</h3>
                <p className="text-slate-500">Try adjusting your search terms.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === Bottom CTA === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center bg-blue-600 rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-4xl mx-auto shadow-2xl shadow-blue-900/20"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
              <p className="text-blue-100">Can't find the answer you're looking for? Please chat to our friendly team.</p>
            </div>
            <button className="flex-shrink-0 inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-blue-600 font-bold shadow-lg hover:bg-blue-50 transition-all duration-300 gap-2">
              <MessageCircle className="w-5 h-5" />
              Get in Touch
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}