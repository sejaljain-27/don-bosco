import React from 'react';
import { ArrowRight, Fingerprint, Shield, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <div className="flex-1 flex flex-col w-full z-10 animate-[fadeIn_0.5s_ease-out]">
      {/* Hero Section - The Artistic Entry */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-40 relative overflow-hidden">
        {/* Ambient Artistic Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F8CFF]/5 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[#9CA3AF] text-[10px] font-bold uppercase tracking-[0.3em] mb-12 animate-[fadeIn_1s_ease-out]">
          <Fingerprint className="w-4 h-4 text-[#4F8CFF]" />
          The Continuity Protocol
        </div>
        
        <h1 className="premium-header italic text-6xl md:text-8xl mb-8 max-w-5xl">
          Architecting your <span className="text-white not-italic">Digital Legend.</span>
        </h1>
        
        <p className="premium-sub max-w-2xl mb-16 text-lg md:text-xl">
          Beyond identity. A sovereign, cross-domain intelligence layer that synchronizes your education, finance, and health into a singular verifiable trajectory.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            to="/signup"
            className="px-10 py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white hover:scale-105 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,140,255,0.2)] flex items-center gap-3 active:scale-95"
          >
            Initialize Profile
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to="/login"
            className="px-10 py-5 bg-white/[0.03] backdrop-blur border border-white/[0.08] hover:bg-white/[0.06] transition-all text-[12px] font-bold uppercase tracking-widest text-[#E6EAF2] rounded-2xl active:scale-95"
          >
            Sync Existing
          </Link>
        </div>

        {/* Subtle Decorative Line */}
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#4F8CFF]/40 to-transparent mt-24 opacity-40"></div>
      </section>

      {/* Features Grid - Handcrafted Cards */}
      <section className="w-full max-w-6xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { 
              icon: Shield, 
              title: 'Verification', 
              desc: 'Deep-layer institutional cross-checks with biometric sovereign matching.',
              accent: 'border-[#4F8CFF]/20'
            },
            { 
              icon: Zap, 
              title: 'Intelligence', 
              desc: 'Continuous growth metrics and AI-driven trajectory predictions.',
              accent: 'border-[#8B5CF6]/20'
            },
            { 
              icon: Lock, 
              title: 'Sovereignty', 
              desc: 'Zero-knowledge proofs ensuring absolute domain control and privacy.',
              accent: 'border-white/[0.08]'
            }
          ].map((feature, i) => (
            <div key={i} className={`glass-panel p-10 hover:border-[#4F8CFF]/40 transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-8 group-hover:border-[#4F8CFF]/30 group-hover:bg-[#4F8CFF]/5 transition-all duration-500">
                <feature.icon className="w-6 h-6 text-[#4F8CFF]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-[14px] font-bold text-[#E6EAF2] uppercase tracking-[0.2em] mb-4">{feature.title}</h3>
              <p className="text-[13px] text-[#9CA3AF] leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
