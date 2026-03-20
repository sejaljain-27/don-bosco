import React, { useState } from 'react';
import { Lock, ShieldCheck, Power } from 'lucide-react';
import { toast } from 'sonner';

export function PrivacyControls() {
  const [toggles, setToggles] = useState({
    bank: true,
    health: false,
    education: true
  });

  const toggleHandler = (key, label) => {
    const newState = !toggles[key];
    setToggles(prev => ({ ...prev, [key]: newState }));
    
    if (newState) {
      toast.success(`${label} access granted. Stream synchronized.`);
    } else {
      toast.error(`${label} access revoked. Data stream isolated.`);
    }
  };

  return (
    <div className="glass-panel p-10 w-full animate-[fadeIn_0.8s_ease-out]">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center border border-[#4F8CFF]/20">
            <Lock className="w-4 h-4 text-[#4F8CFF]" />
          </div>
          <h3 className="text-[12px] font-bold text-[#E6EAF2] uppercase tracking-[0.2em]">Sovereignty</h3>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-widest bg-[#4F8CFF]/10 text-[#4F8CFF] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#4F8CFF]/20">
          <ShieldCheck className="w-3 h-3" />
          Secured
        </span>
      </div>

      <div className="space-y-8">
        {[
          { id: 'bank', label: 'Financial Matrix', expiry: 'Auto-syncing active' },
          { id: 'health', label: 'Biological Metrics', expiry: 'Requires re-auth' },
          { id: 'education', label: 'Knowledge Assets', expiry: 'Verified stream' }
        ].map(item => (
          <div key={item.id} className="flex items-center justify-between group">
            <div className="flex flex-col gap-1">
              <p className="text-[13px] font-bold text-[#E6EAF2] group-hover:text-white transition-colors">{item.label}</p>
              <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-bold opacity-40">{item.expiry}</p>
            </div>
            
            <button 
              onClick={() => toggleHandler(item.id, item.label)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-500 outline-none ${
                toggles[item.id] 
                  ? 'bg-[#4F8CFF] shadow-[0_0_15px_rgba(79,140,255,0.3)]' 
                  : 'bg-white/[0.05] border border-white/[0.1]'
              }`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-all duration-500 ${
                toggles[item.id] ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/[0.05]">
        <p className="text-[10px] text-[#9CA3AF] leading-relaxed italic opacity-60">
          All data isolates are governed by zero-knowledge protocols. Revocation is instantaneous across all network nodes.
        </p>
      </div>
    </div>
  );
}
