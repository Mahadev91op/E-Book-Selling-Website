"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Send, Heart } from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", color: "hover:text-blue-500" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:text-sky-400" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:text-pink-500" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:text-blue-700" },
  ];

  const footerLinks = {
    "Quick Links": [
      { name: "Home", href: "/" },
      { name: "About Us", href: "#about" },
      { name: "FAQ", href: "#faq" },
      { name: "Bestsellers", href: "/bestsellers" },
    ],
    "Support": [
      { name: "Help Center", href: "/help" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Contact Us", href: "/contact" },
    ]
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 relative overflow-hidden">
      
      {/* Top Gradient Border Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
      
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-900/20"
              >
                <BookOpen className="w-6 h-6" />
              </motion.div>
              <span className="text-2xl font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">
                E-BookStore
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Unlock a world of stories. Read anytime, anywhere. Join our community of readers today.
            </p>
            
            {/* Animated Social Icons */}
            <div className="flex gap-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-slate-800 p-2.5 rounded-full text-slate-300 transition-colors ${social.color} hover:bg-slate-700/50 hover:shadow-lg`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2 & 3. Links Sections (Dynamic Hover Effect) */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                {category}
                {/* Underline for Title */}
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center text-slate-400 hover:text-white transition-colors">
                      {/* Sliding Line Animation */}
                      <span className="w-0 h-0.5 bg-blue-500 mr-0 transition-all duration-300 group-hover:w-4 group-hover:mr-2 rounded-full"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 4. Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Stay Updated
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <p className="text-slate-400 mb-6">
              Subscribe to our newsletter for the latest book releases and exclusive deals.
            </p>
            <form className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-14 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-500 shadow-inner"
              />
              <motion.button 
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg shadow-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p className="flex items-center gap-1 group cursor-default">
            © 2024 E-BookStore. Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Mahadev.
          </p>
          <div className="flex gap-8">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link key={item} href="#" className="hover:text-blue-400 hover:underline transition-all decoration-blue-500/50 underline-offset-4">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}