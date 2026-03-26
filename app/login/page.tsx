"use client";

import { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      login({ id: "1", username: "DemoUser", email, role: "customer", avatar_url: "" });
      router.push("/");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 rotate-3">
                <span className="text-2xl font-bold text-slate-100">M</span>
              </div>
              <span className="text-3xl font-display font-bold tracking-tighter text-slate-100">MangaCloud</span>
            </div>
          </Link>
          <h1 className="text-4xl font-display font-bold tracking-tighter text-slate-100 mb-2">Welcome Back</h1>
          <p className="text-slate-400 font-medium">Enter your details to access your library</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 text-sm font-bold text-center animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-14 pr-6 text-slate-100 placeholder:text-slate-100/10 focus:border-sky-500/50 focus:bg-slate-700/50 outline-none transition-all font-medium"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Password</label>
                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-sky-500 hover:text-sky-400 transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-14 pr-6 text-slate-100 placeholder:text-slate-100/10 focus:border-sky-500/50 focus:bg-slate-700/50 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-100 text-black py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center justify-center gap-3">
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
              <span className="bg-slate-900 px-4 text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all font-bold text-xs text-slate-300">
              <Github className="w-4 h-4" />
              Github
            </button>
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all font-bold text-xs text-slate-300">
              <Chrome className="w-4 h-4" />
              Google
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-400 font-medium">
          Don't have an account?{" "}
          <Link href="/signup" className="text-sky-500 font-bold uppercase tracking-widest hover:text-sky-400 transition-colors ml-2">
            Sign Up Free
          </Link>
        </p>
      </div>
    </div>
  );
}
