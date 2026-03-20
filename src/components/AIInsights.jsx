import React, { useEffect, useRef, useState } from 'react';
import { BrainCircuit, Info, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

function TypewriterText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-[13px] text-[#E6EAF2]/90 leading-relaxed font-normal">{displayedText}</p>;
}

export function AIInsights({ insights = [] }) {
  const containerRef = useRef(null);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const { t } = useLanguage();

  const handleDetails = (msg) => {
    setSelectedInsight(msg);
  };
  
  return (
    <div className="glass-panel p-6 w-full max-w-sm h-full flex flex-col relative overflow-hidden" ref={containerRef}>
      {/* Subtle Accent Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4F8CFF]/10 rounded-full blur-[40px]"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#4F8CFF]/10 rounded-lg border border-[#4F8CFF]/20">
            <BrainCircuit className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <h3 className="font-semibold text-[#E6EAF2] text-[11px] uppercase tracking-[0.2em]">{t('aiInsights')}</h3>
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="text-[10px] text-[#9CA3AF] font-medium mr-1">Live Analysis</span>
          <div className="flex gap-1">
            <span className="w-1 h-1 rounded-full bg-[#4F8CFF] animate-pulse"></span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6] animate-pulse delay-150"></span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
        {insights.map((msg, i) => (
          <div 
            key={i} 
            onClick={() => handleDetails(msg)}
            className="group relative p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#4F8CFF]/30 transition-all duration-500 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
            <div className="relative z-10">
              <TypewriterText text={msg} />
              <div className="mt-3 flex items-center gap-1.5 text-[9px] text-[#4F8CFF] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                View Analysis <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 py-10 opacity-60">
            <div className="relative">
              <div className="w-12 h-12 bg-white/[0.02] rounded-full flex items-center justify-center animate-pulse">
                <BrainCircuit className="w-6 h-6 text-[#9CA3AF]" />
              </div>
              <div className="absolute inset-0 bg-[#4F8CFF]/10 rounded-full blur-xl scale-75 animate-pulse"></div>
            </div>
            <p className="text-[11px] text-[#9CA3AF] font-light tracking-wide italic">
              {t('voiceActive')}
            </p>
          </div>
        )}
      </div>

      {/* Details Overlay */}
      {selectedInsight && (
        <div className="absolute inset-0 z-50 bg-[#0B0F19]/95 border border-white/10 backdrop-blur-xl p-8 flex flex-col animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
          <button 
            onClick={() => setSelectedInsight(null)}
            className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-8 text-[#4F8CFF]">
            <div className="p-1.5 bg-[#4F8CFF]/10 rounded-lg border border-[#4F8CFF]/20">
              <Info className="w-4 h-4" />
            </div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.15em] text-[#E6EAF2]">Core Analysis</h4>
          </div>

          <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1 text-left">
            <div className="p-5 bg-white/[0.02] rounded-2xl border border-white/[0.04]">
              <p className="text-[9px] text-[#9CA3AF] font-bold uppercase tracking-widest mb-2 opacity-60">Insight Trigger</p>
              <p className="text-[13px] text-[#E6EAF2]/90 italic leading-relaxed">"{selectedInsight}"</p>
            </div>

            <div className="px-1">
              <p className="text-[10px] text-[#E6EAF2] font-semibold uppercase tracking-widest mb-4">Verification Context</p>
              <ul className="text-[12px] text-[#9CA3AF] space-y-3 font-light">
                <li className="flex gap-2">
                  <span className="w-1 h-1 bg-[#4F8CFF] rounded-full mt-1.5 shrink-0"></span>
                  Institutional API verified employment history (99.8% match).
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 bg-[#4F8CFF] rounded-full mt-1.5 shrink-0"></span>
                  Trajectory cross-referenced with regional economic data.
                </li>
                <li className="flex gap-2">
                  <span className="w-1 h-1 bg-[#4F8CFF] rounded-full mt-1.5 shrink-0"></span>
                  Biometric identity hash validated against the Digital Sovereignty layer.
                </li>
              </ul>
            </div>
          </div>

          <button 
            onClick={() => setSelectedInsight(null)}
            className="mt-10 w-full py-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-[#E6EAF2] rounded-2xl text-[11px] font-semibold tracking-widest uppercase transition-all duration-300"
          >
            Close Insight
          </button>
        </div>
      )}
    </div>
  );
}
