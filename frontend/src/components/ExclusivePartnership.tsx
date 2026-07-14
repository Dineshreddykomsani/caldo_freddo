import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Award } from 'lucide-react';


interface ExclusivePartnershipProps {
  onRequestQuote?: () => void;
}

const benefits = [
  'High-capacity industrial cleaning systems',
  'Built for kitchens & food processing',
  'Advanced cavitation for superior results',
  'Lower maintenance & operating costs',
  'Full after-sales support across UAE & GCC',
];

export default function ExclusivePartnership({ onRequestQuote }: ExclusivePartnershipProps) {
  return (
    <section
      id="exclusive-partnership"
      className="section-py bg-[#030b16] relative overflow-hidden border-t border-white/[0.05]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600"
          alt="Industrial Background"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030b16]/90 via-[#030b16]/75 to-[#030b16]/95" />
      </div>

      {/* Blueprint grid accent */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.1] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-blue/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-orange/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="cx relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 xl:gap-20 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col justify-center space-y-5 sm:space-y-7">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border border-brand-orange/20 w-fit"
            >
              <Award size={12} />
              Exclusive Partnership
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="font-display font-black text-white leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              CaldoFreddo × UltraTecno
              <br />
              <span className="text-brand-blue">Sole Distributor In UAE</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base leading-relaxed max-w-lg"
            >
              High-capacity ultrasonic cleaning systems built for commercial kitchens, food processing, hotels and demanding industrial applications.
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="space-y-3"
            >
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-brand-orange stroke-[3]" />
                  </span>
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button onClick={onRequestQuote} className="btn-primary">
                Request A Consultation
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>

          {/* Right: Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative"
          >
            {/* Decorative frame glow */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-tr from-brand-orange/20 to-brand-blue/10 pointer-events-none" />

     <div className="relative video-wrap rounded-2xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] bg-black">

  <div className="relative w-full overflow-hidden rounded-[28px] aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/10]">

   <iframe
  className="absolute inset-0 w-full h-full"
  src="https://www.youtube.com/embed/-f1m0nKBw7Y?autoplay=1&mute=1&loop=1&playlist=-f1m0nKBw7Y&controls=1&rel=0&modestbranding=1&playsinline=1"
  title="UltraTecno Ultrasonic Washing Machine"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
/>

  </div>

  {/* Overlay Badge */}
  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#030b16]/80 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-2 z-10">
    <Award size={12} className="text-brand-orange" />
    <span className="text-white font-mono text-[10px] font-bold uppercase tracking-widest">
      Sole UAE Distributor
    </span>
  </div>

</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
