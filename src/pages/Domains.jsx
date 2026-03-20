import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Shield, HeartPulse, Key, ArrowRight, CheckCircle2, FileText, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Domains() {
  const { userProfile, timelineNodes, trustScore } = useOutletContext();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(null); // 'kyc', 'insurance', 'loan'
  const [isSuccess, setIsSuccess] = useState(false);

  const processes = [
    {
      id: 'kyc',
      title: t('kycTitle'),
      desc: t('kycDesc'),
      icon: Shield,
      color: 'blue',
      steps: [t('identitySync'), t('biometricMatch'), t('hashAnchoring')],
    },
    {
      id: 'insurance',
      title: t('insuranceTitle'),
      desc: t('insuranceDesc'),
      icon: HeartPulse,
      color: 'red',
      steps: [t('healthSync'), t('planSelection'), t('quantumUnderwriting')],
    },
    {
      id: 'loan',
      title: t('loanTitle'),
      desc: t('loanDesc'),
      icon: Key,
      color: 'emerald',
      steps: [t('degreeMatch'), t('eligibilityCheck'), t('creditStreamLink')],
    }
  ];

  const handleAutoFill = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-12 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col gap-2">
        <h2 className="premium-header italic">{t('processDomains')}</h2>
        <p className="premium-sub">{t('continuitySub')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {processes.map((proc) => (
          <div key={proc.id} className="glass-panel p-8 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${proc.color}-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            
            <div className={`w-12 h-12 bg-${proc.color}-500/10 rounded-xl flex items-center justify-center mb-6`}>
              <proc.icon className={`w-6 h-6 text-${proc.color}-500`} />
            </div>
            
            <h3 className="text-xl font-bold text-[#E6EAF2] mb-3">{proc.title}</h3>
            <p className="text-sm text-[#9CA3AF] font-light leading-relaxed mb-8">{proc.desc}</p>
            
            <div className="space-y-4 mb-10">
              {proc.steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40"></div>
                  <span className="text-[11px] text-[#9CA3AF] uppercase tracking-wider">{step}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowForm(proc.id)}
              className="w-full py-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all group/btn"
            >
              {t('initializeProcess')}
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Auto-Fill Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0B0F19]/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowForm(null)}></div>
          <div className="glass-panel w-full max-w-xl p-10 relative overflow-hidden animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setShowForm(null)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-10 animate-[fadeIn_0.5s_ease-out]">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 italic">{t('processSynchronized')}</h3>
                <p className="text-[#9CA3AF] text-center max-w-xs">{t('continuitySub')}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-2 bg-blue-500/5 rounded-xl border border-blue-500/10 text-blue-500">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E6EAF2] italic uppercase tracking-wider">{t('continuityAutoFill')}</h3>
                    <p className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-[0.2em] mt-1">{t('mappingProfile')}</p>
                  </div>
                </div>

                <form onSubmit={handleAutoFill} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">{t('fullName')}</label>
                      <input readOnly value={userProfile.name} className="w-full bg-white/[0.04] border border-blue-500/30 rounded-xl py-4 px-6 text-[#E6EAF2]/80 text-sm italic" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">{lang === 'hi' ? 'पहचान एंकर' : 'Identity Anchor'}</label>
                      <input readOnly value={lang === 'hi' ? 'सत्यापित आधार' : 'Verified Aadhaar'} className="w-full bg-white/[0.04] border border-blue-500/30 rounded-xl py-4 px-6 text-green-500/80 text-sm italic" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">{t('residencyMap')}</label>
                    <input readOnly value={userProfile.address} className="w-full bg-white/[0.04] border border-blue-500/30 rounded-xl py-4 px-6 text-[#E6EAF2]/80 text-sm italic" />
                  </div>

                  <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
                    <FileText className="w-5 h-5 text-blue-400/60" />
                    <div>
                      <p className="text-[11px] text-[#E6EAF2] font-semibold">{t('institutionalContinuity')}</p>
                      <p className="text-[10px] text-[#9CA3AF]">{timelineNodes.length} nodes successfully cross-referenced.</p>
                    </div>
                    <div className="ml-auto text-green-500 text-[10px] font-bold uppercase tracking-widest">{lang === 'hi' ? 'जुड़ा हुआ' : 'Linked'}</div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,140,255,0.2)]"
                  >
                    {t('syncSubmitProcess')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
