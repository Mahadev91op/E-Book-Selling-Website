import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar"; // Navbar dikhana acha rahega

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-white -z-20"></div>
      
      {/* Moving Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}