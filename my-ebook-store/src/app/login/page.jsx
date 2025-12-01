import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#2D1B14] relative overflow-hidden">
      {/* Wooden Floor Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-40"></div>
      
      {/* Ambient Light / Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 pointer-events-none"></div>
      
      <LoginForm />
    </div>
  );
}