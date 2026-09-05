import React from 'react';
import { 
  Wrench, Shirt, Heart, Scissors, RefreshCw, 
  Sparkles, ArrowLeft, ArrowRight 
} from 'lucide-react';

export default function ResultPage({ 
  resultData, 
  imagePreview, 
  onAnalyzeAnother, 
  onExploreUpcycling,
  onSwitchAction
}) {
  const data = resultData || {
    clothing_type: 'Jeans',
    condition: 'Slightly Damaged',
    recommendation: 'REPAIR',
    confidence: 'High',
    why_points: [
      'The clothing appears to be in usable condition and the visible damage seems repairable. Repairing it could extend its useful life.'
    ],
    sustainability_note: 'Keeping a garment in use longer can be a more sustainable alternative to immediately replacing it.',
    alternatives: [
      { action: 'REUSE', title: 'REUSE', description: 'Continue using it for casual or home wear.' },
      { action: 'DONATE', title: 'DONATE', description: 'If it is still in good condition and you no longer need it.' },
      { action: 'UPCYCLE', title: 'UPCYCLE', description: 'Transform the garment into another useful item.' },
      { action: 'RECYCLE', title: 'RECYCLE', description: 'Consider textile recycling if the garment is no longer usable.' }
    ]
  };

  const actionMeta = {
    REPAIR: {
      title: 'REPAIR',
      icon: Wrench,
      iconBg: 'bg-[#527557] text-white',
      badgeColor: 'bg-[#E8F0EA] text-[#344A37] border-[#B8D1BE]'
    },
    REUSE: {
      title: 'REUSE',
      icon: Shirt,
      iconBg: 'bg-[#4A728C] text-white',
      badgeColor: 'bg-[#E5EEF4] text-[#2C485C] border-[#B8D2E3]'
    },
    DONATE: {
      title: 'DONATE',
      icon: Heart,
      iconBg: 'bg-[#9C6D53] text-white',
      badgeColor: 'bg-[#F7ECE6] text-[#63402E] border-[#DEC4B5]'
    },
    UPCYCLE: {
      title: 'UPCYCLE',
      icon: Scissors,
      iconBg: 'bg-[#7D5A8C] text-white',
      badgeColor: 'bg-[#EFE6F4] text-[#4F335C] border-[#D1BDDB]'
    },
    RECYCLE: {
      title: 'RECYCLE',
      icon: RefreshCw,
      iconBg: 'bg-[#4E7D63] text-white',
      badgeColor: 'bg-[#E6EFEA] text-[#2D523E] border-[#B8D9C5]'
    }
  };

  const currentMeta = actionMeta[data.recommendation] || actionMeta.REPAIR;
  const MainIcon = currentMeta.icon;

  const defaultAlternatives = [
    { action: 'REUSE', title: 'REUSE', description: 'Continue using it for casual or home wear.' },
    { action: 'DONATE', title: 'DONATE', description: 'If it is still in good condition and you no longer need it.' },
    { action: 'UPCYCLE', title: 'UPCYCLE', description: 'Transform the garment into another useful item.' },
    { action: 'RECYCLE', title: 'RECYCLE', description: 'Consider textile recycling if the garment is no longer usable.' }
  ];

  const alternativesList = (data.alternatives && data.alternatives.length > 0)
    ? data.alternatives
    : defaultAlternatives.filter(a => a.action !== data.recommendation);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onAnalyzeAnother}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A6E60] hover:text-[#1F2E24] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Analyze</span>
        </button>
      </div>

      {/* Center Label */}
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#5A6E60]">
          YOUR RETHREAD RECOMMENDATION
        </span>
      </div>

      {/* HERO RECOMMENDATION GLASS CARD MATCHING MOCKUP */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/95 shadow-glass relative overflow-hidden bg-gradient-to-br from-white/90 via-white/70 to-[#EBF2ED]/85">
        
        {/* Subtle decorative botanical leaf silhouette in top-right corner */}
        <div className="absolute right-4 top-4 opacity-35 pointer-events-none hidden sm:block">
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 90C50 90 85 65 85 35C85 15 65 10 50 10C35 10 15 15 15 35C15 65 50 90 50 90Z" fill="#527557" fillOpacity="0.4"/>
            <path d="M50 15V85" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 35L70 25" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 50L75 40" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 65L68 58" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 35L30 25" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 50L25 40" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
            <path d="M50 65L32 58" stroke="#3A533E" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Icon + Action Title + Confidence Badge */}
          <div className="md:col-span-5 flex items-center gap-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${currentMeta.iconBg}`}>
              <MainIcon className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#5A6E60] block leading-tight">
                Recommended
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-extrabold text-[#1F2E24] tracking-tight">
                {currentMeta.title}
              </h2>
              <span className="inline-block px-3 py-1 rounded-full bg-[#E8F0EA] border border-[#B8D1BE] text-[11px] font-bold text-[#344A37]">
                {data.confidence || 'High'} Confidence
              </span>
            </div>
          </div>

          {/* Right Column: Why Explanation */}
          <div className="md:col-span-7 space-y-2 pr-6">
            <h3 className="text-sm font-bold text-[#1F2E24]">
              Why?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed">
              {Array.isArray(data.why_points) ? data.why_points.join(' ') : data.why_points}
            </p>
          </div>

        </div>
      </div>

      {/* OTHER OPTIONS SECTION */}
      <div className="space-y-4 pt-2">
        <div className="text-center">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#5A6E60]">
            OTHER OPTIONS
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alternativesList.map((alt, idx) => {
            const altAction = (alt.action || alt.title || '').toUpperCase();
            const meta = actionMeta[altAction] || actionMeta.REUSE;
            const AltIcon = meta.icon;

            return (
              <div
                key={idx}
                onClick={() => onSwitchAction && onSwitchAction(altAction)}
                className="glass-card rounded-2xl p-5 cursor-pointer flex flex-col items-center text-center space-y-3 hover:scale-[1.02] border border-white/80 transition-all group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-subtle ${meta.badgeColor}`}>
                  <AltIcon className="w-5 h-5 stroke-[2]" />
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold tracking-wider text-[#1F2E24] mb-1">
                    {altAction}
                  </h4>
                  <p className="text-[11px] text-[#5A6E60] leading-relaxed">
                    {alt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
        <button
          onClick={onExploreUpcycling}
          className="px-8 py-3.5 rounded-full bg-[#527557] hover:bg-[#436247] text-white font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>Get AI Upcycling Ideas</span>
          <Sparkles className="w-4 h-4" />
        </button>

        <button
          onClick={onAnalyzeAnother}
          className="px-8 py-3.5 rounded-full glass-panel bg-white/70 hover:bg-white text-[#1F2E24] font-medium text-sm sm:text-base border border-white shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Analyze Another Item</span>
          <RefreshCw className="w-4 h-4 text-[#5A6E60]" />
        </button>
      </div>

    </div>
  );
}
