import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../api';
import { Service } from '../types';

interface CallbackFormProps {
  compact?: boolean;
  services?: Service[];
  onSuccess?: () => void;
}

export default function CallbackForm({ compact = false, services = [], onSuccess }: CallbackFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gccCountry: '+971',
    service: 'ultrasonic-cleaning',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [submitError, setSubmitError] = useState('');

  const gccCountries = [
    { code: '+971', name: 'UAE 🇦🇪' },
    { code: '+966', name: 'KSA 🇸🇦' },
    { code: '+965', name: 'KWT 🇰🇼' },
    { code: '+974', name: 'QAT 🇶🇦' },
    { code: '+973', name: 'BAH 🇧🇭' },
    { code: '+968', name: 'OMN 🇴🇲' },
  ];

  const serviceOptions = services.length
    ? services.map((service) => ({ value: service.id, label: service.title }))
    : [
        { value: 'ultrasonic-cleaning', label: 'Ultrasonic Cleaning Systems' },
        { value: 'polymer-barriers', label: 'Polymer Bumper Barriers' },
        { value: 'industrial-coatings', label: 'Industrial Protection Coatings' },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await api.createCallback({
        name: formData.name,
        full_name: formData.name || 'Callback Request',
        gccCountry: formData.gccCountry,
        phone: `${formData.gccCountry} ${formData.phone}`.trim(),
        email: formData.email,
        service: formData.service,
      });
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to request callback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldBase = "w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all duration-200";

  return (
    <div className={`relative ${compact ? 'p-0.5' : ''}`} id="callback-form-container">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {/* Non-compact title */}
            {!compact && (
              <div className="mb-2">
                <h3 className="text-xl font-display font-bold text-white tracking-tight mb-1">
                  Request a Quick Callback
                </h3>
                <p className="text-sm text-slate-400">
                  Drop your number and a specialist will call you within 15 minutes.
                </p>
              </div>
            )}

            {/* Phone number */}
            <div>
              <label htmlFor="cb-phone" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-brand-orange">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-shrink-0">
                  <select
                    value={formData.gccCountry}
                    onChange={(e) => setFormData({ ...formData, gccCountry: e.target.value })}
                    className="h-full px-3 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 focus:outline-none focus:border-brand-orange transition-all duration-200 cursor-pointer appearance-none pr-7"
                  >
                    {gccCountries.map((c) => (
                      <option key={c.code} value={c.code} className="bg-slate-900 text-slate-200">
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">▼</span>
                </div>
                <input
                  id="cb-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="52 5060 253"
                  className={`${fieldBase} flex-1 min-w-0`}
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="cb-name" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                id="cb-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Eng. Abdullah"
                className={fieldBase}
              />
            </div>

            {/* Business Email */}
            <div>
              <label htmlFor="cb-email" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Business Email
              </label>
              <input
                id="cb-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                className={fieldBase}
              />
            </div>

            {/* Interested Service */}
            <div>
              <label htmlFor="cb-service" className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Interested Service
              </label>
              <div className="relative">
                <select
                  id="cb-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900/60 border border-slate-700 rounded-xl text-sm font-semibold text-slate-300 focus:outline-none focus:border-brand-orange transition-all duration-200 cursor-pointer appearance-none pr-8"
                >
                  {serviceOptions.map((service) => (
                    <option key={service.value} value={service.value}>{service.label}</option>
                  ))}
                  <option value="general">General Consultation</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[9px]">▼</span>
              </div>
            </div>

            {submitError && (
              <p className="text-xs font-semibold text-red-300 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">
                {submitError}
              </p>
            )}

            {/* Submit — always visible, sticky to bottom */}
            <div className="pt-1">
              <button
                id="submit-callback-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-orange hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl text-sm tracking-wider uppercase transition-all duration-300 shadow-md shadow-brand-orange/20 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin flex-shrink-0" size={15} />
                    <span>Processing…</span>
                  </>
                ) : (
                  <>
                    <Phone size={15} className="group-hover:animate-bounce flex-shrink-0" />
                    <span>Request Free Callback</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 px-3"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-400 mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="text-base font-display font-bold text-white tracking-tight mb-2">Callback Scheduled!</h4>
            <p className="text-sm leading-relaxed text-slate-300 max-w-xs mx-auto mb-5">
              Our specialist will call{' '}
              <span className="text-brand-blue font-semibold">{formData.gccCountry} {formData.phone}</span> within 15 minutes.
              {formData.name && <> Thanks, <span className="text-brand-orange font-bold">{formData.name}</span>.</>}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-sm transition-colors border border-slate-700"
            >
              Request Another Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
