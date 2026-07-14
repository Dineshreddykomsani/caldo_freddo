import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Gauge, TrendingUp, Hammer } from 'lucide-react';
import { Statistic } from '../types';

interface StatisticCardProps {
  stat: Statistic;
  index: number;
  key?: string | number;
}

export default function StatisticCard({ stat, index }: StatisticCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Parse numeric part for simple animation if applicable
  const numericMatch = stat.value.match(/^(\d+)/);
  const targetNum = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = stat.value.replace(/^(\d+)/, '');

  useEffect(() => {
    if (targetNum === null) return;
    let start = 0;
    const duration = 1500; // ms
    const stepTime = Math.abs(Math.floor(duration / targetNum));
    
    // Slow down if stepTime is too small
    const safeStepTime = Math.max(stepTime, 20);
    const increment = targetNum / (duration / safeStepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setDisplayValue(targetNum);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, safeStepTime);

    return () => clearInterval(timer);
  }, [targetNum]);

  const renderIcon = () => {
    const iconClass = "text-brand-orange";
    switch (stat.iconName) {
      case 'Award':
        return <Award className={iconClass} size={24} />;
      case 'Gauge':
        return <Gauge className={iconClass} size={24} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} size={24} />;
      case 'Hammer':
        return <Hammer className={iconClass} size={24} />;
      default:
        return <Award className={iconClass} size={24} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-[#0d1117] border border-white/[0.08] rounded-2xl p-6 md:p-8 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden hover:border-white/[0.14] hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]"
      id={`stat-card-${index}`}
    >
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-brand-orange/50 via-brand-orange/20 to-transparent rounded-t-2xl" />

      <div className="flex justify-between items-start mb-6">
        <div className="p-2.5 bg-brand-orange/10 rounded-xl border border-brand-orange/15 group-hover:bg-brand-orange/15 transition-colors duration-300">
          {renderIcon()}
        </div>
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-slate-600 font-bold">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-1.5">
          {targetNum !== null ? `${displayValue}${suffix}` : stat.value}
        </h3>
        <p className="text-sm font-bold text-brand-orange tracking-widest uppercase mb-3 font-mono">
          {stat.label}
        </p>
        <p className="text-sm leading-relaxed text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}
