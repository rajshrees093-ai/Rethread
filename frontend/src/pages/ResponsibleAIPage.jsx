import React from 'react';
import { Shield, Eye, Lock, Scale, AlertTriangle, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function ResponsibleAIPage() {
  const principles = [
    {
      title: 'FAIRNESS',
      subtitle: 'Inclusive & Accessible Choices',
      description: 'Recommendations should avoid assumptions and consider that users have diverse economic circumstances, access to repair tools, tailoring skills, or local donation and recycling services.',
      icon: Scale,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'TRANSPARENCY',
      subtitle: 'Observable Rationale',
      description: 'ReThread explicitly explains WHY an option is suggested using plain-language points based strictly on observable inputs, rather than black-box labels.',
      icon: Eye,
      color: 'bg-sky-50 text-sky-700 border-sky-200'
    },
    {
      title: 'PRIVACY',
      subtitle: 'Data Minimization & Ephemeral Analysis',
      description: 'Only necessary information is collected. Uploaded images are processed in volatile memory and are never stored, logged, or used for AI model training.',
      icon: Lock,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'ETHICS',
      subtitle: 'Human-Centered Decision Support',
      description: 'AI recommendations are helpful suggestions—not mandatory directives. Users retain complete agency to evaluate their own needs and local environmental facilities.',
      icon: Shield,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill bg-white/70 text-xs font-semibold text-sage-800">
          <Shield className="w-3.5 h-3.5 text-sage-600" />
          <span>Ethics & Governance</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-dark">
          Responsible AI Framework
        </h1>
        <p className="text-sm sm:text-base text-forest-muted">
          Our commitment to ethical, transparent, and human-centric artificial intelligence for sustainability.
        </p>
      </div>

      {/* 4 Core Responsible AI Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((p, idx) => {
          const IconComp = p.icon;
          return (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 border border-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sage-700">
                  {p.subtitle}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-forest-dark mb-2">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-forest-muted leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Limitations & Human Agency Disclaimer */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white bg-amber-50/40 space-y-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-forest-dark mb-1">
              Important Disclaimer & Limitations
            </h4>
            <p className="text-xs sm:text-sm text-forest-charcoal/90 leading-relaxed">
              AI recommendations depend strictly on the information provided by the user and visual estimates from uploaded photos. They may not capture internal fiber wear, structural fatigue, or localized facility acceptance rules. ReThread is intended solely as an advisory decision-support tool. Always inspect garments directly and consult local recycling or donation guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Pledge Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white space-y-3 bg-white/80">
        <h3 className="text-sm font-bold uppercase tracking-wider text-forest-dark flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Our Privacy & Data Guarantee
        </h3>
        <p className="text-xs sm:text-sm text-forest-muted leading-relaxed">
          ReThread does not create user profiles, does not track biometric or facial data from clothing photos, and does not retain submitted images on permanent storage. All multimodal inference executes ephemerally during your session.
        </p>
      </div>

    </div>
  );
}
