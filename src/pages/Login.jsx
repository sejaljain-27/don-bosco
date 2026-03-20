import React from 'react';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#0B0F19]">
      {/* Ambient artistic background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4F8CFF]/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center mb-16 px-4 animate-[fadeIn_1s_ease-out]">
        <h1 className="premium-header italic text-5xl mb-4">Continuity.</h1>
        <p className="premium-sub uppercase tracking-[0.3em] font-bold opacity-40">Protocol Access</p>
      </div>

      <div className="glass-panel p-10 md:p-14 w-full max-w-md relative z-20 animate-[fadeIn_0.8s_ease-out]">
        <div className="relative z-10">
          <div className="mb-12">
            <h2 className="text-[14px] font-bold text-[#E6EAF2] uppercase tracking-[0.2em] mb-3">Sync Stream</h2>
            <p className="text-[13px] text-[#9CA3AF] font-light">Authorize your biological and institutional keys.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest ml-1 opacity-60">Network ID</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4F8CFF]/60" />
                <input 
                  type="email" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-[#4F8CFF]/40 transition-all"
                  placeholder="identity@continuity.network"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest opacity-60">Access Key</label>
                <a href="#" className="text-[10px] text-[#4F8CFF] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Reset</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4F8CFF]/60" />
                <input 
                  type="password" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-[#4F8CFF]/40 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,140,255,0.2)] flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Initialize Sync
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          <p className="text-center text-[11px] text-[#9CA3AF] mt-10 font-light italic">
            First-time resident? <Link to="/signup" className="text-[#4F8CFF] font-bold not-italic hover:underline ml-1">Establish Link</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
