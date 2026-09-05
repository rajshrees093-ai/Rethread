import React from 'react';

export default function Footer({ setActivePage }) {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full mt-20 border-t border-[#1F2E24]/10 bg-white/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#557A60]">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 9 10 11 12 12C14 11 16.5 9 16.5 6.5C16.5 4 14.5 2 12 2Z" />
                <path d="M12 22C14.5 22 16.5 20 16.5 17.5C16.5 15 14 13 12 12C10 13 7.5 15 7.5 17.5C7.5 20 9.5 22 12 22Z" />
                <path d="M2 12C2 14.5 4 16.5 6.5 16.5C9 16.5 11 14 12 12C11 10 9 7.5 6.5 7.5C4 7.5 2 9.5 2 12Z" />
                <path d="M22 12C22 9.5 20 7.5 17.5 7.5C15 7.5 13 10 12 12C13 14 15 16.5 17.5 16.5C20 16.5 22 14.5 22 12Z" />
              </svg>
            </div>
            <div>
              <span className="font-editorial text-xl font-bold text-[#1F2E24] tracking-tight block">
                ReThread
              </span>
              <p className="font-editorial text-xs italic text-[#5A6E60]">
                "Give Every Thread a Second Life."
              </p>
            </div>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-[#5A6E60]">
            <button onClick={() => handleNav('home')} className="hover:text-[#1F2E24] transition-colors">
              Home
            </button>
            <button onClick={() => handleNav('analyze')} className="hover:text-[#1F2E24] transition-colors">
              Analyze
            </button>
            <button onClick={() => handleNav('how-it-works')} className="hover:text-[#1F2E24] transition-colors">
              How It Works
            </button>
            <button onClick={() => handleNav('impact')} className="hover:text-[#1F2E24] transition-colors">
              Impact
            </button>
            <button onClick={() => handleNav('about')} className="hover:text-[#1F2E24] transition-colors">
              About
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-[#1F2E24]/10 text-center text-xs text-[#5A6E60]/80">
          <p>© {new Date().getFullYear()} ReThread. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
