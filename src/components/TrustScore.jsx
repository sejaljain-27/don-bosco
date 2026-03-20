import React, { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import gsap from 'gsap';

export function TrustScore({ score = 82 }) {
  const circleRef = useRef(null);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const offset = circumference - (score / 100) * circumference;
    gsap.to(circleRef.current, {
      strokeDashoffset: offset,
      duration: 2,
      ease: "expo.out"
    });
  }, [score, circumference]);

  return (
    <div className="glass-panel p-6 flex items-center justify-between gap-8 h-24">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-[#4F8CFF]/5 rounded-xl border border-[#4F8CFF]/10">
          <CheckCircle className="w-5 h-5 text-[#4F8CFF]" />
        </div>
        <div className="text-left">
          <h3 className="text-[11px] font-semibold text-[#E6EAF2] uppercase tracking-[0.2em] mb-1">Trust Identity</h3>
          <p className="text-[12px] text-[#9CA3AF] font-light">Verified Institutional Data</p>
        </div>
      </div>

      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 overflow-visible">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-white/[0.04]"
            strokeWidth="1.5"
            fill="none"
          />
          <circle
            ref={circleRef}
            cx="32"
            cy="32"
            r={radius}
            className="stroke-[#4F8CFF]"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ filter: 'drop-shadow(0 0 8px rgba(79, 140, 255, 0.4))' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-sm font-semibold text-[#E6EAF2]">{score}</span>
        </div>
      </div>
    </div>
  );
}
