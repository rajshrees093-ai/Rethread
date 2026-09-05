import React from 'react';
import { ArrowRight, Sparkles, HeartHandshake, RefreshCw, Compass } from 'lucide-react';
import HeroVisual from '../components/HeroVisual';

export default function HomePage({ setActivePage, setQuickStartPreset }) {
  const featureCards = [
    {
      icon: Sparkles,
      title: "AI Recommendations",
      description: "Get a practical recommendation based on your clothing and its condition.",
      color: "bg-[#E8F0EA] text-[#4A6B53] border-[#B8D1BE]"
    },
    {
      icon: RefreshCw,
      title: "Extend Clothing Life",
      description: "Discover ways to keep your clothes useful for longer.",
      color: "bg-[#E5EEF4] text-[#4A728C] border-[#B8D2E3]"
    },
    {
      icon: Compass,
      title: "Explore New Possibilities",
      description: "Find ideas for repair, reuse, donation and upcycling.",
      color: "bg-[#EFE6F4] text-[#7D5A8C] border-[#D1BDDB]"
    },
    {
      icon: HeartHandshake,
      title: "Choose Responsibly",
      description: "Make a more informed decision before replacing or discarding clothing.",
      color: "bg-[#F7ECE6] text-[#9C6D53] border-[#DEC4B5]"
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* Hero Section matching mockup Top-Left pane */}
      <section className="relative pt-6 sm:pt-12 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Large Editorial Headline */}
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#1F2E24] tracking-tight">
                Give Every <br />
                Thread a <br />
                Second Life.
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-[#4A5D4E] max-w-md leading-relaxed">
                ReThread helps you make smarter, more sustainable choices for clothes you no longer wear.
              </p>

              {/* Action Pill Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => {
                    setActivePage('analyze');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Analyze My Clothing
                </button>

                <button
                  onClick={() => {
                    setActivePage('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-full glass-panel bg-white/70 hover:bg-white text-[#1F2E24] font-medium text-sm sm:text-base border border-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  How It Works
                </button>
              </div>

            </div>

            {/* Right Column: Circular Lifecycle Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <HeroVisual onSelectOption={() => {
                setActivePage('analyze');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} />
            </div>

          </div>

        </div>
      </section>

      {/* Feature Section */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1F2E24]">
              Make Better Choices for What You Already Own
            </h2>
            <p className="text-xs sm:text-sm text-[#5A6E60]">
              Practical decision support to keep garments useful and out of landfills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featureCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="glass-card rounded-3xl p-6 flex flex-col justify-between space-y-3 border border-white/80"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${card.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#1F2E24] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5A6E60] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
