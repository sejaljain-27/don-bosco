import React, { useState } from 'react';
import { GraduationCap, Wallet, Activity, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ConnectedDomains() {
  const [domainStates, setDomainStates] = useState([
    { id: 'education', label: 'Education', icon: GraduationCap, status: 'connected' },
    { id: 'finance', label: 'Finance', icon: Wallet, status: 'connected' },
    { id: 'health', label: 'Healthcare', icon: Activity, status: 'pending' }
  ]);

  const handleConnect = (id, currentStatus) => {
    if (currentStatus === 'connected') {
      toast.info('Domain is already synced and connected.');
      return;
    }
    
    setDomainStates(prev => prev.map(d => d.id === id ? { ...d, status: 'connecting' } : d));
    const toastId = toast.loading('Initializing connection protocol...');
    
    setTimeout(() => {
      setDomainStates(prev => prev.map(d => d.id === id ? { ...d, status: 'connected' } : d));
      toast.success('Connection established. Data stream synced.', { id: toastId });
    }, 2000);
  };

  return (
    <div className="glass-panel p-8 flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] opacity-60">Connected Domains</h3>
        <div className="w-8 h-[1px] bg-white/[0.05]"></div>
      </div>
      
      <div className="flex gap-6 overflow-x-auto pb-2 custom-scrollbar">
        {domainStates.map((domain) => (
          <div 
            key={domain.id} 
            onClick={() => handleConnect(domain.id, domain.status)}
            className="group relative flex flex-col items-center justify-center gap-4 min-w-[110px] p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#4F8CFF]/30 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-[#4F8CFF]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative">
              <domain.icon className={`w-6 h-6 ${domain.status === 'connecting' ? 'text-[#9CA3AF] animate-pulse' : 'text-[#E6EAF2]'} transition-all duration-500 group-hover:scale-110`} strokeWidth={1.5} />
              
              <div className="absolute -top-1 -right-1">
                {domain.status === 'connected' && (
                  <div className="w-2 h-2 bg-[#4F8CFF] rounded-full shadow-[0_0_8px_#4F8CFF]"></div>
                )}
                {domain.status === 'pending' && (
                  <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-pulse"></div>
                )}
                {domain.status === 'connecting' && (
                  <Loader2 className="w-2.5 h-2.5 text-[#4F8CFF] animate-spin" />
                )}
              </div>
            </div>

            <span className="text-[10px] font-medium text-[#9CA3AF] uppercase tracking-widest group-hover:text-[#E6EAF2] transition-colors">
              {domain.status === 'connecting' ? 'Sync' : domain.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
