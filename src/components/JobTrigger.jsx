import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export function JobTrigger({ onTriggerJob }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Pulse animation
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <button 
        ref={buttonRef}
        onClick={onTriggerJob}
        className="relative flex items-center justify-between w-64 px-6 py-4 bg-[#111827] ring-1 ring-white/10 rounded-xl hover:bg-[#1f2937] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <span className="font-medium text-slate-200">I got a new offer</span>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
      </button>
    </div>
  );
}
