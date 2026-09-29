import React, { useState } from 'react';
import { FormQuestions } from '../types';
import { ShieldCheck, Check, Heart, AlertCircle, ArrowRight, Loader2, Lock, ArrowLeft } from 'lucide-react';

interface MemberFormViewProps {
  mentorName: string;
  communityName: string;
  onSubmit: (formData: FormQuestions) => void;
  isSubmitting: boolean;
  onGoBack?: () => void;
}

export const MemberFormView: React.FC<MemberFormViewProps> = ({
  mentorName,
  communityName,
  onSubmit,
  isSubmitting,
  onGoBack,
}) => {
  const [formData, setFormData] = useState<FormQuestions>({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    location: '',
    currentJourney: '',
    breakthroughArea: '',
    untappedPotential: '',
    readyForDirection: '',
    committedToRoadmap: '',
    investEnergy: '',
    whyMentor: '',
    breakthroughVision: '',
  });

  const [customOther, setCustomOther] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FormQuestions, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSelectOption = (field: keyof FormQuestions, option: string, isOther = false) => {
    if (isOther) {
      const currentCustom = customOther[field] || '';
      updateField(field, currentCustom.trim() ? `Other: ${currentCustom.trim()}` : 'Other');
    } else {
      updateField(field, option);
    }
  };

  const handleCustomOtherChange = (field: keyof FormQuestions, text: string) => {
    setCustomOther(prev => ({ ...prev, [field]: text }));
    updateField(field, text.trim() ? `Other: ${text.trim()}` : 'Other');
  };

  const requiredFields: (keyof FormQuestions)[] = [
    'fullName',
    'email',
    'phone',
    'gender',
    'location',
    'currentJourney',
    'breakthroughArea',
    'untappedPotential',
    'readyForDirection',
    'committedToRoadmap',
    'investEnergy',
    'whyMentor',
    'breakthroughVision'
  ];

  const completedCount = requiredFields.filter(f => Boolean(formData[f]?.trim())).length;
  const progressPercent = Math.round((completedCount / requiredFields.length) * 100);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      newErrors.phone = 'Please enter your WhatsApp number for call coordination.';
    }
    if (!formData.gender.trim()) newErrors.gender = 'Please select your age & gender group.';
    if (!formData.location.trim()) newErrors.location = 'Please share your city & living setup.';
    if (!formData.currentJourney.trim()) newErrors.currentJourney = 'Please select your current situation.';
    if (!formData.breakthroughArea.trim()) newErrors.breakthroughArea = 'Please select what hurts most during fights.';
    if (!formData.untappedPotential.trim()) newErrors.untappedPotential = 'Please select how long this has been going on.';
    if (!formData.readyForDirection.trim()) newErrors.readyForDirection = 'Please select your past experience trying to fix it.';
    if (!formData.committedToRoadmap.trim()) newErrors.committedToRoadmap = 'Please select your biggest fear if nothing changes.';
    if (!formData.investEnergy.trim()) newErrors.investEnergy = 'Please confirm your openness to find solutions.';
    if (!formData.whyMentor.trim() || formData.whyMentor.trim().length < 3) {
      newErrors.whyMentor = "Please share a brief note on why you're seeking Aditya Sir's guidance.";
    }
    if (!formData.breakthroughVision.trim() || formData.breakthroughVision.trim().length < 5) {
      newErrors.breakthroughVision = 'Please share the main issue you want clarity on during the call.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const input = el.querySelector('input, textarea') as HTMLElement;
        if (input) input.focus();
      }
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 sm:py-8">
      {/* Sticky Mobile Progress Hairline */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200/80 mb-5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          {onGoBack && (
            <button
              type="button"
              onClick={onGoBack}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors py-1 pr-2 border-r border-slate-200 cursor-pointer select-none touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <span className="font-bold text-slate-900">{completedCount} of 13</span>
            <span className="text-slate-500 hidden xs:inline">answered</span>
            <span className="text-slate-300">·</span>
            <span className="text-rose-700 font-bold tabular-nums">{progressPercent}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-24 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-rose-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hero Header Card - Mobile First */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 mb-5 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-2">
          <Heart className="w-3.5 h-3.5 fill-rose-100 text-rose-600 shrink-0" />
          <span>{communityName} Mentorship</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-serif text-slate-900 tracking-tight leading-snug mb-2">
          1-on-1 Relationship Mentorship with {mentorName}
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
          A private, 100% confidential session with Aditya Sir to break negative conflict loops, stop silent treatments, and regain emotional clarity. Answer these questions so Aditya Sir can review your situation before the call.
        </p>

        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="text-slate-800 font-medium">100% Confidential</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Direct 1-on-1 with Aditya Sir</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>Private Action Plan</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Q01: Full Name */}
        <div
          id="field-fullName"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.fullName ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="fullName" className="text-sm font-semibold text-slate-900 block mb-1.5">
            01. Full Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={e => updateField('fullName', e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xs"
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Q02: Email Address */}
        <div
          id="field-email"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.email ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="email" className="text-sm font-semibold text-slate-900 block mb-1.5">
            02. Email Address <span className="text-rose-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            placeholder="name@example.com (For your Google Meet invite)"
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xs"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Q03: WhatsApp Number */}
        <div
          id="field-phone"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.phone ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="phone" className="text-sm font-semibold text-slate-900 block mb-1.5">
            03. WhatsApp Number <span className="text-rose-600">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={e => updateField('phone', e.target.value)}
            placeholder="+91 98765 43210 (For calendar confirmation)"
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xs"
          />
          {errors.phone && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Q04: Gender & Age Group */}
        <div
          id="field-gender"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.gender ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            04. Gender & Age Group <span className="text-rose-600">*</span>
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              'Female · 20s',
              'Female · 30s+',
              'Male · 20s',
              'Male · 30s+'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('gender', option)}
                className={`min-h-[48px] p-3 rounded-xl border text-sm text-center font-medium cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation flex items-center justify-center ${
                  formData.gender === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Other option */}
          <div className="mt-2.5">
            <button
              type="button"
              onClick={() => handleSelectOption('gender', 'Other', true)}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-left cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.gender?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-500 font-medium'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              Other / Prefer to type
            </button>
            {formData.gender?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="Specify your gender / age..."
                value={customOther.gender || ''}
                onChange={e => handleCustomOtherChange('gender', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>

          {errors.gender && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.gender}</span>
            </p>
          )}
        </div>

        {/* Q05: City & Living Setup */}
        <div
          id="field-location"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.location ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="location" className="text-sm font-semibold text-slate-900 block mb-1.5">
            05. City & Living Setup <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={e => updateField('location', e.target.value)}
            placeholder="e.g. Mumbai (Nuclear setup) / Delhi (Joint family) / Pune"
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xs"
          />
          {errors.location && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.location}</span>
            </p>
          )}
        </div>

        {/* Q06: Current Relationship Reality */}
        <div
          id="field-currentJourney"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.currentJourney ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            06. What best describes your relationship right now? <span className="text-rose-600">*</span>
          </span>
          <div className="space-y-2">
            {[
              'Together, but living like roommates (Zero spark or warmth)',
              'Frequent fights & long silent treatments',
              'One partner overthinks & begs; the other partner shuts down',
              'Family or in-law interference causing constant friction',
              'At a painful crossroads or breakup phase'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('currentJourney', option)}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                  formData.currentJourney === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                <span className="leading-snug pr-2">{option}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.currentJourney === option ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {formData.currentJourney === option && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </button>
            ))}

            {/* Other option */}
            <button
              type="button"
              onClick={() => handleSelectOption('currentJourney', 'Other', true)}
              className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.currentJourney?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              <span>Other (Type your own situation)</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                formData.currentJourney?.startsWith('Other') ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {formData.currentJourney?.startsWith('Other') && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
            </button>
            {formData.currentJourney?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="Briefly describe your relationship situation..."
                value={customOther.currentJourney || ''}
                onChange={e => handleCustomOtherChange('currentJourney', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>
          {errors.currentJourney && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.currentJourney}</span>
            </p>
          )}
        </div>

        {/* Q07: Conflict Trigger */}
        <div
          id="field-breakthroughArea"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.breakthroughArea ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            07. During fights, what hurts the most? <span className="text-rose-600">*</span>
          </span>
          <div className="space-y-2">
            {[
              'Silent treatment / Stonewalling for days',
              'Yelling & bringing up past mistakes',
              'Emotional invalidation ("You\'re overreacting / dramatic")',
              'Lack of affection, intimacy, or care'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('breakthroughArea', option)}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                  formData.breakthroughArea === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                <span className="leading-snug pr-2">{option}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.breakthroughArea === option ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {formData.breakthroughArea === option && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </button>
            ))}

            {/* Other option */}
            <button
              type="button"
              onClick={() => handleSelectOption('breakthroughArea', 'Other', true)}
              className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.breakthroughArea?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              <span>Other (Type your own trigger)</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                formData.breakthroughArea?.startsWith('Other') ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {formData.breakthroughArea?.startsWith('Other') && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
            </button>
            {formData.breakthroughArea?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="What trigger hurts the most in your fights?"
                value={customOther.breakthroughArea || ''}
                onChange={e => handleCustomOtherChange('breakthroughArea', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>
          {errors.breakthroughArea && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.breakthroughArea}</span>
            </p>
          )}
        </div>

        {/* Q08: Duration */}
        <div
          id="field-untappedPotential"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.untappedPotential ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            08. How long has this pattern been repeating? <span className="text-rose-600">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              '1 to 3 months',
              '6 months to 1 year',
              '1 to 3+ years'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('untappedPotential', option)}
                className={`min-h-[48px] p-3 rounded-xl border text-sm text-center font-medium cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation flex items-center justify-center ${
                  formData.untappedPotential === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Other option */}
          <div className="mt-2.5">
            <button
              type="button"
              onClick={() => handleSelectOption('untappedPotential', 'Other', true)}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-left cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.untappedPotential?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-500 font-medium'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              Other / Across multiple relationships
            </button>
            {formData.untappedPotential?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="Specify how long..."
                value={customOther.untappedPotential || ''}
                onChange={e => handleCustomOtherChange('untappedPotential', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>

          {errors.untappedPotential && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.untappedPotential}</span>
            </p>
          )}
        </div>

        {/* Q09: Past Attempts */}
        <div
          id="field-readyForDirection"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.readyForDirection ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            09. Have you tried fixing this without success? <span className="text-rose-600">*</span>
          </span>
          <div className="space-y-2">
            {[
              'Yes — Reels & advice sound good, but emotions take over in fights',
              'Yes — We talk in circles, so we need a neutral mentor',
              'No — I usually stay quiet to avoid bigger arguments'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('readyForDirection', option)}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                  formData.readyForDirection === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                <span className="leading-snug pr-2">{option}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.readyForDirection === option ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {formData.readyForDirection === option && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </button>
            ))}

            {/* Other option */}
            <button
              type="button"
              onClick={() => handleSelectOption('readyForDirection', 'Other', true)}
              className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.readyForDirection?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              <span>Other (Type your own experience)</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                formData.readyForDirection?.startsWith('Other') ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {formData.readyForDirection?.startsWith('Other') && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
            </button>
            {formData.readyForDirection?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="Share your experience..."
                value={customOther.readyForDirection || ''}
                onChange={e => handleCustomOtherChange('readyForDirection', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>
          {errors.readyForDirection && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.readyForDirection}</span>
            </p>
          )}
        </div>

        {/* Q10: Deepest Fear */}
        <div
          id="field-committedToRoadmap"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.committedToRoadmap ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            10. If nothing changes in 6–12 months, what is your biggest fear? <span className="text-rose-600">*</span>
          </span>
          <div className="space-y-2">
            {[
              'Permanent bitterness or breakup / divorce',
              'Losing my peace, confidence, and happiness',
              'Living in a cold, compromise marriage forever'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('committedToRoadmap', option)}
                className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                  formData.committedToRoadmap === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                <span className="leading-snug pr-2">{option}</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  formData.committedToRoadmap === option ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {formData.committedToRoadmap === option && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
              </button>
            ))}

            {/* Other option */}
            <button
              type="button"
              onClick={() => handleSelectOption('committedToRoadmap', 'Other', true)}
              className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-xl border text-sm text-left flex items-center justify-between cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.committedToRoadmap?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              <span>Other (Type your biggest fear)</span>
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                formData.committedToRoadmap?.startsWith('Other') ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
              }`}>
                {formData.committedToRoadmap?.startsWith('Other') && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </span>
            </button>
            {formData.committedToRoadmap?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="What is your biggest fear?"
                value={customOther.committedToRoadmap || ''}
                onChange={e => handleCustomOtherChange('committedToRoadmap', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>
          {errors.committedToRoadmap && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.committedToRoadmap}</span>
            </p>
          )}
        </div>

        {/* Q11: Readiness */}
        <div
          id="field-investEnergy"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.investEnergy ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <span className="text-sm font-semibold text-slate-900 block mb-2.5">
            11. Are you ready to drop the blame game and look at solutions with an open heart? <span className="text-rose-600">*</span>
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Yes, 100% ready',
              'Yes, nervous but genuinely need help'
            ].map(option => (
              <button
                type="button"
                key={option}
                onClick={() => handleSelectOption('investEnergy', option)}
                className={`min-h-[48px] p-3 rounded-xl border text-sm text-center font-medium cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation flex items-center justify-center ${
                  formData.investEnergy === option
                    ? 'border-rose-600 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-500'
                    : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Other option */}
          <div className="mt-2.5">
            <button
              type="button"
              onClick={() => handleSelectOption('investEnergy', 'Other', true)}
              className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-left cursor-pointer transition-all active:scale-[0.99] select-none touch-manipulation ${
                formData.investEnergy?.startsWith('Other')
                  ? 'border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-500 font-medium'
                  : 'border-slate-200 bg-slate-50/70 hover:bg-rose-50/40 text-slate-600'
              }`}
            >
              Other
            </button>
            {formData.investEnergy?.startsWith('Other') && (
              <input
                type="text"
                autoFocus
                placeholder="Share your thoughts..."
                value={customOther.investEnergy || ''}
                onChange={e => handleCustomOtherChange('investEnergy', e.target.value)}
                className="w-full mt-2 bg-white border border-rose-300 focus:border-rose-600 rounded-xl px-4 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            )}
          </div>

          {errors.investEnergy && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.investEnergy}</span>
            </p>
          )}
        </div>

        {/* Q12: Why Aditya Sir */}
        <div
          id="field-whyMentor"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.whyMentor ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="whyMentor" className="text-sm font-semibold text-slate-900 block mb-1.5">
            12. Why do you specifically want Aditya Sir’s mentorship? <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            id="whyMentor"
            value={formData.whyMentor}
            onChange={e => updateField('whyMentor', e.target.value)}
            placeholder="e.g. Need honest, non-judgmental guidance without family taking sides..."
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl px-4 py-3 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all shadow-2xs"
          />
          {errors.whyMentor && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.whyMentor}</span>
            </p>
          )}
        </div>

        {/* Q13: Main Issue for Call */}
        <div
          id="field-breakthroughVision"
          className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
            errors.breakthroughVision ? 'border-rose-300 bg-rose-50/30' : 'border-slate-200'
          }`}
        >
          <label htmlFor="breakthroughVision" className="text-sm font-semibold text-slate-900 block mb-1.5">
            13. What is the #1 issue you want to resolve on this 30-min call? <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="breakthroughVision"
            rows={3}
            value={formData.breakthroughVision}
            onChange={e => updateField('breakthroughVision', e.target.value)}
            placeholder="Briefly describe the recent fight, disconnect, or specific clarity you need..."
            className="w-full bg-white border border-slate-300 focus:border-rose-600 rounded-xl p-4 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all leading-relaxed shadow-2xs"
          />
          {errors.breakthroughVision && (
            <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.breakthroughVision}</span>
            </p>
          )}
        </div>

        {/* Submit Container - Mobile Optimized Click and Go */}
        <div className="pt-4 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))]">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[58px] py-4 px-6 text-base sm:text-lg font-bold text-white bg-rose-700 hover:bg-rose-800 active:bg-rose-900 rounded-2xl transition-all shadow-lg shadow-rose-900/15 active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none touch-manipulation"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Opening Slot Booking...</span>
              </>
            ) : (
              <>
                <span>Book My 1-on-1 Slot with Aditya Sir</span>
                <ArrowRight className="w-5 h-5 shrink-0" />
              </>
            )}
          </button>

          <div className="mt-3.5 flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% sacred & confidential. Direct 1-on-1 with Aditya Sir.</span>
          </div>
        </div>
      </form>
    </div>
  );
};
