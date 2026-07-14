import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Flame, Container, Ship, Beef, ArrowUpRight } from 'lucide-react';
import { Industry } from '../types';

interface IndustryCardProps {
  industry: Industry;
  key?: string;
}

export default function IndustryCard({ industry }: IndustryCardProps) {
  // Dynamically select Lucide icon
  const renderIcon = () => {
    switch (industry.iconName) {
      case 'Cpu':
        return <Cpu className="text-white" size={20} />;
      case 'Flame':
        return <Flame className="text-white" size={20} />;
      case 'Container':
        return <Container className="text-white" size={20} />;
      case 'Ship':
        return <Ship className="text-white" size={20} />;
      case 'Beef':
        return <Beef className="text-white" size={20} />;
      default:
        return <Cpu className="text-white" size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl overflow-hidden h-72 group shadow-sm border border-slate-100"
      id={`industry-card-${industry.id}`}
    >
      {/* Background Image with Zoom on Hover */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-transparent z-10 transition-colors duration-300 group-hover:from-brand-dark group-hover:via-brand-dark/85" />
        <img
          src={industry.bgImage}
          alt={industry.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Floating Content Panel */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between h-full">
        {/* Upper row: Floating Icon Badge */}
        <div className="flex justify-between items-start">
          <div className="p-2.5 bg-brand-orange rounded-xl border border-brand-orange/30 shadow-lg">
            {renderIcon()}
          </div>
          <span className="p-1.5 bg-white/10 rounded-full text-white/70 opacity-0 group-hover:opacity-100 group-hover:bg-white/20 transition-all duration-300">
            <ArrowUpRight size={16} />
          </span>
        </div>

        {/* Lower row: Text labels */}
        <div>
          <h3 className="text-lg font-display font-bold text-white tracking-tight mb-2 group-hover:text-brand-orange transition-colors duration-300">
            {industry.name}
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-slate-300 opacity-90 group-hover:text-white transition-colors">
            {industry.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
