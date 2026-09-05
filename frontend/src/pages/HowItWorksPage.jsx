import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HowItWorksPage({ setActivePage }) {
  const steps = [
    {
      number: '01',
      title: 'Tell Us About Your Clothing',
      description: 'Enter details or upload an image.'
    },
    {
      number: '02',
      title: 'ReThread Analyzes It',
      description: 'AI evaluates the information provided.'
    },
    {
      number: '03',
      title: 'Get a Recommendation',
      description: 'Receive a suggested sustainable action.'
    },
    {
      number: '04',
      title: 'Give It a Second Life',
      description: 'Repair, reuse, donate, upcycle or recycle.'
    }
  ];

  const pipeline = [
    'USER INPUT',
    'AI ANALYSIS',
    'ASSESSMENT',
    'OPTIONS',
    'RECOMMENDATION',
    'ACTION'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      
      {/* Header matching mockup */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2E24]">
          How ReThread Works
        </h1>
        <p className="text-xs sm:text-sm text-[#5A6E60]">
          A simple 4-step process
        </p>
      </div>

      {/* 4 Frosted Glass Vertical Cards in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step) => (
          <div
            key={step.number}
            className="glass-panel rounded-3xl p-6 flex flex-col items-center text-center space-y-4 border border-white/80 shadow-glass"
          >
            {/* Green Numbered Circle */}
            <div className="w-12 h-12 rounded-full bg-[#527557] text-white font-editorial font-bold text-base flex items-center justify-center shadow-md">
              {step.number}
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm sm:text-base font-bold text-[#1F2E24]">
                {step.title}
              </h3>
              <p className="text-xs text-[#5A6E60] leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Workflow Pipeline Pill at the Bottom */}
      <div className="glass-panel rounded-full py-4 px-6 sm:px-8 border border-white/90 shadow-glass max-w-4xl mx-auto overflow-x-auto">
        <div className="flex items-center justify-between min-w-[620px] text-[11px] font-bold text-[#1F2E24] tracking-wider">
          {pipeline.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="hover:text-[#527557] transition-colors">{item}</span>
              {idx < pipeline.length - 1 && (
                <span className="text-[#5A6E60] font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Try ReThread Button */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            setActivePage('analyze');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Analyze Your Clothing</span>
        </button>
      </div>

    </div>
  );
}
