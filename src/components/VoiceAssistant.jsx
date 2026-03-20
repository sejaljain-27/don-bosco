import React, { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import gsap from 'gsap';

export function VoiceAssistant({ onAction }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const handleCommand = useCallback((command) => {
    const cmd = command.toLowerCase();
    
    // Navigation Commands
    if (cmd.includes('timeline') || cmd.includes('समयरेखा')) navigate('/dashboard/timeline');
    if (cmd.includes('analytics') || cmd.includes('एनालिटिक्स')) navigate('/dashboard/analytics');
    if (cmd.includes('settings') || cmd.includes('सेटअप')) navigate('/dashboard/settings');
    if (cmd.includes('domains') || cmd.includes('डोमेन')) navigate('/dashboard/domains');
    
    // Actions
    if (cmd.includes('offer') || cmd.includes('प्रस्ताव')) onAction?.('offer');
    if (cmd.includes('health') || cmd.includes('स्वास्थ्य')) onAction?.('health');
    if (cmd.includes('kyc') || cmd.includes('केवाईसी')) onAction?.('kyc');
    if (cmd.includes('bank') || cmd.includes('बैंक')) onAction?.('bank');

    setTranscript(command);
    setTimeout(() => {
      setShowStatus(false);
      setIsListening(false);
    }, 2000);
  }, [navigate, onAction]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-US' : 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setShowStatus(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0].transcript;
      handleCommand(result);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setShowStatus(false);
    };

    recognition.start();
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-[100]">
        <button
          onClick={toggleListening}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500
            ${isListening 
              ? 'bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)] animate-pulse' 
              : 'bg-[#4F8CFF] shadow-[0_0_40px_rgba(79,140,255,0.4)] hover:scale-110 active:scale-95'}
          `}
        >
          {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
        </button>
      </div>

      {showStatus && (
        <div className="fixed bottom-28 right-10 z-[100] animate-[slideUp_0.3s_ease-out]">
          <div className="glass-panel p-6 min-w-[300px] relative overflow-hidden">
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
              <span className="text-[10px] font-bold text-[#E6EAF2] uppercase tracking-[0.2em]">
                {isListening ? t('voiceActive') : 'Command Result'}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200 italic">
              {transcript || t('voiceAsk')}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
