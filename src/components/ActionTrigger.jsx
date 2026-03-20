import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Landmark, HeartPulse, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export function ActionTrigger({ icon: Icon, label, color, onClick, glowColor }) {
  const buttonRef = useRef(null);

  const colorMap = {
    blue: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-500',
      from: 'from-blue-600/20'
    },
    red: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      from: 'from-red-600/20'
    },
    indigo: {
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-500',
      from: 'from-indigo-600/20'
    },
    emerald: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-500',
      from: 'from-emerald-600/20'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  useEffect(() => {
    gsap.to(buttonRef.current, {
      boxShadow: `0 0 20px ${glowColor || 'rgba(79, 140, 255, 0.4)'}`,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, [glowColor]);

  return (
    <div className="relative group">
      <div className={`absolute -inset-1 bg-gradient-to-r ${scheme.from} to-blue-600/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
      <button 
        ref={buttonRef}
        onClick={onClick}
        className="relative flex items-center justify-between w-64 px-6 py-4 bg-[#111827] ring-1 ring-white/10 rounded-xl hover:bg-[#1f2937] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 ${scheme.bg} rounded-lg`}>
            <Icon className={`w-5 h-5 ${scheme.text}`} />
          </div>
          <span className="font-medium text-slate-200">{label}</span>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
      </button>
    </div>
  );
}
