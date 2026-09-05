import React from 'react';
import { X, Clock, Layers, Sparkles, CheckCircle2, Scissors, ArrowRight } from 'lucide-react';

export default function UpcyclingDetailModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-dark/30 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel bg-white/95 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_0_rgba(70,95,75,0.2)] border border-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-forest-muted/10 hover:bg-forest-muted/20 text-forest-charcoal transition-colors"
          aria-label="Close Project Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
            {project.category || 'Upcycling Project'}
          </span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            project.difficulty === 'Easy' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            Difficulty: {project.difficulty}
          </span>
          <span className="flex items-center gap-1 text-xs text-forest-muted">
            <Clock className="w-3.5 h-3.5" />
            {project.time}
          </span>
        </div>

        {/* Project Title */}
        <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-forest-dark mb-3">
          {project.title}
        </h2>

        {/* Short Description */}
        <p className="text-forest-muted text-sm sm:text-base leading-relaxed mb-6">
          {project.shortDescription}
        </p>

        {/* Sustainability Impact Callout */}
        {project.impactNote && (
          <div className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200/80 mb-6 flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-sage-900 mb-0.5">
                SDG 12 Impact Note
              </h4>
              <p className="text-xs sm:text-sm text-forest-charcoal">
                {project.impactNote}
              </p>
            </div>
          </div>
        )}

        {/* Materials Needed */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest-dark mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-sage-600" />
            Materials Needed
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.materials?.map((mat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-forest-charcoal bg-white/70 p-2.5 rounded-xl border border-forest-muted/10">
                <div className="w-2 h-2 rounded-full bg-sage-500 flex-shrink-0" />
                <span>{mat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest-dark mb-3 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-sage-600" />
            Step-by-Step Guide
          </h3>
          <div className="space-y-3">
            {project.steps?.map((step, idx) => (
              <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-ivory-50/70 border border-forest-muted/10">
                <span className="w-6 h-6 rounded-full bg-sage-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-forest-dark leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-forest-muted/10">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-5 rounded-xl bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium transition-colors text-center shadow-sm"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
}
