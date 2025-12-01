import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection"; // Import kiya

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      {/* Navbar Component */}
      <Navbar session={session} />

      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <AboutSection />

      {/* FAQ Section (New) */}
      <FAQSection />

    </div>
  );
}