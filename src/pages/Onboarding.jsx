import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, FileCheck, CheckCircle2, ScanFace, FileText, ArrowRight, Loader2, MapPin, History, FastForward, Check, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import gsap from 'gsap';

export function Onboarding({ userProfile, onUpdateProfile }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState(userProfile);
  const [uploadStatus, setUploadStatus] = useState({
    id: 'idle', // idle, uploading, verified
    degree: 'idle',
    income: 'idle'
  });
  
  const navigate = useNavigate();
  const faceScannerRef = useRef(null);

  useEffect(() => {
    if (step === 4) {
      if (faceScannerRef.current) {
        gsap.to('.scanner-line', {
          top: "100%",
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "sine.inOut",
          onComplete: () => {
            setTimeout(() => setStep(5), 0);
          }
        });
      }
    } else if (step === 3) {
      setTimeout(() => setStep(4), 1000);
    } else if (step === 5) {
      setTimeout(() => {
        // In a real app, we'd sync this with parent/shared state
        // For simulation, we'll navigate to dashboard and it will use its context
        toast.success("Profile Synchronized.");
        navigate('/dashboard');
      }, 1000);
    }
  }, [step, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const simulateDocUpload = (docKey) => {
    setUploadStatus(prev => ({ ...prev, [docKey]: 'uploading' }));
    toast.info(`Uploading ${docKey.toUpperCase()}...`);
    
    setTimeout(() => {
      setUploadStatus(prev => ({ ...prev, [docKey]: 'verified' }));
      toast.success(`${docKey.toUpperCase()} Verified.`);
    }, 500);
  };

  const allVerified = uploadStatus.id === 'verified' && uploadStatus.degree === 'verified' && uploadStatus.income === 'verified';

  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full z-10 px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
      <div className="glass-panel w-full max-w-5xl p-10 md:p-14 relative overflow-hidden transition-all duration-500 min-h-[600px] flex flex-col md:flex-row gap-16 items-start">
        
        {/* Subtle Background Accent */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#4F8CFF]/5 rounded-full blur-[100px]"></div>

        {/* Progress Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col w-56 pt-2 space-y-10">
           {[
             { s: 1, l: 'Identity', d: 'Base Credentials' },
             { s: 2, l: 'Vault', d: 'Enterprise Proofs' },
             { s: 3, l: 'Validation', d: 'Deep-layer Sync' },
             { s: 4, l: 'Biometrics', d: 'Sovereign Match' }
           ].map(i => (
             <div key={i.s} className={`flex flex-col gap-1.5 transition-all duration-500 ${step >= i.s ? 'opacity-100' : 'opacity-20'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${step === i.s ? 'bg-[#4F8CFF] shadow-[0_0_8px_#4F8CFF]' : 'bg-[#9CA3AF]'}`}></div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${step === i.s ? 'text-[#E6EAF2]' : 'text-[#9CA3AF]'}`}>{i.l}</span>
                </div>
                <span className="text-[11px] text-[#9CA3AF] font-light ml-5">{i.d}</span>
             </div>
           ))}
        </div>

        <div className="flex-1 w-full">
        {/* Step 1: Extended Info */}
        {step === 1 && (
          <div className="animate-[fadeIn_0.6s_ease-out] w-full">
            <h1 className="premium-header italic text-left">Identity.</h1>
            <p className="premium-sub text-left mb-12">Establish your core profile parameters and future aspirations in the Continuity network.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 md:col-span-2">
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 block opacity-60">Residential Metadata</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-[#4F8CFF]/60" />
                  <input 
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Enter verifiable address"
                    className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 pl-12 pr-6 text-[#E6EAF2] placeholder:text-[#9CA3AF]/30 focus:outline-none focus:border-[#4F8CFF]/40 transition-all" 
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 block opacity-60">Verified Origin</label>
                <input 
                  name="pastRole"
                  value={profile.pastRole}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="e.g. Graduate" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] focus:outline-none focus:border-[#4F8CFF]/40 transition-all" 
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 block opacity-60">Active Domain</label>
                <input 
                  name="currentRole"
                  value={profile.currentRole}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="e.g. Senior Architect"
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] focus:outline-none focus:border-[#4F8CFF]/40 transition-all" 
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 block opacity-60">Future Vector</label>
                <input 
                  name="futureRole"
                  value={profile.futureRole}
                  onChange={handleInputChange}
                  type="text" 
                  placeholder="Where do you see your trajectory?" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl py-4 px-6 text-[#E6EAF2] focus:outline-none focus:border-[#4F8CFF]/40 transition-all" 
                />
              </div>
            </div>

            <button onClick={() => {
              onUpdateProfile(profile);
              setStep(2);
            }} className="w-full mt-12 py-5 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-[#E6EAF2] rounded-2xl text-[12px] font-semibold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group">
              Initialize Trajectory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Step 2: Document Upload */}
        {step === 2 && (
          <div className="animate-[fadeIn_0.6s_ease-out] w-full flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
              <h1 className="premium-header italic text-left">Vault.</h1>
              <p className="premium-sub text-left mb-12">Securely anchor your enterprise proofs within the Continuity distributed vault.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'id', name: 'Identity Proof', desc: 'Secure Passport Hash' },
                  { id: 'degree', name: 'Institutional Proof', desc: 'Educational Attestation' },
                  { id: 'income', name: 'Financial Proof', desc: 'Fiscal Continuity Stream' }
                ].map((doc) => (
                  <div 
                    key={doc.id}
                    onClick={() => simulateDocUpload(doc.id)} 
                    className={`group relative flex items-center justify-between p-6 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden ${uploadStatus[doc.id] === 'verified' ? 'bg-[#4F8CFF]/5 border-[#4F8CFF]/30' : 'bg-white/[0.02] border-white/[0.08] hover:border-[#4F8CFF]/30'}`}
                  >
                    <div className="flex items-center gap-5 relative z-10">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${uploadStatus[doc.id] === 'verified' ? 'bg-[#4F8CFF]/20 text-[#4F8CFF]' : 'bg-white/[0.05] text-[#9CA3AF]'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[13px] text-[#E6EAF2] font-semibold block mb-0.5 tracking-tight">{doc.name}</span>
                        <span className="text-[10px] text-[#9CA3AF] uppercase font-bold tracking-[0.1em] opacity-60">{doc.desc}</span>
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      {uploadStatus[doc.id] === 'uploading' ? (
                        <Loader2 className="w-5 h-5 text-[#4F8CFF] animate-spin" />
                      ) : uploadStatus[doc.id] === 'verified' ? (
                        <CheckCircle2 className="w-5 h-5 text-[#4F8CFF] drop-shadow-[0_0_8px_rgba(79,140,255,0.4)]" />
                      ) : (
                        <UploadCloud className="w-5 h-5 text-[#9CA3AF]/40 group-hover:text-[#4F8CFF] transition-colors" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button 
                disabled={!allVerified}
                onClick={() => setStep(3)} 
                className={`w-full mt-12 py-5 rounded-2xl text-[12px] font-bold tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 ${allVerified ? 'bg-[#E6EAF2] text-[#0B0F19] hover:bg-white active:scale-95' : 'bg-white/[0.03] text-[#9CA3AF]/30 cursor-not-allowed border border-white/[0.05]'}`}
              >
                Enter Validation Phase
              </button>
            </div>

            {/* Premium Verification Box */}
            <div className="w-full lg:w-72 glass-panel p-8 border-white/[0.05] h-fit sticky top-0">
               <div className="flex items-center gap-3 mb-8">
                  <Shield className="w-4 h-4 text-[#4F8CFF]/60" />
                  <h3 className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] opacity-60">Sync Monitor</h3>
               </div>
               
               <div className="space-y-6">
                  {Object.entries(uploadStatus).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-[9px] mb-2 font-bold uppercase tracking-widest">
                        <span className="text-[#9CA3AF]/60">{key}</span>
                        <span className={val === 'verified' ? 'text-[#4F8CFF]' : val === 'uploading' ? 'text-[#8B5CF6]' : 'text-[#9CA3AF]/20'}>
                          {val === 'verified' ? 'Verified' : val === 'uploading' ? 'Analyzing' : 'Pending'}
                        </span>
                      </div>
                      <div className="w-full h-[2px] bg-white/[0.03] rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${val === 'verified' ? 'w-full bg-[#4F8CFF]' : val === 'uploading' ? 'w-[60%] bg-[#8B5CF6] animate-pulse' : 'w-0'}`}></div>
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-10 p-4 bg-[#4F8CFF]/5 rounded-2xl border border-[#4F8CFF]/10">
                  <p className="text-[11px] text-[#9CA3AF] leading-relaxed font-light italic opacity-60">Dynamic institution cross-check enabled.</p>
               </div>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="animate-[fadeIn_0.6s_ease-out] flex flex-col items-center justify-center h-full text-center py-12 w-full">
            <div className="relative mb-12">
              <div className="w-32 h-32 border border-[#4F8CFF]/10 rounded-full flex items-center justify-center">
                 <div className="w-24 h-24 border border-[#4F8CFF]/20 rounded-full animate-[spin_4s_linear_infinite] border-t-[#4F8CFF]"></div>
              </div>
              <FileCheck className="w-8 h-8 text-[#4F8CFF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(79,140,255,0.3)]" />
            </div>
            <h1 className="premium-header italic italic italic">Validation.</h1>
            <p className="premium-sub max-w-sm mb-12 animate-pulse">Running institutional cross-checks and distributed ledger verification...</p>
            
            <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
               {[
                 { label: 'Role Alignment', icon: CheckCircle2, color: 'text-[#4F8CFF]' },
                 { label: 'Educational Hash', icon: CheckCircle2, color: 'text-[#4F8CFF]' },
                 { label: 'Tax Record Streams', icon: Loader2, color: 'text-[#8B5CF6]', ani: 'animate-spin' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.04] rounded-2xl">
                    <span className="text-[13px] text-[#9CA3AF]">{item.label}</span>
                    <item.icon className={`w-4 h-4 ${item.color} ${item.ani || ''}`} />
                 </div>
               ))}
            </div>
            
            <button onClick={() => setStep(4)} className="mt-12 text-[10px] font-bold text-[#E6EAF2] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
              Finalizing Protocol...
            </button>
          </div>
        )}

        {/* Step 4: Biometrics */}
        {step === 4 && (
          <div className="animate-[fadeIn_0.8s_ease-out] flex flex-col items-center justify-center text-center py-12 w-full">
             <h1 className="premium-header italic">Biometrics.</h1>
             <p className="premium-sub mb-14 max-w-md">Synchronize your biological signature with your digital continuity profile.</p>
             
             <div className="relative w-56 h-56 rounded-full border border-white/[0.05] p-6 overflow-hidden flex items-center justify-center group" ref={faceScannerRef}>
                <div className="absolute inset-0 bg-gradient-to-b from-[#4F8CFF]/10 to-transparent animate-pulse"></div>
                
                <div className="relative z-10 w-full h-full bg-[#0B0F19]/80 rounded-full border border-white/[0.08] flex items-center justify-center">
                  <ScanFace className="w-20 h-20 text-[#4F8CFF]/30 transition-all duration-700 group-hover:scale-110" strokeWidth={1} />
                </div>
                
                {/* Handcrafted Scanner Line */}
                <div className="scanner-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4F8CFF] to-transparent shadow-[0_0_20px_rgba(79,140,255,0.8)] z-20"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-[#4F8CFF]/40 rounded-tl-lg"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-[#4F8CFF]/40 rounded-br-lg"></div>
             </div>
             
             <div className="mt-12 flex flex-col items-center gap-3">
                <span className="text-[11px] text-[#4F8CFF] font-bold tracking-[0.3em] uppercase animate-pulse">Scanning Bio-Signal</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-[#4F8CFF] rounded-full"></div>
                  <div className="w-1 h-1 bg-[#4F8CFF]/50 rounded-full"></div>
                  <div className="w-1 h-1 bg-[#4F8CFF]/20 rounded-full"></div>
                </div>
             </div>
          </div>
        )}

        {/* Step 5: Success State */}
        {step === 5 && (
          <div className="animate-[fadeIn_1s_ease-out] flex flex-col items-center justify-center text-center py-10 w-full">
            <div className="relative mb-12">
               <div className="w-24 h-24 bg-gradient-to-br from-[#4F8CFF] to-[#8B5CF6] rounded-full flex items-center justify-center p-0.5">
                  <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-[#4F8CFF] drop-shadow-[0_0_15px_rgba(79,140,255,0.5)]" />
                  </div>
               </div>
               <div className="absolute inset-0 bg-[#4F8CFF]/20 rounded-full blur-2xl -z-10 animate-pulse"></div>
            </div>

            <h1 className="premium-header italic italic italic mb-4">Established.</h1>
            <p className="premium-sub text-lg mb-10">Continuity link successfully anchored.<br />
              Initial Trust Index: <span className="text-[#4F8CFF] font-bold font-mono ml-2">78.4%</span>
            </p>
            
            <div className="flex flex-col items-center gap-4 text-[#9CA3AF] opacity-60">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Mapping Command Center...</p>
            </div>
          </div>
        )}
        </div>

      </div>
    </div>
  );
}
