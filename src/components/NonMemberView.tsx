import React from 'react';
import { ArrowLeft, ExternalLink, Heart, Compass, BookOpen } from 'lucide-react';

interface NonMemberViewProps {
  mentorName: string;
  communityName: string;
  joinUrl: string;
  onGoBack: () => void;
  onProceedAnyway: () => void;
}

export const NonMemberView: React.FC<NonMemberViewProps> = ({
  mentorName,
  communityName,
  joinUrl,
  onGoBack,
  onProceedAnyway
}) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-3.5 sm:px-4 py-6 sm:py-12">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-100/50 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative w-full max-w-xl mx-auto">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-9 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
          {/* Community Banner */}
          <div className="rounded-xl overflow-hidden border border-rose-100 bg-gradient-to-br from-rose-50/80 via-amber-50/40 to-slate-50 p-5 sm:p-7 mb-6 text-center relative">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-rose-200 text-rose-600 shadow-2xs mb-3">
              <Heart className="w-5 h-5 fill-rose-100 shrink-0" />
            </div>
            <h2 className="text-lg sm:text-xl font-serif text-slate-900 tracking-tight mb-1.5 font-bold">
              The {communityName} Community
            </h2>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              A private digital sangha dedicated to emotional depth, conscious relationships, mindfulness, and personal transformation.
            </p>
          </div>

          {/* Section Kicker */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2">
            <span>Membership Verification</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif text-slate-900 leading-snug tracking-tight mb-3">
            Reserved exclusively for {communityName} members.
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
            These private 1-on-1 relationship breakthrough sessions with <strong className="text-slate-900 font-semibold">{mentorName} (Aditya Sir)</strong> are deeply intimate, sacred containers. To ensure ongoing emotional support and sustained integration, sessions are reserved exclusively for members of our community.
          </p>

          {/* Value Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <Compass className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Direct Mentorship Access</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">Priority scheduling for 1-on-1 relationship clarity calls.</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900">Conscious Love Masterclasses</div>
                <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">Weekly wisdom on attachment healing and emotional sovereignty.</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={joinUrl || 'https://join.monkhoodclub.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 p-3.5 text-sm sm:text-base font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-xl transition-all shadow-md active:scale-[0.98] select-none touch-manipulation"
            >
              <span>Join the {communityName} Community</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
              <button
                type="button"
                onClick={onGoBack}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 transition-colors cursor-pointer select-none touch-manipulation"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>← Back to Overview</span>
              </button>

              <button
                type="button"
                onClick={onProceedAnyway}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-rose-700 hover:text-rose-800 transition-colors cursor-pointer select-none touch-manipulation"
              >
                <span>Joined recently? Fill Form →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
