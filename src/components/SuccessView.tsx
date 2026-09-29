import React, { useEffect, useState } from 'react';
import { Submission, FunnelConfig } from '../types';
import { Calendar, Clock, Mail, Phone, ExternalLink, Heart, ArrowRight } from 'lucide-react';

interface SuccessViewProps {
  submission: Submission | null;
  config: FunnelConfig;
  onReset: () => void;
  onOpenAdmin: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  submission,
  config,
  onReset,
}) => {
  const [countdown, setCountdown] = useState(2);
  const checkoutUrl = config.checkoutUrl || 'https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf';

  useEffect(() => {
    if (!checkoutUrl) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          try {
            if (window.top && window.top !== window) {
              window.top.location.href = checkoutUrl;
            } else {
              window.location.href = checkoutUrl;
            }
          } catch {
            window.location.href = checkoutUrl;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [checkoutUrl]);
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-3.5 sm:px-4 py-6 sm:py-12">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-rose-100/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-9 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
          {/* Success Icon */}
          <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-6 shadow-xs">
            <Heart className="w-7 h-7 fill-rose-100 stroke-[2.2]" />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-widest mb-2">
            <span>Relationship Application Received</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif text-slate-900 tracking-tight leading-snug mb-3">
            Your 1-on-1 relationship session application has been received, {submission?.fullName || 'there'}.
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            Thank you for opening up and sharing your relationship story with <strong className="text-slate-900 font-medium">{config.mentorName} (Aditya Sir)</strong>. Your answers are encrypted and held in strict sacred confidence.
          </p>

          {/* Submission Details Card */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 mb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-xs">
              <span className="text-slate-500">Application Reference ID:</span>
              <span className="font-mono text-rose-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs font-semibold">
                {submission?.id || 'REL-101'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Format: {config.sessionDuration} Private Video Call</span>
              </div>
              {submission?.preferredSlot ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Slot: {submission.preferredSlot}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Scheduling: Coordinated via WhatsApp</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="truncate">{submission?.email || 'Registered Email'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{submission?.phone || 'Provided Number'}</span>
              </div>
            </div>
          </div>

          {/* Next Steps RoadMap */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Preparation & Next Steps:
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Personal Case Review:</strong> Aditya Sir will personally review your answers to pinpoint the underlying attachment dynamics and communication bottlenecks.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Private Calendar Lock:</strong> You will receive a direct WhatsApp message and calendar invite with the confidential Google Meet link.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Pre-Call Reflection:</strong> Take 10 quiet minutes before our call to write down the top 3 recurring moments of emotional disconnect in your relationship.
                </div>
              </div>
            </div>
          </div>

          {/* Action Button: Checkout / Booking lock */}
          <div className="space-y-3">
            <a
              href={checkoutUrl}
              className="w-full p-4 text-sm sm:text-base font-semibold text-white bg-rose-700 hover:bg-rose-800 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>
                {countdown > 0
                  ? `Redirecting to Checkout in ${countdown}s... Click here to go now`
                  : 'Proceed to Monkhood Checkout →'}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onReset}
                className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                ← Submit another response / Start over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
