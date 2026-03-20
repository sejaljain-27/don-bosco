import React from 'react';
import { Fingerprint, LogIn, UserPlus, LayoutDashboard, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export function Navbar() {
  const location = useLocation();
  const { lang, setLang } = useLanguage();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Login', path: '/', icon: LogIn },
    { name: 'Sign Up', path: '/signup', icon: UserPlus },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto pt-8 pb-4 px-6 flex items-center justify-between z-50 relative">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
          <Fingerprint className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
          Digital Life Continuity<span className="text-slate-500 font-normal">.engine</span>
        </h1>
      </Link>
      
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6 bg-[#131826]/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/login');
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            )
          })}
        </nav>
        
        <button 
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all group"
        >
          <Globe className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#4F8CFF] transition-colors" />
          <span className="text-[10px] font-bold text-[#E6EAF2] uppercase tracking-widest">{lang === 'en' ? 'HI' : 'EN'}</span>
        </button>

        <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
          <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sejal&backgroundColor=e2e8f0" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
