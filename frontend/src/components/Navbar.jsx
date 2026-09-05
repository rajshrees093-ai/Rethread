import React, { useState } from 'react';
import { Menu, X, LayoutGrid } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'analyze', label: 'Analyze' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'impact', label: 'Impact' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-8 pt-4 pb-2">
      <nav className="max-w-6xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo matching the reference icon */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="ReThread Home"
        >
          {/* 4-petal / loop thread icon */}
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#527557] transition-transform group-hover:scale-105">
            <svg
              className="w-7 h-7"
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

          <span className="font-editorial text-2xl font-bold tracking-tight text-[#1F2E24]">
            ReThread
          </span>
        </button>

        {/* Center Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#1F2E24] font-semibold border-b-2 border-[#527557] pb-0.5'
                    : 'text-[#4A5D4E] hover:text-[#1F2E24]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button & Gallery Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavClick(activePage === 'overview' ? 'home' : 'overview')}
            className={`p-2 rounded-full transition-all text-xs flex items-center gap-1.5 font-semibold ${
              activePage === 'overview'
                ? 'bg-[#1F2E24] text-white shadow-sm'
                : 'glass-pill bg-white/70 hover:bg-white text-[#1F2E24]'
            }`}
            title="Toggle All Screens Overview Board"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[11px] pr-1">Design Board</span>
          </button>

          <button
            onClick={() => handleNavClick('analyze')}
            className="px-5 py-2.5 rounded-full bg-[#527557] hover:bg-[#436247] text-white text-sm font-medium shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            Analyze Clothing
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => handleNavClick(activePage === 'overview' ? 'home' : 'overview')}
            className="p-2 rounded-full glass-pill bg-white/70 text-[#1F2E24]"
            aria-label="Toggle Design Board"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-[#1F2E24] hover:bg-white/60 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto glass-panel rounded-3xl p-5 shadow-lg border border-white/80 transition-all">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'bg-[#527557]/15 text-[#1F2E24] font-bold'
                    : 'text-[#4A5D4E] hover:bg-white/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-[#1F2E24]/10">
              <button
                onClick={() => handleNavClick('analyze')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#527557] text-white text-sm font-medium shadow-sm"
              >
                <span>Analyze Clothing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
