import React, { useEffect, useRef } from 'react';
import { BookOpen, Briefcase, Building, Key, Shield, UserCheck, Landmark, HeartPulse } from 'lucide-react';
import gsap from 'gsap';

const defaultNodes = [
  { id: 0, label: 'Student', icon: BookOpen },
  { id: 1, label: 'Intern', icon: Briefcase },
  { id: 2, label: 'Employee', icon: Building },
  { id: 3, label: 'Loan Eligible', icon: Key },
  { id: 4, label: 'Insurance', icon: Shield }
];

export function LifeGraph({ activeIndex, onNodeClick, labels }) {
  const lineRef = useRef(null);
  
  const getIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('student') || l.includes('education')) return BookOpen;
    if (l.includes('intern')) return Briefcase;
    if (l.includes('employee') || l.includes('work') || l.includes('active node')) return Building;
    if (l.includes('kyc')) return UserCheck;
    if (l.includes('bank')) return Landmark;
    if (l.includes('health')) return HeartPulse;
    if (l.includes('loan')) return Key;
    return Shield;
  };

  const nodesData = labels ? labels.map((label, i) => ({
    id: i,
    label,
    icon: getIcon(label)
  })) : defaultNodes;
  
  useEffect(() => {
    const progressPercent = (activeIndex / (nodesData.length - 1)) * 100;
    gsap.to(lineRef.current, {
      width: `${progressPercent}%`,
      duration: 1.5,
      ease: "expo.out"
    });
  }, [activeIndex]);

  return (
    <div className="relative w-full py-24 px-4 flex items-center justify-center overflow-visible">
      
      {/* Central Axis Line */}
      <div className="absolute w-[95%] h-[1px] bg-white/[0.05] top-1/2 -translate-y-1/2">
        {/* Active Progress Trace */}
        <div 
          ref={lineRef} 
          className="h-full bg-gradient-to-r from-[#4F8CFF] to-[#8B5CF6] w-0 relative"
        >
          {/* Active Tip Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8B5CF6] rounded-full blur-md opacity-30"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
        </div>
      </div>

      <div className="relative w-[95%] flex justify-between items-center">
        {nodesData.map((node, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          
          return (
            <div 
              key={node.id} 
              className="flex flex-col items-center group cursor-pointer relative"
              onClick={() => onNodeClick(node.id)}
            >
              {/* Interaction Indicator */}
              <div 
                className={`
                  absolute -top-12 px-3 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all duration-500
                  ${isActive ? 'opacity-100 translate-y-0 text-[#4F8CFF] bg-[#4F8CFF]/5 border border-[#4F8CFF]/10' : 'opacity-0 translate-y-2'}
                `}
              >
                Current Focus
              </div>

              {/* Node Container */}
              <div 
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-700
                  ${isActive 
                    ? 'bg-white/[0.05] border border-white/[0.1] shadow-[0_0_30px_rgba(79,140,255,0.1)] scale-110' 
                    : isPast 
                      ? 'bg-transparent border border-[#4F8CFF]/20 opacity-80'
                      : 'bg-transparent border border-white/[0.05] opacity-40'
                  }
                  hover:border-white/20 hover:bg-white/[0.03]
                `}
              >
                <node.icon 
                  className={`w-6 h-6 transition-all duration-500 ${isActive ? 'text-[#E6EAF2]' : isPast ? 'text-[#4F8CFF]' : 'text-[#9CA3AF]'}`} 
                  strokeWidth={1.5} 
                />
              </div>

              {/* Label */}
              <div className="absolute top-18 flex flex-col items-center whitespace-nowrap">
                <span 
                  className={`text-[10px] font-medium tracking-tight leading-tight transition-all duration-500
                    ${isActive ? 'text-[#E6EAF2] scale-105' : 'text-[#9CA3AF]'}
                    whitespace-normal text-center w-24 block
                  `}
                >
                  {node.label}
                </span>
                {isActive && (
                  <div className="w-1 h-1 bg-[#4F8CFF] rounded-full mt-2 animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
