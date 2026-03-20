import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LifeGraph } from '../components/LifeGraph';
import { ActionTrigger } from '../components/ActionTrigger';
import { AIInsights } from '../components/AIInsights';
import { TrustScore } from '../components/TrustScore';
import { FileText, CheckCircle2, ShieldAlert, X, Shield, Landmark, HeartPulse, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NODE_DETAILS = {
  0: { docs: ['10th Marksheet', '12th Marksheet'], status: 'Verified' },
  1: { docs: ['Internship Letter', 'NOC'], status: 'Verified' },
  2: { docs: ['Offer Letter', 'Salary Slip'], status: 'Active' },
  3: { docs: ['ITR - FY24', 'Bank Statement'], status: 'Eligible' },
  4: { docs: ['Policy Doc', 'Health Cert'], status: 'Pending' },
  5: { docs: ['Insurance Card', 'Health Report'], status: 'Verified' },
  6: { docs: ['Digital Identity Anchor', 'Verified ID'], status: 'Verified' },
  7: { docs: ['Financial Stream Map', 'Bank Data'], status: 'Connected' }
};

export function Timeline() {
  const { 
    activeStage, 
    handleNodeClick, 
    handleJobTrigger, 
    handleHealthTrigger, 
    handleKYCTrigger,
    handleBankTrigger,
    timelineNodes, 
    insights, 
    trustScore 
  } = useOutletContext();
  const { t } = useLanguage();
  const [viewingNode, setViewingNode] = useState(null);

  const onNodeClick = (id) => {
    handleNodeClick(id);
    setViewingNode(id);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-16 py-10 animate-[fadeIn_0.5s_ease-out] relative">
      {/* Top Section: Full Width Header & Graph */}
      <div className="w-full flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl px-6">
          <h1 className="premium-header italic">{t('continuityHeader')}</h1>
          <p className="premium-sub">{t('continuitySub')}</p>
        </div>

        <div className="w-full relative py-8 overflow-hidden">
          <LifeGraph activeIndex={activeStage} onNodeClick={onNodeClick} labels={timelineNodes} />
        </div>
      </div>

      {/* Bottom Section: Actions & Insights in Grid */}
      <div className="w-full grid grid-cols-12 gap-12 px-6">
        {/* Actions Grid */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h4 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">{t('syncProtocols')}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ActionTrigger 
              icon={Sparkles} 
              label={t('gotOffer')} 
              color="blue" 
              glowColor="rgba(79, 140, 255, 0.4)"
              onClick={handleJobTrigger} 
            />
            <ActionTrigger 
              icon={HeartPulse} 
              label={t('needHealth')} 
              color="red" 
              glowColor="rgba(239, 68, 68, 0.4)"
              onClick={handleHealthTrigger} 
          />
          <ActionTrigger 
            icon={Shield} 
            label={t('initKYC')} 
            color="indigo" 
            glowColor="rgba(99, 102, 241, 0.4)"
            onClick={handleKYCTrigger} 
          />
          <ActionTrigger 
            icon={Landmark} 
            label={t('mapBank')} 
            color="emerald" 
            glowColor="rgba(16, 185, 129, 0.4)"
            onClick={handleBankTrigger} 
          />
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-4 h-4 text-purple-400" />
            <h4 className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em]">{t('strategicInsights')}</h4>
          </div>
          <div className="flex flex-col gap-8">
            <TrustScore score={trustScore} />
            <AIInsights insights={insights.length ? insights : ["Trajectory scanning complete.", "All systems operational.", "Identity link is stable."]} />
          </div>
        </div>
      </div>

      {/* Stage Intelligence - The Handcrafted Overlay */}
      {viewingNode !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0B0F19]/60 backdrop-blur-sm animate-[fadeIn_0.4s_ease-out]">
          <div className="w-full max-w-md glass-panel p-10 relative overflow-hidden animate-[zoomIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setViewingNode(null)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-[#4F8CFF]/5 rounded-xl border border-[#4F8CFF]/10 text-[#4F8CFF]">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-semibold text-[#E6EAF2] uppercase tracking-[0.2em]">{t('stageIntelligence')}</h4>
            </div>
            
            <div className="space-y-8">
              <div>
                <p className="text-[10px] text-[#9CA3AF] uppercase font-bold mb-4 tracking-[0.15em] opacity-60">{t('verifiedDocs')}</p>
                <div className="grid grid-cols-1 gap-3">
                  {NODE_DETAILS[viewingNode].docs.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/[0.02] rounded-2xl border border-white/[0.04] transition-colors hover:border-[#4F8CFF]/20">
                      <div className="w-8 h-8 rounded-lg bg-[#4F8CFF]/5 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#4F8CFF]/60" />
                      </div>
                      <span className="text-[13px] text-[#E6EAF2]/80">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-[0.15em] opacity-60">{t('networkStatus')}</span>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#4F8CFF]/5 border border-[#4F8CFF]/10 rounded-full text-[11px] font-medium text-[#4F8CFF]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {NODE_DETAILS[viewingNode].status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
