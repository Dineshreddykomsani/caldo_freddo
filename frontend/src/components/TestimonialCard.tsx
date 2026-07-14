import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  key?: string;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative group"
      id={`testimonial-card-${testimonial.id}`}
    >
      {/* Decorative quotes background */}
      <div className="absolute top-6 right-6 text-slate-100 group-hover:text-brand-orange/5 transition-colors duration-300 z-0">
        <Quote size={56} className="stroke-[3]" />
      </div>

      <div className="relative z-10">
        {/* Star Ratings */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} size={15} className="fill-brand-orange text-brand-orange" />
          ))}
        </div>

        {/* Quote text */}
        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>
      </div>

      {/* Author Details metadata */}
      <div className="border-t border-slate-100 pt-5 flex items-center justify-between relative z-10">
        <div>
          <h4 className="font-display font-bold text-base md:text-lg text-brand-navy">
            {testimonial.author}
          </h4>
          <p className="text-base md:text-lg text-slate-500 font-medium">
            {testimonial.role}, <span className="text-slate-700 font-semibold">{testimonial.company}</span>
          </p>
        </div>
        
        {/* GCC Location badge */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-brand-blue bg-brand-blue/5 px-2.5 py-1 rounded-md border border-brand-blue/10">
          <MapPin size={10} className="text-brand-orange" />
          <span>{testimonial.location.split(',')[0]}</span>
        </div>
      </div>
    </motion.div>
  );
}
