import { ConnectedDomains } from '../components/ConnectedDomains';
import { PrivacyControls } from '../components/PrivacyControls';
import { useLanguage } from '../contexts/LanguageContext';

export function Settings() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 py-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-left px-4">
        <h1 className="premium-header italic">{t('configHeader')}</h1>
        <p className="premium-sub max-w-xl">{t('configSub')}</p>
      </div>

      <div className="grid grid-cols-12 gap-8 px-4">
        {/* Left Column: Domains & Protocol */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <ConnectedDomains />
          
          <div className="glass-panel p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4F8CFF]/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] opacity-60">{t('syncProtocol')}</h4>
              <div className="w-8 h-[1px] bg-white/[0.05]"></div>
            </div>
            
            <p className="text-[13px] text-[#9CA3AF] font-light leading-relaxed mb-8 max-w-lg">
              {t('protocolSyncDesc')}
            </p>
            
            <button className="px-6 py-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-[#4F8CFF]/30 text-[#E6EAF2] text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95">
              {t('forceProtocolSync')}
            </button>
          </div>
        </div>
        
        {/* Right Column: Privacy */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <PrivacyControls />
        </div>
      </div>
    </div>
  );
}
