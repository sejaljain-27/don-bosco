import React, { useEffect, useRef } from 'react';
import { HeartPulse, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export function HealthTrigger({ onTriggerHealth }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    // Subtle pulse animation with health-themed color
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <button 
        ref={buttonRef}
        onClick={onTriggerHealth}
        className="relative flex items-center justify-between w-64 px-6 py-4 bg-[#111827] ring-1 ring-white/10 rounded-xl hover:bg-[#1f2937] transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <HeartPulse className="w-5 h-5 text-red-500" />
          </div>
          <span className="font-medium text-slate-200">I need Health Insurance</span>
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
      </button>
    </div>
  );
}
