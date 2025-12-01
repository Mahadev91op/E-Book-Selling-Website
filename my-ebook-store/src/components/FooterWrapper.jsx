"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // In pages par Footer nahi dikhega
  const disableFooter = ["/login", "/register"];

  // Agar current path upar wali list mein hai, to null return karo (kuch mat dikhao)
  if (disableFooter.includes(pathname)) {
    return null;
  }

  return <Footer />;
}