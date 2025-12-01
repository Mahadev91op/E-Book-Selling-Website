"use client";

import { motion } from "framer-motion";
import { Globe, Zap, ShieldCheck, Users, BookOpen } from "lucide-react";

const features = [
  {
    icon: <Globe className="w-6 h-6 text-blue-600" />,
    title: "Global Accessibility",
    description: "Read from anywhere in the world. Our platform breaks geographical barriers."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Instant Delivery",
    description: "Get your books immediately after purchase. No waiting, just reading."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "Secure Payments",
    description: "We use top-tier encryption to ensure your transactions are always safe."
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Community Driven",
    description: "Join a vibrant community of readers and authors sharing their passion."
  }
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Why Choose <span className="text-blue-600">E-BookStore?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            We are dedicated to providing the best digital reading experience. 
            Discover why thousands of readers trust us for their literary journey.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner / Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <BookOpen className="w-12 h-12 mx-auto text-blue-200" />
            <h3 className="text-2xl md:text-3xl font-bold">Our Mission</h3>
            <p className="text-blue-100 text-lg">
              To make knowledge accessible, affordable, and enjoyable for everyone. 
              We believe a good book has the power to change a life.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}