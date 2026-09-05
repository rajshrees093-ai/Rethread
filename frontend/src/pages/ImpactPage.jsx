import React, { useState } from 'react';
import { 
  Sparkles, HeartHandshake, RefreshCw, Scissors, 
  ShieldCheck, Globe2, ArrowRight, CheckCircle2, Award 
} from 'lucide-react';

export default function ImpactPage({ setActivePage }) {
  const [garmentsCount, setGarmentsCount] = useState(3);

  const impactCards = [
    {
      title: 'Extend Clothing Life',
      subtitle: 'Promote active use and repair',
      description: 'Minor mends, re-styling, and proper garment care keep existing clothes in rotation, avoiding unnecessary replacement purchases.',
      icon: RefreshCw,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Reduce Unnecessary Disposal',
      subtitle: 'Pause before discarding',
      description: 'Encouraging a mindful pause before throwing clothes away helps users explore sustainable alternatives to landfill disposal.',
      icon: ShieldCheck,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'Support Circular Reuse',
      subtitle: 'Encourage donation & community sharing',
      description: 'Connecting wearable items with local donation streams and second-hand channels keeps garments circulating in local economies.',
      icon: HeartHandshake,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Inspire Creative Upcycling',
      subtitle: 'Transform worn fabric into new utility',
      description: 'Turning damaged garments into tote bags, plant holders, and home organizers captures residual material value locally without industrial processing.',
      icon: Scissors,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill bg-white/70 text-xs font-semibold text-sage-800">
          <Globe2 className="w-3.5 h-3.5 text-sage-600" />
          <span>SDG 12 · Circular Living</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-dark">
          Small Choices. Longer Lives.
        </h1>
        <p className="text-sm sm:text-base text-forest-muted leading-relaxed">
          ReThread encourages people to pause before discarding clothing and consider whether it can be repaired, reused, donated, upcycled, or recycled.
        </p>
      </div>

      {/* 4 Impact Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impactCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-white"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.color}`}>
                <IconComp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sage-700 block mb-1">
                  {card.subtitle}
                </span>
                <h3 className="text-lg font-bold text-forest-dark mb-2">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-forest-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dedicated SDG 12 Section */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white shadow-glass bg-gradient-to-br from-white/90 via-sage-50/40 to-white/90">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sage-100 text-sage-800 text-xs font-bold">
              <Award className="w-4 h-4 text-sage-700" />
              <span>United Nations SDG 12</span>
            </div>
            
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-dark">
              Aligned with SDG 12: Responsible Consumption and Production
            </h2>

            <p className="text-sm text-forest-charcoal/80 leading-relaxed">
              Target 12.5 of the UN Sustainable Development Goals aims to substantially reduce waste generation through prevention, reduction, recycling, and reuse.
            </p>

            <p className="text-xs sm:text-sm text-forest-muted leading-relaxed">
              ReThread directly supports this goal by providing accessible, practical decision support at the consumer level—helping everyday individuals make thoughtful choices for unwanted textiles before considering disposal.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="p-6 rounded-3xl glass-card bg-white/90 border border-white text-center space-y-2 shadow-sm">
              <span className="text-3xl font-editorial font-extrabold text-sage-700 block">
                SDG 12
              </span>
              <span className="text-xs font-bold text-forest-dark block">
                Target 12.5 Focus
              </span>
              <p className="text-[11px] text-forest-muted leading-tight">
                Prevention · Reduction · Recycling · Reuse
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Qualitative Impact Estimator */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white space-y-6">
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <h3 className="font-editorial text-2xl font-bold text-forest-dark">
            Your Personal Circular Ripple
          </h3>
          <p className="text-xs sm:text-sm text-forest-muted">
            See the qualitative impact of giving multiple garments another life.
          </p>
        </div>

        {/* Garment Count Selector */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-xs font-bold text-forest-charcoal uppercase tracking-wider">
            Garments Given a Second Life: <span className="text-sage-700 text-base font-extrabold">{garmentsCount}</span>
          </label>
          <div className="flex items-center gap-2">
            {[1, 3, 5, 10, 15].map((num) => (
              <button
                key={num}
                onClick={() => setGarmentsCount(num)}
                className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                  garmentsCount === num
                    ? 'bg-sage-600 text-white shadow-sm scale-110'
                    : 'glass-pill bg-white/70 hover:bg-white text-forest-charcoal border border-forest-muted/15'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Qualitative Statements */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/80 border border-forest-muted/10 text-center space-y-1.5">
            <span className="text-xs font-bold text-forest-dark block">Materials Preserved</span>
            <p className="text-xs text-forest-muted leading-relaxed">
              Keeping {garmentsCount} garments active delays the need for virgin fiber extraction, water-heavy processing, and dyeing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-forest-muted/10 text-center space-y-1.5">
            <span className="text-xs font-bold text-forest-dark block">Landfill Diversion</span>
            <p className="text-xs text-forest-muted leading-relaxed">
              Prevents {garmentsCount} items from contributing to local municipal textile solid waste streams.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 border border-forest-muted/10 text-center space-y-1.5">
            <span className="text-xs font-bold text-forest-dark block">Sustainable Habit</span>
            <p className="text-xs text-forest-muted leading-relaxed">
              Reinforces conscious, circular wardrobe habits that inspire friends, family, and peers.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
