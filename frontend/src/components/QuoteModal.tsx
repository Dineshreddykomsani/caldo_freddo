import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, FileText, Loader2, Sparkles } from 'lucide-react';
import { api } from '../api';
import { Service } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  preselectedServiceId?: string;
  preselectedProductName?: string;
}

export default function QuoteModal({ isOpen, onClose, services, preselectedServiceId, preselectedProductName }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    service: 'ultrasonic-cleaning', location: 'Dubai', requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData(p => ({ ...p, service: preselectedServiceId, requirements: '' }));
    } else if (preselectedProductName) {
      setFormData(p => ({
        ...p,
        service: 'general',
        requirements: `Inquiry regarding: ${preselectedProductName}\n\nPlease provide corporate pricing, technical specifications, and delivery lead time for UAE & GCC.`
      }));
    } else {
      setFormData(p => ({ ...p, service: 'general', requirements: '' }));
    }
  }, [preselectedServiceId, preselectedProductName, isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await api.createQuote({
        name: formData.name,
        full_name: formData.name,
        company: formData.company,
        company_name: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        location: formData.location,
        requirements: formData.requirements,
        project_details: formData.requirements || `Quote request for ${formData.service} in ${formData.location}.`,
      });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit quote request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const uaeLocations = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
    'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain',
    'Kingdom of Saudi Arabia (KSA)', 'Other GCC Countries',
  ];

  /* Shared field style — consistent, mobile-safe */
  const field = "w-full px-3 sm:px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        /* Full-screen scroll container */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#030b16]/88 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative bg-white border border-slate-100 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 my-4"
          >
            {/* Header */}
            <div className="bg-[#0a1d30] px-5 sm:px-6 py-5 sm:py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="flex items-center gap-3 mb-1.5">
                <div className="p-2 bg-brand-orange rounded-lg flex-shrink-0">
                  <FileText size={16} className="text-white" />
                </div>
                <h3 id="quote-modal-title" className="text-lg sm:text-xl font-display font-bold tracking-tight pr-8">
                  Request Commercial Quote
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-snug">
                Partner with Caldo Freddo, Jeser Al Arab General Trading LLC.
              </p>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Row 1: Name + Company — stacks on mobile */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name *</label>
                        <input
                          type="text" required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Salem Al-Mansoori"
                          className={field}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Company Name *</label>
                        <input
                          type="text" required
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Emirates Precision LLC"
                          className={field}
                        />
                      </div>
                    </div>

                    {/* Row 2: Email + Phone */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Corporate Email *</label>
                        <input
                          type="email" required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className={field}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Direct Contact *</label>
                        <input
                          type="tel" required
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 XXX XXXX"
                          className={field}
                        />
                      </div>
                    </div>

                    {/* Row 3: Service + Location */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Required Solution</label>
                        <select
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className={`${field} cursor-pointer`}
                        >
                          {services.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                          <option value="general">General Industrial Query</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Facility Location</label>
                        <select
                          value={formData.location}
                          onChange={e => setFormData({ ...formData, location: e.target.value })}
                          className={`${field} cursor-pointer`}
                        >
                          {uaeLocations.map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Project Scope or Parts Dimensions</label>
                      <textarea
                        value={formData.requirements}
                        onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                        rows={3}
                        placeholder="Please detail component dimensions, forklift traffic density, or operating conditions..."
                        className={`${field} resize-none`}
                      />
                    </div>

                    {/* Submit */}
                    {submitError && (
                      <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 sm:py-3.5 bg-[#0a1d30] hover:bg-slate-900 disabled:bg-slate-300 disabled:text-slate-500 text-white font-bold rounded-xl text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin flex-shrink-0" size={14} />
                          <span>Generating Secure Request…</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                          <span>Submit for Engineer Review</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 sm:py-10"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl text-emerald-500 border border-emerald-200 mb-5">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-xl font-display font-bold text-[#0a1d30] tracking-tight mb-2 flex items-center justify-center gap-2">
                      <Sparkles className="text-brand-orange" size={18} />
                      RFQ Successfully Logged!
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600 max-w-sm mx-auto mb-6">
                      Thank you, <span className="text-[#0a1d30] font-bold">{formData.name}</span>. A commercial quotation for{' '}
                      <span className="text-brand-orange font-semibold">
                        {services.find(s => s.id === formData.service)?.title || preselectedProductName || 'your request'}
                      </span>{' '}
                      is being prepared for <span className="text-[#0a1d30] font-semibold">{formData.company}</span>.
                      <br /><br />
                      Our technical department will reach out within 2 business hours.
                    </p>
                    <div className="flex flex-col xs:flex-row justify-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 bg-[#0a1d30] hover:bg-slate-900 text-white font-semibold rounded-xl text-sm transition-colors"
                      >
                        Back to Home
                      </button>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
                      >
                        Edit Details
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
