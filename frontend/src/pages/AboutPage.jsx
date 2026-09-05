import React from 'react';
import { 
  Heart, Globe2, Sparkles, Users, Compass, 
  Layers, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function AboutPage({ setActivePage }) {
  const projectJourney = [
    {
      step: '01',
      title: 'Problem Identification',
      desc: 'Recognizing rapid textile disposal and premature garment discard habits in everyday households.'
    },
    {
      step: '02',
      title: 'SDG Alignment',
      desc: 'Anchoring the mission firmly into United Nations SDG 12: Responsible Consumption & Production.'
    },
    {
      step: '03',
      title: 'AI Role & Ideation',
      desc: 'Scoping AI as a transparent decision-support guide for classification, condition assessment, and upcycling ideas.'
    },
    {
      step: '04',
      title: 'Design Thinking',
      desc: 'Crafting a calm, accessible, glassmorphic UI tailored for students and young consumers.'
    },
    {
      step: '05',
      title: 'Prototype & Testing',
      desc: 'Engineering dual multimodal vision & deterministic fallback logic for reliable zero-crash evaluation.'
    },
    {
      step: '06',
      title: 'Impact & Evaluation',
      desc: 'Formulating qualitative circular impact indicators that measure textile lifespan extension.'
    },
    {
      step: '07',
      title: 'Responsible AI & Ethics',
      desc: 'Implementing strict privacy (zero image retention), observable explanations, and fairness standards.'
    }
  ];

  const targetUsers = [
    {
      group: 'Students & College Youths',
      need: 'Budget-friendly DIY upcycling, thrift donation awareness, and sustainable wardrobe habits on campus.'
    },
    {
      group: 'Young Adults & Professionals',
      need: 'Quick decision support when decluttering seasonal wardrobes or dealing with damaged workwear.'
    },
    {
      group: 'Households & Families',
      need: 'Practical ways to handle outgrown children’s clothes, worn towels, or repairable family garments.'
    },
    {
      group: 'General Conscious Consumers',
      need: 'Guidance on local circular fashion practices before considering final municipal waste bins.'
    }
  ];

  const futureScope = [
    'Geolocated local donation center & clothing drop-box discovery',
    'Interactive textile recycling facility locator & fiber lookup',
    'Personal Wardrobe Lifecycle Tracker with longevity milestones',
    'Community garment swapping & peer-to-peer repair circles',
    'Multilingual sustainability decision support for global communities'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill bg-white/70 text-xs font-semibold text-sage-800">
          <span>Project Overview</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-dark">
          About ReThread
        </h1>
        <p className="text-sm sm:text-base text-forest-muted leading-relaxed">
          ReThread is a sustainability-focused decision-support platform that helps people explore better options for clothing they no longer wear.
        </p>
      </div>

      {/* Official Problem Statement Callout Card */}
      <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-sage-300/60 bg-gradient-to-br from-white/90 via-sage-50/50 to-white/90 shadow-glass">
        <span className="text-xs font-bold uppercase tracking-wider text-sage-800 block mb-2">
          Official Project Problem Statement
        </span>
        <blockquote className="font-editorial text-xl sm:text-2xl italic text-forest-dark leading-snug">
          "How might we use AI to help people make sustainable decisions about unwanted clothing so that clothing consumption and disposal can become more sustainable?"
        </blockquote>
      </div>

      {/* Core Attributes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-3xl p-6 space-y-3 border border-white">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-forest-dark">Primary SDG Alignment</h3>
          <p className="text-xs text-forest-muted leading-relaxed">
            <strong className="text-forest-dark font-semibold">SDG 12:</strong> Responsible Consumption and Production. Promoting circular textile lifecycles.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3 border border-white">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-forest-dark">Strategic Focus</h3>
          <p className="text-xs text-forest-muted leading-relaxed">
            Sustainable clothing reuse, mending, responsible donation, creative upcycling, and proper textile recycling.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 space-y-3 border border-white">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-forest-dark">AI Capabilities</h3>
          <p className="text-xs text-forest-muted leading-relaxed">
            Multimodal classification, condition assessment, explainable recommendations, and conversational sustainability support.
          </p>
        </div>
      </div>

      {/* 7-Stage Project Journey Timeline */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-dark">
            Project Journey & Development
          </h2>
          <p className="text-xs sm:text-sm text-forest-muted">
            The end-to-end engineering, research, and design process behind ReThread.
          </p>
        </div>

        <div className="space-y-3">
          {projectJourney.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 border border-white"
            >
              <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-800 font-editorial font-extrabold flex items-center justify-center flex-shrink-0 text-lg">
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-forest-dark mb-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-forest-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Users */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-dark">
            Who ReThread Is Built For
          </h2>
          <p className="text-xs sm:text-sm text-forest-muted">
            Designed to feel approachable, clear, and actionable for all consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {targetUsers.map((u, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 border border-white space-y-1.5">
              <h4 className="text-sm font-bold text-forest-dark flex items-center gap-2">
                <Users className="w-4 h-4 text-sage-600" />
                {u.group}
              </h4>
              <p className="text-xs text-forest-muted leading-relaxed">
                {u.need}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap / Future Scope */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-forest-dark">
          Future Scope & Possibilities
        </h3>
        <p className="text-xs text-forest-muted mb-3">
          Future developments envisioned for expanding the ReThread ecosystem:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {futureScope.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-forest-charcoal bg-white/70 p-3 rounded-xl border border-forest-muted/10">
              <ChevronRight className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
