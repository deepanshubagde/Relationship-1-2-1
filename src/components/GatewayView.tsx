import React, { useState } from 'react';
import { Heart, ShieldCheck, ArrowRight, Lock, CheckCircle2, Clock, Video, Sparkles } from 'lucide-react';

interface GatewayViewProps {
  mentorName: string;
  communityName: string;
  onSelectMembership: (isMember: boolean) => void;
  onOpenAdmin: () => void;
}

export const GatewayView: React.FC<GatewayViewProps> = ({
  mentorName,
  communityName,
  onSelectMembership,
}) => {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(null);

  const handleSelection = (isMember: boolean) => {
    setSelectedOption(isMember ? 'yes' : 'no');
    setTimeout(() => {
      onSelectMembership(isMember);
    }, 120);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-6 sm:py-12">
      {/* Warm ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-rose-100/50 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Main Overview Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-9 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
          
          {/* Top Brand Monogram & Trust Pill */}
          <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200/80 flex items-center justify-center text-rose-800 font-bold text-base font-serif shadow-2xs shrink-0">
                AT
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 leading-tight">
                  {mentorName}
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Heart className="w-3 h-3 text-rose-500 fill-rose-100 shrink-0" />
                  <span>Conscious Relationship Mentorship</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-1 rounded-full font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Applications Open</span>
            </div>
          </div>

          {/* Section Kicker */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span>Overview & Member Verification</span>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-slate-900 leading-snug tracking-tight mb-3 text-balance">
            Private 1-on-1 Relationship Session with {mentorName}
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
            A sacred, confidential space for deep emotional clarity, resolving recurring argument cycles, stopping multi-day silent treatments, and restoring conscious warmth with your partner.
          </p>

          {/* What This 1-on-1 Includes - Mobile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center sm:flex-col sm:items-start sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">30-Minute Call</div>
                <div className="text-[11px] text-slate-500 leading-tight">Private & focused</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center sm:flex-col sm:items-start sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                <Video className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">1-on-1 Video Session</div>
                <div className="text-[11px] text-slate-500 leading-tight">Direct with Aditya Sir</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center sm:flex-col sm:items-start sm:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-100/80 text-rose-700 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">100% Confidential</div>
                <div className="text-[11px] text-slate-500 leading-tight">Zero judgment guarantee</div>
              </div>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Select your membership status to begin:
            </h2>
          </div>

          {/* Interactive Option Cards */}
          <div className="space-y-3 mb-6" role="group" aria-label="Community Membership Status">
            {/* Yes, I am a member */}
            <button
              type="button"
              onClick={() => handleSelection(true)}
              className={`w-full min-h-[56px] text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between group active:scale-[0.99] select-none touch-manipulation ${
                selectedOption === 'yes'
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-500 shadow-sm'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 hover:border-rose-300 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                  selectedOption === 'yes'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-300 bg-white group-hover:border-rose-400'
                }`}>
                  {selectedOption === 'yes' && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-950 transition-colors">
                    Yes, I am a {communityName} Member
                  </div>
                  <div className="text-xs text-slate-500">
                    Access member intake form & lock your slot
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>

            {/* No, I am not a member */}
            <button
              type="button"
              onClick={() => handleSelection(false)}
              className={`w-full min-h-[56px] text-left p-4 sm:p-5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between group active:scale-[0.99] select-none touch-manipulation ${
                selectedOption === 'no'
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-500 shadow-sm'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 hover:border-rose-300 text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                  selectedOption === 'no'
                    ? 'border-rose-600 bg-rose-600 text-white'
                    : 'border-slate-300 bg-white group-hover:border-rose-400'
                }`}>
                  {selectedOption === 'no' && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-rose-950 transition-colors">
                    No, I am not yet a {communityName} Member
                  </div>
                  <div className="text-xs text-slate-500">
                    Discover how to join {communityName} & get access
                  </div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>
          </div>

          {/* Pillars & Trust Metadata */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Safe Emotional Space</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
