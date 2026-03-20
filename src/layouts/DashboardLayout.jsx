import React, { useState, useEffect } from 'react';
import { Fingerprint, BarChart2, Settings, Route as RouteIcon, LogOut, X, Shield, Landmark, Globe } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';
import { VoiceAssistant } from '../components/VoiceAssistant';

const STAGE_INSIGHTS = {
  0: ["Scanning academic records...", "Student profile active.", "Recommendation: Open checking account."],
  1: ["Internship verified.", "Checking basic tax bracket...", "Eligible for entry-level credit card."],
  2: ["Employment verified.", "Income stream detected.", "Based on your income, recommended insurance: Premium Health."],
  3: ["Credit history strong.", "You are eligible for a pre-approved loan of $50,000.", "Recommendation: Diversify investments."],
  4: ["Comprehensive coverage active.", "Wealth management unlocked.", "Next step: tax optimization for multiple streams."],
  5: ["Health profile verified.", "Premium Protection active.", "Recommendation: Yearly health check-up."],
  6: ["KYC sync complete.", "Digital ID anchored.", "Recommendation: Tax optimization protocol."],
  7: ["Financial history linked.", "Bank stream active.", "Recommendation: Diversified index mapping."]
};

export function DashboardLayout({ userProfile, onUpdateProfile }) {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const [activeStage, setActiveStage] = useState(2);
  const [trustScore, setTrustScore] = useState(82);
  const [insights, setInsights] = useState([]);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [offerDetails, setOfferDetails] = useState({ company: '', salary: '' });
  const [healthDetails, setHealthDetails] = useState({ age: '', coverage: 'Basic' });
  
  const [timelineNodes, setTimelineNodes] = useState([
    'Education', 'Internship', 'Employment', 'Growth', 'Legacy'
  ]);

  useEffect(() => {
    if (userProfile?.pastRole) {
      setTimelineNodes([
        userProfile.pastRole,
        userProfile.currentRole,
        'Active Node',
        'Loan Eligible',
        userProfile.futureRole
      ]);
    }
  }, [userProfile]);

  useEffect(() => {
    // Stage 5 is the Health Sync stage which uses personalized insights
    if (activeStage === 5) return;
    
    setInsights(STAGE_INSIGHTS[activeStage]?.slice(0, 1) || ["Analyzing your trajectory..."]);
    const timer = setTimeout(() => {
      setInsights(STAGE_INSIGHTS[activeStage] || ["Analysis complete."]);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeStage]);

  const handleNodeClick = (id) => {
    setActiveStage(id);
    setInsights([]);
  };

  const handleJobTrigger = () => {
    setShowOfferModal(true);
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    setShowOfferModal(false);
    
    const salary = parseInt(offerDetails.salary) || 0;
    const loanAmount = salary * 0.5;
    
    setInsights([
      `New offer from ${offerDetails.company} detected.`,
      `Verified: Income stream increase of ${((salary / 50000) * 100).toFixed(0)}% from base.`,
      `You are eligible for a pre-approved Loan of $${loanAmount.toLocaleString()}.`,
      "Recommendation: Establish debt-to-income protocol."
    ]);
    
    if (activeStage < 4) {
      setActiveStage(activeStage + 1);
      setTrustScore(prev => Math.min(prev + 10, 100));
    }
  };

  const handleHealthTrigger = () => {
    setShowHealthModal(true);
  };

  const handleHealthSubmit = (e) => {
    e.preventDefault();
    setShowHealthModal(false);
    
    setTimelineNodes(prev => [...prev.slice(0, 3), 'Health Sync', ...prev.slice(3)]);
    
    const planName = healthDetails.coverage === 'Elite' 
      ? 'Max-Continuity Life Shield' 
      : healthDetails.coverage === 'Premium' 
        ? 'Bio-Guardian Premium' 
        : 'Essential Life Link';
        
    setInsights([
      "Health profile successfully anchored.",
      `Suggested Plan: ${planName}`,
      `Verified: Coverage level tailored for age ${healthDetails.age}.`,
      "Benefit: 15% continuity discount applied to premium."
    ]);
    
    setActiveStage(5);
    setTrustScore(prev => Math.min(prev + 12, 100));
  };

  const handleKYCTrigger = () => setShowKYCModal(true);
  const handleBankTrigger = () => setShowBankModal(true);

  const handleKYCSubmit = (e) => {
    e.preventDefault();
    setShowKYCModal(false);
    setTimelineNodes(prev => [...prev.slice(0, 1), 'KYC Anchored', ...prev.slice(1)]);
    setInsights([
      "Identity architecture verified.",
      "Universal ID (Aadhaar/PAN) cross-referenced.",
      "Benefit: Accelerated institutional verification active.",
      "Recommendation: Establish tax-saving instrument node."
    ]);
    setActiveStage(6);
    setTrustScore(prev => Math.min(prev + 15, 100));
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    setShowBankModal(false);
    setTimelineNodes(prev => [...prev.slice(0, 2), 'Bank Stream', ...prev.slice(2)]);
    setInsights([
      "Financial streams synchronizing.",
      "Deep link established with multi-bank domains.",
      "AI Insight: Pre-approved low-interest credit line detected.",
      "Recommendation: Map automated wealth distribution."
    ]);
    setActiveStage(7);
    setTrustScore(prev => Math.min(prev + 18, 100));
  };

  const handleVoiceAction = (action) => {
    if (action === 'offer') handleJobTrigger();
    if (action === 'health') handleHealthTrigger();
    if (action === 'kyc') handleKYCTrigger();
    if (action === 'bank') handleBankTrigger();
  };

  const navLinks = [
    { name: t('timeline'), path: '/dashboard/timeline' },
    { name: t('analytics'), path: '/dashboard/analytics' },
    { name: t('domains'), path: '/dashboard/domains' },
    { name: t('settings'), path: '/dashboard/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E6EAF2] font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Toaster theme="dark" position="bottom-right" />
      
      {/* Subtle Background System */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Center-Focused Header / Nav */}
      <nav className="fixed top-0 left-0 right-0 h-20 border-b border-white/[0.04] bg-[#0B0F19]/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto h-full px-8 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="p-1.5 bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] rounded-lg">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold tracking-tight">Continuity.</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => 
                    `text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-[#E6EAF2] opacity-100' 
                        : 'text-[#9CA3AF] opacity-60 hover:opacity-100'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all group"
            >
              <Globe className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#4F8CFF] transition-colors" />
              <span className="text-[10px] font-bold text-[#E6EAF2] uppercase tracking-widest">{lang === 'en' ? 'HI' : 'EN'}</span>
            </button>

            <div className="flex items-center gap-3 pl-6 border-l border-white/[0.08]">
              <div className="text-right hidden sm:block">
                <p className="text-[11px] font-medium text-[#E6EAF2] leading-none mb-1">{userProfile?.name || 'User'}</p>
                <p className="text-[9px] text-[#9CA3AF] uppercase tracking-widest">{userProfile?.address?.substring(0, 15) || t('identityActive')}...</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/[0.1] flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userProfile?.name || 'User'}&backgroundColor=e2e8f0`} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Center Content */}
      <main className="pt-32 pb-20 max-w-6xl mx-auto px-8 relative z-10">
        <Outlet context={{ 
          activeStage, 
          handleNodeClick, 
          handleJobTrigger, 
          trustScore, 
          insights, 
          timelineNodes,
          onUpdateProfile,
          handleHealthTrigger,
          handleKYCTrigger,
          handleBankTrigger,
          userProfile
        }} />
        
        <VoiceAssistant onAction={handleVoiceAction} />
      </main>
      {/* New Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B0F19]/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowOfferModal(false)}></div>
          <div className="glass-panel w-full max-w-md p-10 relative overflow-hidden animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setShowOfferModal(false)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-[#E6EAF2] mb-2 italic">{t('gotOffer')}</h3>
            <p className="text-[#9CA3AF] text-sm mb-10 font-light italic">Establish your next institutional link.</p>
            
            <form onSubmit={handleOfferSubmit} className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">Company / Institution</label>
                <input 
                  required
                  type="text"
                  value={offerDetails.company}
                  onChange={(e) => setOfferDetails(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-[#4F8CFF]/40 transition-all font-light"
                  placeholder="e.g. Acme Corp"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">Annual Compensation ($)</label>
                <input 
                  required
                  type="number"
                  value={offerDetails.salary}
                  onChange={(e) => setOfferDetails(prev => ({ ...prev, salary: e.target.value }))}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-[#4F8CFF]/40 transition-all font-light"
                  placeholder="e.g. 120000"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full mt-6 py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,140,255,0.2)]"
              >
                {t('syncNewTrajectory')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Health Insurance Modal */}
      {showHealthModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B0F19]/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowHealthModal(false)}></div>
          <div className="glass-panel w-full max-w-md p-10 relative overflow-hidden animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setShowHealthModal(false)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-[#E6EAF2] mb-2 italic">{t('syncHealth')}</h3>
            <p className="text-[#9CA3AF] text-sm mb-10 font-light italic">Anchor your health domain within the Continuity vault.</p>
            
            <form onSubmit={handleHealthSubmit} className="space-y-8">
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">{t('verifiedAge')}</label>
                <input 
                  required
                  type="number"
                  value={healthDetails.age}
                  onChange={(e) => setHealthDetails(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-red-500/40 transition-all font-light"
                  placeholder="e.g. 24"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-3 block opacity-60">{t('coverageBreadth')}</label>
                <select 
                  value={healthDetails.coverage}
                  onChange={(e) => setHealthDetails(prev => ({ ...prev, coverage: e.target.value }))}
                  className="w-full bg-[#111827] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] focus:outline-none focus:border-red-500/40 transition-all font-light appearance-none"
                >
                  <option value="Basic">Basic Protocol</option>
                  <option value="Premium">Premium Health Stream</option>
                  <option value="Elite">Elite Sovereign Coverage</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full mt-6 py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(239,68,68,0.2)]"
              >
                {t('syncHealthDomain')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* KYC Sync Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B0F19]/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowKYCModal(false)}></div>
          <div className="glass-panel w-full max-w-md p-10 relative overflow-hidden animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setShowKYCModal(false)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            
            <h3 className="text-xl font-bold text-[#E6EAF2] mb-2 italic">{t('initKYC')}</h3>
            <p className="text-[#9CA3AF] text-sm mb-10 font-light italic">Sync your institutional identity for zero-friction verification.</p>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-2 opacity-60">{t('detectedDocument')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-[#E6EAF2]">Aadhaar / Passport (Linked via DigiLocker)</span>
                </div>
              </div>

              <button 
                onClick={handleKYCSubmit}
                className="w-full py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(79,140,255,0.2)]"
              >
                {t('initIdentitySync')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Sync Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0B0F19]/80 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowBankModal(false)}></div>
          <div className="glass-panel w-full max-w-md p-10 relative overflow-hidden animate-[zoomIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <button 
              onClick={() => setShowBankModal(false)}
              className="absolute top-8 right-8 text-[#9CA3AF] hover:text-[#E6EAF2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <Landmark className="w-6 h-6 text-emerald-500" />
            </div>
            
            <h3 className="text-xl font-bold text-[#E6EAF2] mb-2 italic">{t('mapBank')}</h3>
            <p className="text-[#9CA3AF] text-sm mb-10 font-light italic">Map your multi-bank domains into your digital continuity.</p>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/[0.02] border border-white/[0.08] rounded-2xl">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] mb-2 opacity-60">{t('activeStreams')}</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-[#E6EAF2]/80">
                    <span>HDFC Bank (Primary)</span>
                    <span className="text-emerald-500">Linked</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#E6EAF2]/80">
                    <span>ICICI Bank</span>
                    <span className="text-emerald-500">Linked</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleBankSubmit}
                className="w-full py-5 bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95 transition-all text-[12px] font-bold uppercase tracking-widest rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              >
                {t('mapFinancialDestiny')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
