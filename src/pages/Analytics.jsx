import { useOutletContext } from 'react-router-dom';
import { TrustScoreGraph } from '../components/TrustScoreGraph';
import { TrustScore } from '../components/TrustScore';
import { AIInsights } from '../components/AIInsights';
import { useLanguage } from '../contexts/LanguageContext';

export function Analytics() {
  const { trustScore, insights } = useOutletContext();
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 py-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-left px-4">
        <h1 className="premium-header italic">{t('intelligenceHeader')}</h1>
        <p className="premium-sub max-w-xl">{t('intelligenceSub')}</p>
      </div>

      <div className="grid grid-cols-12 gap-8 px-4">
        {/* Main Graph Area */}
         <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <div className="glass-panel p-8 min-h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-[11px] font-semibold text-[#E6EAF2] uppercase tracking-[0.2em] mb-1">{t('verificationHistory')}</h4>
                <p className="text-[12px] text-[#9CA3AF] font-light tracking-wide italic">{t('growth6Month')}</p>
              </div>
              <div className="px-3 py-1 bg-[#4F8CFF]/5 border border-[#4F8CFF]/10 rounded-full text-[10px] text-[#4F8CFF] font-bold uppercase tracking-wider">
                Stable +12.4%
              </div>
            </div>
            <div className="flex-1 w-full">
              <TrustScoreGraph />
            </div>
          </div>
        </div>
        
        {/* Sidebar Insights */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <TrustScore score={trustScore} />
          <div className="flex-1 min-h-[450px]">
            <AIInsights insights={insights.length ? insights : ["Historical analysis complete.", "Trajectory is positive and consistently growing.", "No major flags detected in privacy streams."]} />
          </div>
        </div>
      </div>
    </div>
  );
}
