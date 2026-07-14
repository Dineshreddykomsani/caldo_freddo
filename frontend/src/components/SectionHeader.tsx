import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  inverse?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  inverse = false
}: SectionHeaderProps) {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end'
  };

  return (
    <div className={`flex flex-col max-w-3xl mb-16 ${alignClass[align]}`} id={`sec-hdr-${(badge ?? "").toLowerCase().replace(/\s+/g, "-")}`}>
      {/* Accent Badge */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`px-3 py-1 text-[10px] font-sans tracking-wider uppercase rounded-full mb-4 inline-block font-bold ${
          inverse
            ? 'bg-blue-900/40 text-blue-200'
            : 'bg-orange-100 text-orange-700'
        }`}
      >
        {badge}
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight leading-[1.1] mb-5 ${
          inverse ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </motion.h2>

      {/* Decorative Line divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-1 h-[2px] w-12 mb-5 origin-left"
      >
        <div className="w-full h-full bg-orange-600 rounded-full" />
      </motion.div>

      {/* Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`text-base md:text-lg leading-relaxed ${
            inverse ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
