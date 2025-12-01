import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import FooterWrapper from "@/components/FooterWrapper"; // Footer ki jagah Wrapper import karein

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My E-Book Store",
  description: "Buy and Sell Premium E-Books",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="flex-grow">
            {children}
          </div>
          {/* Ab yahan FooterWrapper use hoga jo condition check karega */}
          <FooterWrapper /> 
        </ThemeProvider>
      </body>
    </html>
  );
}