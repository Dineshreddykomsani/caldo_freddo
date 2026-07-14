import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Shield, Droplet, X } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (serviceId: string) => void;
  index?: number;
  key?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Zap:     <Zap size={20} />,
  Shield:  <Shield size={20} />,
  Droplet: <Droplet size={20} />,
};

const accentMap: Record<string, { icon: string; badge: string }> = {
  'ultrasonic-cleaning': { icon: 'text-brand-orange', badge: 'bg-brand-orange' },
  'polymer-barriers':    { icon: 'text-brand-blue',   badge: 'bg-brand-blue'   },
  'industrial-coatings': { icon: 'text-emerald-400',  badge: 'bg-emerald-500'  },
};

export default function ServiceCard({ service, onSelect, index = 0 }: ServiceCardProps) {
  const [specsOpen, setSpecsOpen] = useState(false);
  const accent = accentMap[service.id] ?? { icon: 'text-brand-orange', badge: 'bg-brand-orange' };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300 transition-all duration-300"
      id={`service-card-${service.id}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Sole distributor badge */}
        {service.id === 'ultrasonic-cleaning' && (
          <span className="absolute top-4 left-4 px-2.5 py-1 bg-brand-orange text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-md shadow-lg">
            Sole UAE Distributor
          </span>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end gap-3">
          <div className={`p-2.5 bg-[#030b16] border border-white/10 rounded-xl flex-shrink-0 ${accent.icon}`}>
            {iconMap[service.iconName] ?? <Zap size={20} />}
          </div>
          <h3
            title={service.title}
            className="text-white font-display font-bold text-lg leading-tight drop-shadow-md truncate"
          >
            {service.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p
          title={service.description}
          className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2"
        >
          {service.description}
        </p>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          {/* Specs trigger */}
          <button
            onClick={() => setSpecsOpen(true)}
            className="flex items-center justify-between w-full text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 rounded"
          >
            <span>View Full Specifications</span>
            <span className="p-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">
              <ArrowRight size={14} />
            </span>
          </button>

          {/* CTA */}
          <button
            onClick={() => onSelect(service.id)}
            aria-label={`Request quote for ${service.title}`}
            className="w-full py-3 bg-[#030b16] hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/cta shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
            id={`service-cta-${service.id}`}
          >
            Request Quote & Details
            <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Slide-in specs panel */}
      <AnimatePresence>
        {specsOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="absolute inset-0 bg-white flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-500">
                Technical Specifications
              </span>
              <button
                onClick={() => setSpecsOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold transition-colors flex items-center gap-1"
              >
                <X size={14} /> Close
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800 leading-relaxed">
                {service.longDescription}
              </p>
              <ul className="space-y-2">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="px-5 py-4 border-t border-slate-100">
              <button
                onClick={() => { setSpecsOpen(false); onSelect(service.id); }}
                className="w-full py-3 bg-brand-orange hover:bg-brand-orange/90 text-white text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                Request Quote for This Spec
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
