import React from 'react';
import { ViewStep } from '../types';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface TopNavProps {
  currentStep: ViewStep;
  onNavigate: (step: ViewStep) => void;
  mentorName: string;
  hasSubmissionsCount?: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentStep,
  onNavigate,
  mentorName,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('gateway')}
          className="flex items-center gap-2.5 text-left cursor-pointer focus:outline-none group select-none touch-manipulation"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-semibold text-xs sm:text-sm shadow-2xs shrink-0 group-hover:bg-rose-100 transition-colors">
            AT
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight group-hover:text-rose-700 transition-colors">
              {mentorName}
            </h1>
            <p className="text-[11px] sm:text-xs text-rose-800 font-medium">
              1-on-1 Relationship Mentorship
            </p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          {currentStep === 'form' && (
            <button
              type="button"
              onClick={() => onNavigate('gateway')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer select-none touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-medium text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="hidden sm:inline">100% Confidential</span>
            <span className="sm:hidden">Confidential</span>
          </div>
        </div>
      </div>
    </header>
  );
};
