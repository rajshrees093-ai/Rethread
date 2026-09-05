import React from 'react';
import HeroVisual from './HeroVisual';
import { UPCYCLING_IMAGES } from '../assets/upcyclingImages';
import { 
  UploadCloud, X, Wrench, Shirt, Heart, Scissors, RefreshCw, 
  Sparkles, ArrowRight, ChevronRight 
} from 'lucide-react';

export default function OverviewGallery({ onSelectPage }) {
  return (
    <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-6 space-y-8 animate-fade-in">
      
      {/* Overview Banner */}
      <div className="flex items-center justify-between glass-panel rounded-2xl px-6 py-3.5 border border-white/90">
        <div>
          <h2 className="text-sm font-bold text-[#1F2E24]">
            ReThread Master Design Board
          </h2>
          <p className="text-[11px] text-[#5A6E60]">
            Complete 6-screen UI system preview matching the reference design layout.
          </p>
        </div>
        <button
          onClick={() => onSelectPage('analyze')}
          className="px-4 py-2 rounded-full bg-[#527557] hover:bg-[#436247] text-white text-xs font-semibold shadow-sm transition-all"
        >
          Try Live Interactive Flow →
        </button>
      </div>

      {/* TOP ROW: SCREEN 1 (HERO) & SCREEN 2 (ANALYZE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* TOP LEFT: HERO SCREEN */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/80 shadow-glass">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 space-y-4">
              <h1 className="font-editorial text-3xl sm:text-4xl font-normal leading-[1.15] text-[#1F2E24]">
                Give Every <br />
                Thread a <br />
                Second Life.
              </h1>
              <p className="text-xs text-[#4A5D4E] leading-relaxed">
                ReThread helps you make smarter, more sustainable choices for clothes you no longer wear.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => onSelectPage('analyze')}
                  className="px-4 py-2 rounded-full bg-[#527557] text-white text-xs font-semibold shadow-sm"
                >
                  Analyze My Clothing
                </button>
                <button
                  onClick={() => onSelectPage('how-it-works')}
                  className="px-4 py-2 rounded-full glass-panel bg-white/70 text-[#1F2E24] text-xs font-semibold border border-white"
                >
                  How It Works
                </button>
              </div>
            </div>

            <div className="md:col-span-6 flex justify-center scale-90 sm:scale-100">
              <HeroVisual onSelectOption={() => onSelectPage('analyze')} />
            </div>
          </div>
        </div>

        {/* TOP RIGHT: ANALYZE SCREEN */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-glass space-y-5">
          <div className="text-center space-y-1">
            <h2 className="font-editorial text-2xl font-bold text-[#1F2E24]">
              What should I do with this clothing?
            </h2>
            <p className="text-xs text-[#5A6E60]">
              Tell us about your clothing or upload a photo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload Box */}
            <div className="p-4 rounded-2xl bg-white/50 border border-white/80 space-y-2">
              <h3 className="text-xs font-bold text-[#1F2E24]">Upload Image</h3>
              <div className="border border-dashed border-[#BDD2C3] rounded-xl p-4 text-center">
                <UploadCloud className="w-5 h-5 text-[#527557] mx-auto mb-1" />
                <p className="text-[11px] font-semibold text-[#1F2E24]">Drag & drop your image here</p>
                <p className="text-[10px] text-[#5A6E60]">or click to browse</p>
                <span className="text-[8px] text-[#7A8E7E] uppercase font-bold">JPG, PNG up to 10MB</span>
              </div>
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white shadow-sm mt-2 relative">
                <img src={UPCYCLING_IMAGES.sampleJeans} alt="Jeans" className="w-full h-full object-cover" />
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-black/70 text-white text-[8px] flex items-center justify-center">✕</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 rounded-2xl bg-white/50 border border-white/80 space-y-2.5 text-xs">
              <h3 className="text-xs font-bold text-[#1F2E24]">Or describe your clothing</h3>
              <div>
                <label className="text-[10px] text-[#5A6E60] block mb-0.5">Clothing type</label>
                <div className="p-2 rounded-lg bg-white/80 border border-black/10 font-semibold text-[#1F2E24]">Jeans</div>
              </div>
              <div>
                <label className="text-[10px] text-[#5A6E60] block mb-0.5">Condition</label>
                <div className="p-2 rounded-lg bg-white/80 border border-black/10 font-semibold text-[#1F2E24]">Slightly damaged</div>
              </div>
              <div>
                <label className="text-[10px] text-[#5A6E60] block mb-0.5">Why are you not using it?</label>
                <div className="p-2 rounded-lg bg-white/80 border border-black/10 text-[#1F2E24]">I don't wear it anymore</div>
              </div>
              <button
                onClick={() => onSelectPage('result')}
                className="w-full py-2.5 rounded-full bg-[#527557] text-white font-semibold text-xs mt-1"
              >
                Analyze with AI ✨
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: SCREEN 3 (RESULT), SCREEN 4 (UPCYCLING), SCREEN 5 & 6 (HOW IT WORKS & ASSISTANT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BOTTOM LEFT: RECOMMENDATION SCREEN */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-5 border border-white/80 shadow-glass space-y-4">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5A6E60]">
              YOUR RETHREAD RECOMMENDATION
            </span>
          </div>

          {/* Hero Recommendation Card */}
          <div className="p-4 rounded-2xl bg-white/80 border border-white shadow-subtle space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#527557] text-white flex items-center justify-center flex-shrink-0">
                <Wrench className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-[10px] text-[#5A6E60] block">Recommended</span>
                <h4 className="font-editorial text-lg font-bold text-[#1F2E24]">REPAIR</h4>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F0EA] text-[#344A37] text-[9px] font-bold">High Confidence</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#1F2E24] block mb-0.5">Why?</span>
              <p className="text-[10px] text-[#4A5D4E] leading-relaxed">
                The clothing appears to be in usable condition and the visible damage seems repairable. Repairing it could extend its useful life.
              </p>
            </div>
          </div>

          {/* Other Options */}
          <div className="space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-[#5A6E60] block text-center">OTHER OPTIONS</span>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="p-2 rounded-xl bg-white/60 text-[9px]">
                <Shirt className="w-3.5 h-3.5 mx-auto text-[#4A728C] mb-1" />
                <span className="font-bold block">REUSE</span>
              </div>
              <div className="p-2 rounded-xl bg-white/60 text-[9px]">
                <Heart className="w-3.5 h-3.5 mx-auto text-[#9C6D53] mb-1" />
                <span className="font-bold block">DONATE</span>
              </div>
              <div className="p-2 rounded-xl bg-white/60 text-[9px]">
                <Scissors className="w-3.5 h-3.5 mx-auto text-[#7D5A8C] mb-1" />
                <span className="font-bold block">UPCYCLE</span>
              </div>
              <div className="p-2 rounded-xl bg-white/60 text-[9px]">
                <RefreshCw className="w-3.5 h-3.5 mx-auto text-[#4E7D63] mb-1" />
                <span className="font-bold block">RECYCLE</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onSelectPage('upcycling')}
              className="flex-1 py-2 rounded-full bg-[#527557] text-white text-[10px] font-semibold"
            >
              Get AI Upcycling Ideas ✨
            </button>
            <button
              onClick={() => onSelectPage('analyze')}
              className="py-2 px-3 rounded-full bg-white text-[#1F2E24] text-[10px] font-semibold border border-white"
            >
              Analyze Another ↺
            </button>
          </div>
        </div>

        {/* BOTTOM CENTER: UPCYCLING IDEAS SCREEN */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-5 border border-white/80 shadow-glass space-y-3">
          <div className="text-center space-y-0.5">
            <h3 className="font-editorial text-lg font-bold text-[#1F2E24]">
              Give Your Clothing a New Purpose
            </h3>
            <p className="text-[10px] text-[#5A6E60]">AI upcycling ideas for your Jeans</p>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-2 rounded-2xl bg-white/70 border border-white space-y-1 text-left">
              <div className="h-20 rounded-xl overflow-hidden bg-[#E8EFEA]">
                <img src={UPCYCLING_IMAGES.denimTote} alt="Tote" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-[11px] font-bold text-[#1F2E24]">Denim Tote Bag</h4>
              <span className="px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#6B5A3E] text-[8px] font-semibold">Easy</span>
              <p className="text-[9px] text-[#5A6E60] leading-tight">Turn your old jeans into a stylish tote bag.</p>
            </div>

            <div className="p-2 rounded-2xl bg-white/70 border border-white space-y-1 text-left">
              <div className="h-20 rounded-xl overflow-hidden bg-[#E8EFEA]">
                <img src={UPCYCLING_IMAGES.storagePouch} alt="Pouch" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-[11px] font-bold text-[#1F2E24]">Storage Pouch</h4>
              <span className="px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#6B5A3E] text-[8px] font-semibold">Easy</span>
              <p className="text-[9px] text-[#5A6E60] leading-tight">Make a handy pouch to store small items.</p>
            </div>

            <div className="p-2 rounded-2xl bg-white/70 border border-white space-y-1 text-left">
              <div className="h-20 rounded-xl overflow-hidden bg-[#E8EFEA]">
                <img src={UPCYCLING_IMAGES.plantHolder} alt="Planter" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-[11px] font-bold text-[#1F2E24]">Plant Holder</h4>
              <span className="px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#6B5A3E] text-[8px] font-semibold">Medium</span>
              <p className="text-[9px] text-[#5A6E60] leading-tight">Create a beautiful plant holder.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 max-w-xs mx-auto">
            <div className="p-2 rounded-2xl bg-white/70 border border-white space-y-1 text-left">
              <div className="h-16 rounded-xl overflow-hidden bg-[#E8EFEA]">
                <img src={UPCYCLING_IMAGES.fabricAccessories} alt="Accessories" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-[11px] font-bold text-[#1F2E24]">Fabric Accessories</h4>
              <span className="px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#6B5A3E] text-[8px] font-semibold">Easy</span>
            </div>

            <div className="p-2 rounded-2xl bg-white/70 border border-white space-y-1 text-left">
              <div className="h-16 rounded-xl overflow-hidden bg-[#E8EFEA]">
                <img src={UPCYCLING_IMAGES.denimOrganizer} alt="Organizer" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-[11px] font-bold text-[#1F2E24]">Denim Organizer</h4>
              <span className="px-1.5 py-0.2 rounded bg-[#F4EFE6] text-[#6B5A3E] text-[8px] font-semibold">Medium</span>
            </div>
          </div>
        </div>

        {/* BOTTOM RIGHT: HOW IT WORKS + ASSISTANT PANEL */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* How it works mini card */}
          <div className="glass-panel rounded-3xl p-4 border border-white/80 shadow-glass space-y-2.5 text-center">
            <h4 className="font-editorial text-sm font-bold text-[#1F2E24]">How ReThread Works</h4>
            <p className="text-[9px] text-[#5A6E60]">A simple 4-step process</p>
            
            <div className="grid grid-cols-4 gap-1">
              {['01', '02', '03', '04'].map((num) => (
                <div key={num} className="p-1.5 rounded-xl bg-white/70 text-center">
                  <div className="w-5 h-5 rounded-full bg-[#527557] text-white text-[8px] font-bold mx-auto mb-1 flex items-center justify-center">
                    {num}
                  </div>
                  <span className="text-[7px] text-[#1F2E24] font-bold block leading-tight">Step {num}</span>
                </div>
              ))}
            </div>

            <div className="p-1.5 rounded-full bg-white/80 border border-black/10 text-[7px] font-bold text-[#1F2E24]">
              INPUT → ANALYSIS → OPTIONS → ACTION
            </div>
          </div>

          {/* Assistant mini drawer */}
          <div className="glass-panel rounded-3xl p-3.5 border border-white/80 shadow-glass space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#527557]" />
                <span className="text-[11px] font-bold text-[#1F2E24]">ReThread Assistant</span>
              </div>
              <span className="text-[9px] text-[#527557] font-semibold">● Online</span>
            </div>

            <div className="p-2 rounded-xl bg-white/80 text-[10px] text-[#1F2E24] leading-relaxed">
              Hi! I can help you with sustainable clothing choices.
            </div>

            <div className="space-y-1">
              <div className="p-1.5 rounded-lg bg-white/60 text-[9px] flex items-center justify-between">
                <span>What should I do with old jeans?</span>
                <ChevronRight className="w-3 h-3 text-[#5A6E60]" />
              </div>
              <div className="p-1.5 rounded-lg bg-white/60 text-[9px] flex items-center justify-between">
                <span>Can I donate this shirt?</span>
                <ChevronRight className="w-3 h-3 text-[#5A6E60]" />
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
