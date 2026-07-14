import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  ArrowRight, Check, Shield, Phone, Mail, MapPin, Clock,
  Target, Eye, ShieldAlert, Award, AlertTriangle,
  Sparkles, ChevronLeft, ChevronRight, CheckCircle2,
  ShieldCheck, Zap, Cpu,
  Flame, Container, Ship, Beef, Search,
  ChevronDown, Building, Send,
  TrendingUp, Star,
  Facebook, Twitter, Linkedin, Youtube
} from 'lucide-react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import QuoteModal from './components/QuoteModal';
import ProductCatalog from './components/ProductCatalog';
import CallbackForm from './components/CallbackForm';
import ServiceCard from './components/ServiceCard';
import { Testimonial, api } from './api';
import { companyContact as fallbackCompanyContact, services as fallbackServices, products as fallbackProducts, industries } from './data';
import ExclusivePartnership from './components/ExclusivePartnership';

/* ─── Animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  useEffect(() => {
    if (!inView) return;
    const dur = 1800, start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Eyebrow ─── */
function Eyebrow({ label, color = 'text-brand-orange' }: { label: string; color?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase ${color}`}>
      <div className="w-6 sm:w-8 h-[2px] bg-current" />
      <span>{label}</span>
      <div className="w-6 sm:w-8 h-[2px] bg-current" />
    </div>
  );
}

/* ─── Section heading ─── */
function SectionH2({ children, light = false, className = '' }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <h2 className={`font-display font-black leading-[1.07] tracking-tight text-3xl sm:text-4xl md:text-5xl ${light ? 'text-white' : 'text-slate-950'} ${className}`}>
      {children}
    </h2>
  );
}

/* ─── Industry icons ─── */
const industryIconMap: Record<string, React.ReactNode> = {
  Cpu:         <Cpu size={20} />,
  Flame:       <Flame size={20} />,
  Container:   <Container size={20} />,
  Ship:        <Ship size={20} />,
  Beef:        <Beef size={20} />,
  Stethoscope: <ShieldCheck size={20} />,
  Hotel:       <Building size={20} />,
};

/* ─── Testimonials ─── */
const fallbackTestimonials: Testimonial[] = [
  { id: 1, quote: "Caldo Freddo re-tooled our warehouse with Rack Armour and PVC curtains in under three weeks. Downtime dropped, and we haven't touched the barriers since.", author: "Operations Director", company: "Logistics Group", location: "Dubai", rating: 5, tag: "Logistics & Warehousing" },
  { id: 2, quote: "Before partnering with Caldo Freddo, our mold-cleaning turnaround took 8 hours of manual scrubbing. Now, their UltraTecno ultrasonic system cleans our intricate components in 20 minutes with absolute precision.", author: "Salem Al-Mansoori", company: "Emirates Precision Molding", location: "Abu Dhabi", rating: 5, tag: "Manufacturing" },
  { id: 3, quote: "Operating in the marine sector means severe corrosion. The industrial protection coatings applied by Caldo Freddo on our dock gears have resisted extreme saltwater and intense UV rays for 2 years without wear.", author: "Capt. Tariq Al-Jamil", company: "Al-Jamil Marine Services", location: "Sharjah", rating: 5, tag: "Marine & Offshore" },
  { id: 4, quote: "The eco-friendly commercial toilets from Propelair reduced our retail mall water usage by over 80%. Exceptional payback and zero maintenance issues since installation.", author: "Facilities Director", company: "Majid Retail Group", location: "UAE", rating: 5, tag: "Hospitality" },
];

const fallbackPartners = ['ULTRATECNO', 'RACK ARMOUR', 'TERSANO', 'JONIX', 'PROPELAIR', 'SHYCOCAN'];

/* ═══════════════════════════════════════════════ */
export default function App() {
  const [quoteOpen,    setQuoteOpen]    = useState(false);
  const [svcId,        setSvcId]        = useState<string | undefined>();
  const [prodName,     setProdName]     = useState<string | undefined>();
  const [submitted,    setSubmitted]    = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState('');
  const [services, setServices] = useState(fallbackServices);
  const [products, setProducts] = useState(fallbackProducts);
  const [industriesData, setIndustriesData] = useState(industries);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [partners, setPartners] = useState(fallbackPartners);
  const [companyContact, setCompanyContact] = useState(fallbackCompanyContact);
  const [form, setForm] = useState({ name: '', email: '', phone: '', product: '', query: '', company: '' });

  const [tIdx, setTIdx] = useState(0);
  const nextT = () => setTIdx(p => (p + 1) % testimonials.length);
  const prevT = () => setTIdx(p => (p - 1 + testimonials.length) % testimonials.length);
  const openQuote = (serviceId?: string, productName?: string) => { setSvcId(serviceId); setProdName(productName); setQuoteOpen(true); };
  const closeQuote = () => { setQuoteOpen(false); setSvcId(undefined); setProdName(undefined); };
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
  };

  useEffect(() => {
    let active = true;

    Promise.allSettled([
      api.getCompany(),
      api.getServices(),
      api.getProducts(),
      api.getIndustries(),
      api.getTestimonials(),
      api.getPartners(),
    ]).then(([companyResult, servicesResult, productsResult, industriesResult, testimonialsResult, partnersResult]) => {
      if (!active) return;

      if (companyResult.status === 'fulfilled') {
        setCompanyContact({ ...fallbackCompanyContact, ...companyResult.value });
      }
      if (servicesResult.status === 'fulfilled' && servicesResult.value.length) {
        setServices(servicesResult.value);
      }
      if (productsResult.status === 'fulfilled' && productsResult.value.length) {
        setProducts(productsResult.value);
      }
      if (industriesResult.status === 'fulfilled' && industriesResult.value.length) {
        setIndustriesData(industriesResult.value);
      }
      if (testimonialsResult.status === 'fulfilled' && testimonialsResult.value.length) {
        setTestimonials(testimonialsResult.value);
      }
      if (partnersResult.status === 'fulfilled' && partnersResult.value.length) {
        setPartners(partnersResult.value.map((partner) => partner.name));
      }
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    setTIdx((current) => Math.min(current, Math.max(testimonials.length - 1, 0)));
  }, [testimonials.length]);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setContactError('');
    try {
      await api.createContact({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        product: form.product,
        query: form.query,
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', product: '', query: '', company: '' }); }, 5000);
    } catch (error) {
      setContactError(error instanceof Error ? error.message : 'Unable to send message.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-brand-orange selection:text-white font-sans overflow-x-hidden" id="root-app">

      <Navbar onRequestQuote={() => openQuote()} companyContact={companyContact} />

      {/* ══════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#030b16]"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(3,11,22,0.92) 0%, rgba(3,11,22,0.82) 55%, rgba(3,11,22,0.96) 100%), url(https://images.pexels.com/photos/236709/pexels-photo-236709.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 blueprint-grid opacity-[0.14] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4  w-[400px] h-[400px] bg-brand-orange/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-blue/7  rounded-full blur-[110px] pointer-events-none" />

        {/* Content — generous top/bottom padding that works on all screen sizes */}
        <div className="cx relative z-10 pt-28 sm:pt-36 md:pt-40 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

            {/* Left copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="flex items-center gap-3 text-brand-orange font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em]">
                <div className="w-6 sm:w-8 h-[2px] bg-brand-orange" />
                <span>Est. 2012 · United Arab Emirates</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
                className="font-display font-black text-white leading-[1.04] tracking-tight"
                style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.75rem)' }}
              >
                Revolutionize Your<br />
                <span className="text-brand-blue">Industrial Cleaning</span><br />
                <span className="text-brand-orange">&amp; Protection</span> Solutions.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-300/90 text-base sm:text-lg leading-relaxed max-w-xl">
                Achieve unparalleled cleanliness and protection with cutting-edge Ultrasonic Cleaning and Polymer Bumper Barrier services, engineered for demanding GCC industrial environments.
              </motion.p>

              {/* CTAs — stacked on mobile, side-by-side on sm+ */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-row flex-wrap gap-3 sm:gap-4 items-center">
                <button onClick={() => openQuote()} className="btn-primary">
                  Free Consultation
                  <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo('services')} className="btn-secondary">
                  Explore Services <ChevronDown size={16} />
                </button>
              </motion.div>

              {/* Trust signals */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 pt-2 border-t border-white/[0.07]">
                {[
                  { val: '14+',  label: 'Years Operating'    },
                  { val: '176+', label: 'Industrial Clients'  },
                  { val: '20+',  label: 'Global Partners'    },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="font-display font-black text-white text-2xl sm:text-3xl leading-none">{s.val}</span>
                    <span className="text-slate-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest leading-tight">{s.label}</span>
                    {i < 2 && <div className="hidden sm:block w-px h-4 bg-white/10 ml-3" />}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: callback card — visible on all sizes, sits below on mobile */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', duration: 0.9, delay: 0.28 }}
                className="w-full max-w-sm sm:max-w-md relative"
              >
                <div className="absolute -inset-[1px] rounded-[1.4rem] bg-gradient-to-br from-brand-orange/25 via-transparent to-brand-blue/15 pointer-events-none" />
                <div className="relative bg-[#071120]/92 backdrop-blur-2xl border border-white/[0.09] rounded-2xl p-5 sm:p-7 shadow-[0_32px_96px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 sm:pb-5 border-b border-white/[0.07]">
                    <Logo size="sm" className="flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase">Request a Quick Call Back</h3>
                      <p className="text-slate-400 text-[11px] mt-0.5 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Responds within 15 minutes
                      </p>
                    </div>
                  </div>
                  <CallbackForm compact={true} services={services} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll cue — desktop only */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
          <span className="text-slate-500 font-mono text-[9px] uppercase tracking-[0.2em]">Scroll</span>
          <div className="animate-bounce-y text-slate-600"><ChevronDown size={18} /></div>
        </div>

        {/* Partner ticker */}
        {/* ================= Partner Ticker ================= */}
<div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-[#F37021] via-[#FF7B28] to-[#F37021] border-t border-[#ffb17c]/30 border-b border-[#d95d16] py-2 shadow-[0_-10px_35px_rgba(243,112,33,0.18)] z-20 overflow-hidden">

  {/* Top Highlight */}
  <div className="absolute top-0 left-0 w-full h-px bg-white/40" />

  {/* Bottom Shadow */}
  <div className="absolute bottom-0 left-0 w-full h-px bg-black/15" />

  <div className="ticker-track flex items-center whitespace-nowrap">

    {[...partners, ...partners, ...partners].map((p, i) => (
      <React.Fragment key={i}>

        <span
          className="
            px-6
            sm:px-8
            text-[10px]
            sm:text-[11px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#030b16]
            transition-all
            duration-300
            hover:text-[#FFE7D2]
            hover:scale-105
            cursor-pointer
          "
        >
          {p}
        </span>

        <span className="text-[#030b16]/50 text-[8px]">
          ◆
        </span>

      </React.Fragment>
    ))}

  </div>

</div>
      </section>

      {/* ══════════════════════════════════════════
          §2  GOALS / MISSION
      ══════════════════════════════════════════ */}
      <section id="goals" className="section-py bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_-10%,rgba(52,168,227,0.04),transparent)] pointer-events-none" />
        <div className="cx relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-center">

            {/* Left — statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-5"
            >
              <span className="inline-flex items-center gap-2 text-brand-orange font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
                <div className="w-6 h-[2px] bg-brand-orange" /> Our Mission
              </span>
              <h2 className="font-display font-black text-slate-950 leading-[1.06] tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                Your operations should never stop for maintenance.
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                We engineered every solution around that single belief: because downtime doesn't just cost money, it costs momentum.
              </p>
              <button onClick={() => openQuote()} className="btn-ghost">
                Talk to a Specialist <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* Right — 3 feature cards */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  icon: <Target size={20} />,
                  num: '01',
                  title: 'Precision Cleaning',
                  desc: 'Microscopic, residue-free cleanliness for intricate parts, molds, and filters, delivered by ultrasonic cavitation, not manual scrubbing.',
                  cardBg: 'bg-blue-50/70 hover:bg-blue-50',
                  border: 'border-brand-blue/20 hover:border-brand-blue/40',
                  leftBorder: '#34a8e3',
                  iconBg: 'bg-brand-blue/10 group-hover:bg-brand-blue/18',
                  iconColor: 'text-brand-blue',
                  numColor: 'text-brand-blue/40',
                  shadow: 'hover:shadow-[0_8px_28px_-6px_rgba(52,168,227,0.2)]',
                },
                {
                  icon: <ShieldCheck size={20} />,
                  num: '02',
                  title: 'Advanced Protection',
                  desc: 'Polymer and industrial coating systems that guard your assets against physical impact, corrosion, and chemical wear, without interrupting operations.',
                  cardBg: 'bg-orange-50/70 hover:bg-orange-50',
                  border: 'border-brand-orange/20 hover:border-brand-orange/40',
                  leftBorder: '#f37021',
                  iconBg: 'bg-brand-orange/10 group-hover:bg-brand-orange/18',
                  iconColor: 'text-brand-orange',
                  numColor: 'text-brand-orange/40',
                  shadow: 'hover:shadow-[0_8px_28px_-6px_rgba(243,112,33,0.2)]',
                },
                {
                  icon: <Zap size={20} />,
                  num: '03',
                  title: 'Sustained Efficiency',
                  desc: 'Eliminate the labor bottleneck. Our systems are designed to run longer, clean faster, and reduce total maintenance overhead from day one.',
                  cardBg: 'bg-emerald-50/70 hover:bg-emerald-50',
                  border: 'border-emerald-500/20 hover:border-emerald-500/40',
                  leftBorder: '#10b981',
                  iconBg: 'bg-emerald-500/10 group-hover:bg-emerald-500/18',
                  iconColor: 'text-emerald-600',
                  numColor: 'text-emerald-500/40',
                  shadow: 'hover:shadow-[0_8px_28px_-6px_rgba(16,185,129,0.2)]',
                },
              ].map((item, i) => (
                <motion.div key={item.title}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className={`group flex items-start gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl border cursor-default transition-all duration-300 ${item.cardBg} ${item.border} ${item.shadow}`}
                  style={{ borderLeft: `3px solid ${item.leftBorder}` }}
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <span className={`font-mono text-[10px] font-black ${item.numColor}`}>{item.num}</span>
                    <div className={`p-2.5 rounded-xl transition-colors duration-300 ${item.iconBg} ${item.iconColor}`}>{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-1.5">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §3  CHALLENGES
      ══════════════════════════════════════════ */}
      <section className="section-py bg-[#030b16] relative overflow-hidden">
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />
        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/8 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-blue/8 rounded-full blur-[110px] pointer-events-none" />

        <div className="cx relative z-10">

          {/* Editorial header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-6 sm:mb-8"
          >
            <span className="inline-flex items-center gap-2 text-rose-400 font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-4">
              <div className="w-6 h-[2px] bg-rose-400" /> The Challenges
            </span>
            <h2 className="font-display font-black text-white leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)' }}>
              We Understand Your Struggles.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mt-4 max-w-xl">
              Modern industrial facilities face compounding maintenance pressures. Here's where Caldo Freddo steps in.
            </p>
          </motion.div>

          {/* Three equal cards in one row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">

            {/* Rose — Internal Struggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative rounded-2xl border border-white/[0.09] bg-white/[0.05] backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between group overflow-hidden"
              style={{ borderLeft: '3px solid rgba(244,63,94,0.5)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.06] to-transparent rounded-2xl pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-rose-500/8 rounded-full blur-[60px] group-hover:bg-rose-500/14 transition-colors duration-500 pointer-events-none" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider mb-4 bg-rose-500/12 text-rose-400 border border-rose-500/20">
                  Internal Struggle
                </span>
                <p className="text-white text-sm sm:text-base leading-relaxed font-semibold">
                  "Are our cleaning methods slowly compromising component integrity?"
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">
                  Manual cleaning and outdated processes introduce risk you can't always see, until it's too late.
                </p>
              </div>
              <div className="relative flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 flex-shrink-0"><ShieldAlert size={14} /></div>
                <span className="text-slate-300 text-sm font-medium">Impacts performance standards</span>
              </div>
            </motion.div>

            {/* Amber — External Struggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative rounded-2xl border border-white/[0.09] bg-white/[0.05] backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between group overflow-hidden"
              style={{ borderLeft: '3px solid rgba(245,158,11,0.5)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.05] to-transparent rounded-2xl pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/6 rounded-full blur-[50px] group-hover:bg-amber-500/12 transition-colors duration-500 pointer-events-none" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider mb-4 bg-amber-500/12 text-amber-400 border border-amber-500/20">
                  External Struggle
                </span>
                <p className="text-white text-sm sm:text-base leading-relaxed font-semibold">
                  Repetitive failures and rising costs from micro-dust accumulation.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">
                  Expensive downtime, reactive repairs, and high unplanned labor costs compound silently over time.
                </p>
              </div>
              <div className="relative flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0"><AlertTriangle size={14} /></div>
                <span className="text-slate-300 text-sm font-medium">Drives up overhead expenses</span>
              </div>
            </motion.div>

            {/* Blue — Our Belief */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="relative rounded-2xl border border-white/[0.09] bg-white/[0.05] backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between group overflow-hidden"
              style={{ borderLeft: '3px solid rgba(52,168,227,0.5)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.05] to-transparent rounded-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-blue/6 rounded-full blur-[50px] group-hover:bg-brand-blue/12 transition-colors duration-500 pointer-events-none" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider mb-4 bg-brand-blue/12 text-brand-blue border border-brand-blue/20">
                  Our Belief
                </span>
                <p className="text-white text-sm sm:text-base leading-relaxed font-semibold">
                  Industrial cleaning and protection should be seamless and dependable.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mt-3">
                  Measurably effective, not a source of anxiety. Every solution we offer is built around that single commitment.
                </p>
              </div>
              <div className="relative flex items-center gap-3 mt-6 pt-4 border-t border-white/[0.06]">
                <div className="p-2 rounded-lg bg-brand-blue/10 border border-brand-blue/20 text-brand-blue flex-shrink-0"><Sparkles size={14} /></div>
                <span className="text-slate-300 text-sm font-medium">The standard you deserve</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §4  ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" className="section-py bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Expert Positioning" />
            <SectionH2>Your Trusted Partner in Success.</SectionH2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14 items-start">

            {/* Left text */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-semibold">
                With years of experience, Caldo Freddo, part of Jeser Al Arab General Trading LLC, has delivered top-tier cleaning and protection solutions across the UAE and GCC.
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Founded in 2012 and headquartered in Ajman, UAE, we source, distribute and service specialist industrial products: from power ultrasonic cleaners to warehouse barrier systems, eco-friendly cleaning solutions, and hospitality equipment.
              </p>

              {/* Mission / Vision cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Mission — orange left border */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="group p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm hover:shadow-[0_12px_32px_-6px_rgba(243,112,33,0.28)] hover:border-brand-orange/50 hover:bg-brand-orange/[0.03] transition-all duration-300 cursor-default"
                  style={{ borderLeft: '3px solid #f37021' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-brand-orange/8 group-hover:bg-brand-orange group-hover:scale-110 text-brand-orange group-hover:text-white transition-all duration-300"><Target size={15} /></div>
                    <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide transition-colors duration-300">Mission</h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors duration-300">To provide unique and innovative products, services and after-sales support that deliver superior satisfaction to our users.</p>
                </motion.div>
                {/* Vision — blue left border */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2.5 shadow-sm hover:shadow-[0_12px_32px_-6px_rgba(52,168,227,0.28)] hover:border-brand-blue/50 hover:bg-brand-blue/[0.03] transition-all duration-300 cursor-default"
                  style={{ borderLeft: '3px solid #34a8e3' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 sm:p-2 rounded-xl bg-brand-blue/8 group-hover:bg-brand-blue group-hover:scale-110 text-brand-blue group-hover:text-white transition-all duration-300"><Eye size={15} /></div>
                    <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide transition-colors duration-300">Vision</h4>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors duration-300">To become a leading business unit in industrial products and services, driven by innovation, quality, and customer satisfaction.</p>
                </motion.div>
              </div>

              {/* Partner logos */}
              <div>
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">Trusted Brands We Represent</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {partners.map(p => (
                    <span key={p} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-slate-200 rounded-xl text-[9px] sm:text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:border-brand-orange/50 hover:bg-brand-orange/5 hover:text-brand-orange cursor-default transition-all duration-200 shadow-sm">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <button onClick={() => scrollTo('services')} className="btn-primary">
                Learn More About Us <ArrowRight size={15} />
              </button>
            </div>

            {/* Right image */}
            <div className="lg:col-span-5 relative mt-2 lg:mt-0">
              {/* Shorter aspect on mobile, tall on desktop */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5]">
                <img
                  src="https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Jeser Al Arab Corporate"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b16]/65 to-transparent" />
              </div>
              {/* Floating badges — smaller on mobile */}
              <div className="absolute top-3 sm:top-5 left-3 sm:left-5 bg-[#030b16]/95 backdrop-blur-md border border-white/10 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl z-20">
                <div className="text-xl sm:text-3xl font-black text-brand-orange font-display leading-none mb-0.5 sm:mb-1">2012</div>
                <p className="text-white/70 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest leading-tight">Est. in UAE</p>
              </div>
              <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 bg-brand-orange text-white p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-2xl z-20">
                <div className="text-xl sm:text-2xl font-black font-display leading-none mb-0.5 sm:mb-1">176+</div>
                <p className="text-white/80 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest leading-tight">Industrial<br />Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §5  CTA BRIDGE — "Ready to Take the Next Step?"
      ══════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-[#030b16] relative overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="cx relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-4 sm:space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border border-brand-orange/20">
              <Sparkles size={11} /> Take the Next Step
            </span>
            <h2 className="font-display font-black text-white leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
              Ready to Take the Next Step?
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Let's build a solution that matches your exact operational needs, with full engineering support from day one.
            </p>
            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center pt-2 items-center">
              <button onClick={() => openQuote()} className="btn-primary">
                Book Your Session <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo('testimonials')} className="btn-ghost">
                Discover Our Success Stories <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §6  SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="section-py bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Core Services" />
            <SectionH2>Engineering-Grade Industrial Solutions.</SectionH2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              From ultrasonic precision to polymer protection, every solution engineered to reduce downtime and maximise asset longevity.
            </p>
          </div>

          {/* 1-col mobile → 2-col tablet → 3-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} onSelect={(id) => openQuote(id)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §7  PROCESS + STATS
      ══════════════════════════════════════════ */}
      <section id="process" className="section-py bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Three-Step Process" />
            <SectionH2>How We Help You Succeed in 3 Simple Steps</SectionH2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              A clear, repeatable methodology that delivers predictable outcomes every time.
            </p>
          </div>

          {/* 1 → 2 → 3 columns */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-6 sm:mb-8">
            {/* Connector line spanning the three step icons on desktop, anchored to the icon centerline (card padding + half icon height) */}
            <div className="hidden lg:block absolute h-px bg-slate-200"
              style={{ top: 'calc(1.75rem + 28px)', left: 'calc(100% / 6)', right: 'calc(100% / 6)' }} />

            {[
              {
                num: '01', icon: <Search size={18} />, title: 'Understand Your Needs',
                desc: 'We begin with a thorough, on-site analysis of your industrial cleaning and protection requirements to evaluate mechanical loads and chemical setups.',
                accent: 'brand-orange',
                hoverBorder: 'hover:border-brand-orange/40',
                hoverShadow: 'hover:shadow-[0_8px_28px_-6px_rgba(243,112,33,0.15)]',
                topBar: 'from-brand-orange/60 via-brand-orange/20',
                iconBg: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
                badgeText: 'text-brand-orange',
              },
              {
                num: '02', icon: <Target size={18} />, title: 'Tailored Solutions',
                desc: 'Our senior engineers design a custom strategy, layout drawings, and detergent specs that meet your specific performance and regulatory goals.',
                accent: 'brand-blue',
                hoverBorder: 'hover:border-brand-blue/40',
                hoverShadow: 'hover:shadow-[0_8px_28px_-6px_rgba(52,168,227,0.15)]',
                topBar: 'from-brand-blue/60 via-brand-blue/20',
                iconBg: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
                badgeText: 'text-brand-blue',
              },
              {
                num: '03', icon: <Clock size={18} />, title: 'Ongoing Support',
                desc: 'We handle professional installation, staff training, and provide continuous engineering support to ensure sustained, long-term operational success.',
                accent: 'emerald-500',
                hoverBorder: 'hover:border-emerald-500/40',
                hoverShadow: 'hover:shadow-[0_8px_28px_-6px_rgba(16,185,129,0.15)]',
                topBar: 'from-emerald-500/60 via-emerald-500/20',
                iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                badgeText: 'text-emerald-600',
              },
            ].map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col cursor-default shadow-sm transition-all duration-300 overflow-hidden ${step.hoverBorder} ${step.hoverShadow}`}
              >
                {/* Per-step top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${step.topBar} to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-center gap-3 mb-5">
                  <span className={`flex-shrink-0 font-mono font-bold text-xl sm:text-2xl ${step.badgeText}`}>{step.num}</span>
                  <h3 className="flex-1 text-center font-display font-bold text-slate-900 text-lg sm:text-xl leading-snug">{step.title}</h3>
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${step.iconBg}`}>
                    {step.icon}
                  </div>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => openQuote()} className="btn-primary">
              Book Your Session <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-8 sm:mt-10 bg-[#030b16] border-t border-white/[0.06]">
          <div className="cx py-8 sm:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { value: 14,  suffix: '+', label: 'Years Operating',      sub: 'Since 2012'          },
                { value: 176, suffix: '+', label: 'Industrial Clients',   sub: 'UAE & GCC'           },
                { value: 20,  suffix: '+', label: 'Global Manufacturers', sub: 'Brand Partners'      },
                { value: 2,   suffix: '',  label: 'GCC Countries',        sub: 'UAE & Saudi Arabia'  },
              ].map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="text-center md:text-left md:border-r md:border-white/[0.06] last:border-0 md:pr-8 last:pr-0"
                >
                  <span className="block font-display font-black text-brand-orange leading-none mb-1" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="block text-white font-semibold text-sm mb-0.5">{stat.label}</span>
                  <span className="block text-slate-500 font-mono text-[10px] uppercase tracking-widest">{stat.sub}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §8  BENEFITS
      ══════════════════════════════════════════ */}
      <section id="why-choose-us" className="section-py bg-slate-50 relative overflow-hidden border-b border-slate-100">
        <div className="cx relative z-10">
          <div className="relative bg-[#071120] border border-white/[0.07] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-blue/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 blueprint-grid opacity-[0.05] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-center relative z-10">

              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border border-brand-orange/20">
                  <Award size={11} /> The Benefits of Partnership
                </span>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
                  The Results<br />You Can Expect.
                </h2>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg">
                  Clients who partner with us see reduced equipment downtime, extended asset lifespans, and significant cost savings, measurable from the first deployment.
                </p>
                <div className="flex flex-row flex-wrap gap-3 sm:gap-4 items-center">
                  <button onClick={() => openQuote()} className="btn-primary">
                    Start Your Partnership <ArrowRight size={16} />
                  </button>
                  <button onClick={() => scrollTo('contact')} className="btn-secondary">
                    Speak to a Specialist
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                {[
                  { icon: <Clock size={18} />,      color: 'bg-rose-500/12 text-rose-400',       title: 'Reduced Equipment Downtime', desc: 'Keep operations fluid and predictable with proactive maintenance cycles.' },
                  { icon: <ShieldCheck size={18} />, color: 'bg-emerald-500/12 text-emerald-400', title: 'Extended Asset Lifespans',    desc: 'Protect high-value capital assets from early failure and degradation.' },
                  { icon: <TrendingUp size={18} />,  color: 'bg-brand-blue/12 text-brand-blue',   title: 'Significant Cost Savings',   desc: 'Dramatically reduce recurring maintenance overheads from day one.' },
                ].map((b, i) => (
                  <motion.div key={b.title}
                    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="card-dark p-4 sm:p-5 flex items-start gap-3 sm:gap-4 rounded-xl"
                  >
                    <div className={`p-2 sm:p-2.5 rounded-xl flex-shrink-0 mt-0.5 ${b.color}`}>{b.icon}</div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-0.5">{b.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §9  RISKS
      ══════════════════════════════════════════ */}
      <section className="section-py bg-white relative overflow-hidden border-b border-slate-100">
        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Risk Assessment" color="text-red-500" />
            <SectionH2>What You're Risking Without the Right Solution</SectionH2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Inadequate industrial maintenance compounds into critical operational failures. Here's what's at stake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { icon: <AlertTriangle size={18} />, title: 'Frequent Equipment Failures',  desc: 'Inaction leads to frequent equipment failures due to compromised component integrity, structural wear, and micro-contamination.' },
              { icon: <ShieldAlert size={18} />,   title: 'Increased Maintenance Costs',  desc: 'Escalating breakdown occurrences require expensive reactive repairs, fast component replacement, and high unplanned labor costs.' },
              { icon: <Clock size={18} />,         title: 'Operational Inefficiencies',   desc: 'Slowing down production cycles, missed client delivery timelines, and critical resource bottlenecking across all plant operations.' },
            ].map((risk, i) => (
              <motion.div key={risk.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.22, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="risk-card p-5 sm:p-6 cursor-default flex flex-col"
              >
                {/* Icon + number row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="risk-icon p-2.5 bg-red-50 text-red-500 rounded-xl flex-shrink-0 border border-red-100 transition-all duration-300">
                    {risk.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-red-300 select-none tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-snug mb-2">
                  {risk.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{risk.desc}</p>

                {/* Footer */}
                <div className="pt-3 border-t border-red-100 flex items-center gap-2 text-red-500 text-[11px] font-semibold uppercase tracking-wide">
                  <CheckCircle2 size={12} className="flex-shrink-0" />
                  <span>Avoidable with the right partner</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <button onClick={() => openQuote()} className="btn-primary">
              Protect Your Operations Today <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §10  SUCCESS & TRANSFORMATION
      ══════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-[#030b16] relative overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="cx relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 items-center">

            {/* Left — headline + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="space-y-5 sm:space-y-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border border-brand-orange/20">
                <Star size={11} className="fill-brand-orange" /> Success &amp; Transformation
              </span>
              <h2 className="font-display font-black text-white leading-[1.06] tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
                Your Success Story Awaits
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
                Join the ranks of businesses that have transformed their operations with our Ultrasonic Cleaning and Polymer Bumper Barrier solutions, engineered for lasting results.
              </p>
              <div className="flex flex-row flex-wrap gap-3 sm:gap-4 pt-1 items-center">
                <button onClick={() => openQuote()} className="btn-primary">
                  Start Your Journey Today <ArrowRight size={16} />
                </button>
                <button onClick={() => scrollTo('portfolio')} className="btn-ghost">
                  View Our Portfolio <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>

            {/* Right — highlighted testimonial / case study snippet */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.15 }}
              className="bg-white/[0.035] border border-white/[0.08] rounded-2xl p-5 sm:p-7 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/6 rounded-full blur-3xl pointer-events-none" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <blockquote className="text-white/90 text-base sm:text-lg leading-relaxed font-medium mb-7">
                "Caldo Freddo's ultrasonic systems reduced our cleaning cycle time by over 60% and virtually eliminated manual rework. Our maintenance costs dropped within the first quarter."
              </blockquote>
              <div className="flex items-center gap-4 pt-5 border-t border-white/[0.08]">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/15 border border-brand-orange/25 flex items-center justify-center text-brand-orange font-display font-black text-lg">
                  A
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">Ahmed Al Mansouri</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Operations Director · Al Futtaim Engineering, UAE</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §11  PRODUCT CATALOG
      ══════════════════════════════════════════ */}
      <ProductCatalog products={products} onRequestQuote={(pn) => openQuote(undefined, pn)} />

      {/* ══════════════════════════════════════════
          §12  EXCLUSIVE PARTNERSHIP
      ══════════════════════════════════════════ */}
      <ExclusivePartnership onRequestQuote={openQuote} />

      {/* ══════════════════════════════════════════
          §13  INDUSTRIES
      ══════════════════════════════════════════ */}
      <section id="industries" className="section-py bg-[#030b16] relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-[0.07] pointer-events-none" />
        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Industries We Serve" />
            <SectionH2 light>Solutions Across Every Sector.</SectionH2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              From manufacturing floors to hospital corridors, industrial-grade solutions for every demanding environment.
            </p>
          </div>

          {/* 2-col mobile → 3-col tablet → 5-col desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {industriesData.map((industry, i) => (
              <motion.div key={industry.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="industry-card group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square sm:aspect-[3/4] cursor-default border border-white/[0.05]"
              >
                <img
                  src={industry.bgImage}
                  alt={industry.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="industry-card-overlay absolute inset-0" />

                {/* Top badge */}
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-md text-[8px] sm:text-[9px] font-mono text-white/70 uppercase tracking-wider font-bold">
                    <div className="w-1 h-1 rounded-full bg-brand-orange flex-shrink-0" />
                    GCC
                  </span>
                </div>

                <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-end">
                  <div className="text-brand-orange mb-2 transform group-hover:-translate-y-1 transition-transform duration-400">
                    {industryIconMap[industry.iconName] ?? <Building size={18} />}
                  </div>
                  <h3 className="text-white font-display font-bold text-xs sm:text-sm leading-snug">{industry.name}</h3>
                  <p className="hidden sm:block text-slate-300 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0 max-h-0 group-hover:max-h-20 overflow-hidden mt-1">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §14  TESTIMONIALS  (dark anchor section)
      ══════════════════════════════════════════ */}
      <section id="testimonials" className="section-py bg-white relative overflow-hidden border-t border-slate-100">

        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            <Eyebrow label="Client Voices" />
            <SectionH2>Trusted by Operators<br />Who Cannot Afford Downtime.</SectionH2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              What our long-term industrial and hospitality partners say about working with Caldo Freddo.
            </p>
          </div>

          {/* Mobile: quote card first, then navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-16 items-start">

            {/* Quote card — full width on mobile, 8 cols on desktop */}
            <div className="lg:col-span-8 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div key={tIdx}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.22 } }}
                    className="bg-[#0a1628] border border-white/[0.08] rounded-2xl p-6 sm:p-9 lg:p-12 relative overflow-hidden shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />

                    <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-brand-orange/15 text-brand-orange text-[10px] font-mono font-bold uppercase tracking-wider mb-4 sm:mb-5 border border-brand-orange/25">
                      {testimonials[tIdx].tag}
                    </span>
                    <div className="flex gap-1 mb-4 sm:mb-6">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                    </div>
                    <blockquote aria-live="polite" className="text-slate-100 text-base md:text-lg leading-relaxed font-medium mb-5 sm:mb-7 relative tracking-tight">
                      <span className="absolute -top-3 -left-1 text-5xl sm:text-6xl md:text-7xl text-white/10 font-serif leading-none select-none">"</span>
                      <span className="relative z-10">{testimonials[tIdx].quote}</span>
                    </blockquote>
                    <div className="flex items-center justify-between pt-5 sm:pt-7 border-t border-white/[0.08]">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-orange/20 border border-brand-orange/30 flex items-center justify-center text-brand-orange font-display font-black text-base sm:text-lg">
                          {testimonials[tIdx].author[0]}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-white text-sm">{testimonials[tIdx].author}</h4>
                          <p className="text-slate-400 text-xs mt-0.5">{testimonials[tIdx].company} · {testimonials[tIdx].location}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-[9px] font-mono text-slate-300 font-bold tracking-wider uppercase block">Verified</span>
                        <span className="text-[9px] font-mono text-slate-300 font-bold tracking-wider uppercase block">GCC Operator</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation + picker — below on mobile, 4 cols on desktop */}
            <div className="lg:col-span-4 lg:order-1 space-y-5 sm:space-y-7">

              {/* Prev/next */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={prevT}
                  className="w-11 h-11 rounded-xl border border-slate-200 bg-white hover:bg-brand-orange hover:border-brand-orange text-slate-500 hover:text-white flex items-center justify-center transition-all duration-250 flex-shrink-0 shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-mono text-sm font-bold text-slate-500 tabular-nums">
                  {String(tIdx + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </span>
                <button
                  onClick={nextT}
                  className="w-11 h-11 rounded-xl border border-slate-200 bg-white hover:bg-brand-orange hover:border-brand-orange text-slate-500 hover:text-white flex items-center justify-center transition-all duration-250 flex-shrink-0 shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setTIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-[3px] rounded-full transition-all duration-350 cursor-pointer ${i === tIdx ? 'w-10 bg-brand-orange' : 'w-3 bg-slate-300 hover:bg-slate-400'}`}
                  />
                ))}
              </div>

              {/* Picker list — visible on all screens */}
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {testimonials.map((t, i) => (
                  <button key={t.id} onClick={() => setTIdx(i)}
                    className={`text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer w-full ${i === tIdx ? 'border-brand-orange/40 bg-brand-orange/6 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm'}`}
                  >
                    <p className="text-slate-800 text-xs font-semibold leading-snug break-words">{t.author}</p>
                    <p className="text-slate-500 text-[10px] font-mono mt-0.5 uppercase tracking-wider break-words">{t.company} · {t.location}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          §15  CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="section-py bg-[#030b16] relative overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-brand-orange/4 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid opacity-[0.06] pointer-events-none" />

        <div className="cx relative z-10">

          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            <Eyebrow label="Get In Touch" />
            <SectionH2 light>Talk to a Product Specialist.</SectionH2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Tell us about your project or product need. Our team responds within one working day.
            </p>
          </div>

          {/* Info cards row — 4 cards + map side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { icon: <MapPin size={17} />, iconColor: 'text-brand-orange', iconBg: 'bg-brand-orange/10 border-brand-orange/20', label: 'Head Office', lines: ['P.O. Box 20656, Liwara 2,', 'Ajman, United Arab Emirates'], href: undefined },
              { icon: <Phone size={17} />, iconColor: 'text-brand-blue', iconBg: 'bg-brand-blue/10 border-brand-blue/20', label: 'Call Us', lines: ['+971 6 534 8048', '+971 52 5060 253'], href: 'tel:+971525060253' },
              { icon: <Mail size={17} />, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Email Us', lines: ['info@caldofreddo.me', 'tom@caldofreddo.me'], href: 'mailto:tom@caldofreddo.me' },
              { icon: <Clock size={17} />, iconColor: 'text-purple-400', iconBg: 'bg-purple-500/10 border-purple-500/20', label: 'Office Hours', lines: ['Mon–Fri: 9 AM – 6 PM', 'Sat: 9 AM – 1 PM (GST)'], href: undefined },
            ].map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                {card.href ? (
                  <a href={card.href} className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 h-full card-dark rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/6 transition-all duration-300 group">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center lg:mb-4 flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>{card.icon}</div>
                    <div>
                      <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest lg:mb-1.5 mb-0.5">{card.label}</p>
                      {card.lines.map((l, j) => <p key={j} className="text-white/80 text-sm font-medium leading-snug group-hover:text-white transition-colors">{l}</p>)}
                    </div>
                  </a>
                ) : (
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 h-full card-dark rounded-xl sm:rounded-2xl p-4 sm:p-5">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center lg:mb-4 flex-shrink-0 ${card.iconBg} ${card.iconColor}`}>{card.icon}</div>
                    <div>
                      <p className="text-slate-500 font-mono text-[9px] uppercase tracking-widest lg:mb-1.5 mb-0.5">{card.label}</p>
                      {card.lines.map((l, j) => <p key={j} className="text-white/80 text-sm font-medium leading-snug">{l}</p>)}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Map — 5th card in the same row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28 }}
              className="sm:col-span-2 lg:col-span-1 card-dark rounded-xl sm:rounded-2xl overflow-hidden"
              style={{ minHeight: '140px' }}
            >
              <iframe
                title="Caldo Freddo Office Location"
                className="w-full h-full"
                style={{ minHeight: '140px', filter: 'grayscale(60%) invert(90%) contrast(85%)' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.0!2d55.4500!3d25.4000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI0JzAwLjAiTiA1NcKwMjcnMDAuMCJF!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>

          {/* Contact form — full width */}
          <div className="card-dark no-hover rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <h3 className="font-display font-bold text-white text-xl sm:text-2xl lg:text-3xl mb-1.5">Send a Message</h3>
              </div>
            </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleContact} className="space-y-4 sm:space-y-5">

                    {/* Row 1 — 4 fields side by side on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Full Name *</label>
                        <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Eng. Abdullah Al-Mansouri" className="input-dark" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Company Name</label>
                        <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Company LLC" className="input-dark" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email Address *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="input-dark" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Phone Number *</label>
                        <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+971 52 000 0000" className="input-dark" />
                      </div>
                    </div>

                    {/* Row 2 — product interest full width */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Product / Service Interest</label>
                      <input type="text" value={form.product} onChange={e => setForm({ ...form, product: e.target.value })} placeholder="e.g. Ultrasonic Cleaning Systems, Rack Armour Barriers..." className="input-dark" />
                    </div>

                    {/* Row 3 — message, taller textarea */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Your Message *</label>
                      <textarea required rows={5} value={form.query} onChange={e => setForm({ ...form, query: e.target.value })} placeholder="Describe your project requirements, component dimensions, facility type, or any other relevant details..." className="input-dark resize-none" />
                    </div>

                    {/* Submit */}
                    {contactError && (
                      <p className="text-xs font-semibold text-red-300 bg-red-950/30 border border-red-900 rounded-lg px-3 py-2">
                        {contactError}
                      </p>
                    )}
                    <div className="flex flex-row flex-wrap items-center gap-4 pt-1">
                      <button type="submit" disabled={contactSubmitting} className="btn-primary px-10 disabled:opacity-60 disabled:cursor-not-allowed">
                        <Send size={15} /> {contactSubmitting ? 'Sending...' : 'Send Message to Specialist'}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 sm:py-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 mb-5">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-white font-display font-bold text-xl sm:text-2xl mb-2">Message Received!</h4>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto">
                      Thank you, <span className="text-white font-semibold">{form.name}</span>. Our specialist will reach out within one working day.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="bg-[#020910] relative">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />

        <div className="cx">
          {/* 4-column grid: brand | links | services | contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12 border-b border-white/[0.05]">

            {/* Brand */}
            <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
              <Logo className="h-12 sm:h-14 w-auto" />
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The UAE's leading specialist in industrial cleaning systems, polymer barrier protection, and eco-friendly industrial solutions across the GCC.
              </p>
              <div className="flex gap-2 sm:gap-2.5">
                {[
                  { icon: <Facebook  size={16} />, title: 'Facebook', href: companyContact.facebook },
                  { icon: <Twitter   size={16} />, title: 'Twitter',  href: companyContact.twitter  },
                  { icon: <Linkedin  size={16} />, title: 'LinkedIn', href: companyContact.linkedin },
                  { icon: <Youtube   size={16} />, title: 'YouTube',  href: companyContact.youtube  },
                ].map(s => (
                  <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={`Caldo Freddo on ${s.title}`}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-orange hover:border-brand-orange transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70">
                    {s.icon}
                  </a>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/4 border border-white/8 rounded-xl">
                <ShieldCheck size={13} className="text-brand-orange" />
                <span className="text-white/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-bold">GCC Certified Operations</span>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h5 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.18em] font-bold mb-4 sm:mb-5">Quick Links</h5>
              <ul className="space-y-2 sm:space-y-2.5">
                {[
                  { label: 'Home',             href: '#home'     },
                  { label: 'Our Services',      href: '#services' },
                  { label: 'Product Catalogue', href: '#products' },
                  { label: 'About Us',          href: '#about'    },
                  { label: 'Contact Us',        href: '#contact'  },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-slate-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 group">
                      <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs">›</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.18em] font-bold mb-4 sm:mb-5">Services</h5>
              <ul className="space-y-2 sm:space-y-2.5">
                {['Ultrasonic Cleaning Systems', 'Polymer Bumper Barriers', 'Industrial Protection Coatings', 'Eco-Friendly Solutions', 'Annual Maintenance Contract'].map(s => (
                  <li key={s}>
                    <a href="#services" className="text-slate-500 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5 group">
                      <span className="text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity text-xs">›</span>
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="text-white/80 font-mono text-[10px] uppercase tracking-[0.18em] font-bold mb-4 sm:mb-5">Contact</h5>
              <div className="space-y-3 sm:space-y-4">
                <a href="tel:+971525060253" className="flex items-start gap-2.5 text-slate-500 hover:text-white text-sm transition-colors">
                  <Phone size={13} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>+971 52 5060 253</span>
                </a>
                <a href="mailto:tom@caldofreddo.me" className="flex items-start gap-2.5 text-slate-500 hover:text-white text-sm transition-colors">
                  <Mail size={13} className="text-brand-blue flex-shrink-0 mt-0.5" />
                  <span>tom@caldofreddo.me</span>
                </a>
                <div className="flex items-start gap-2.5 text-slate-500 text-sm">
                  <MapPin size={13} className="text-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">P.O. Box 20656,<br />Ajman, UAE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 py-5 sm:py-6">
            <p className="text-slate-600 text-xs font-mono text-center sm:text-left">
              © {new Date().getFullYear()} Caldo Freddo · Jeser Al Arab General Trading LLC · All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs font-mono">Registered in the</span>
              <span className="text-slate-400 text-xs font-bold">United Arab Emirates 🇦🇪</span>
            </div>
          </div>
        </div>
      </footer>

      <QuoteModal isOpen={quoteOpen} onClose={closeQuote} services={services} preselectedServiceId={svcId} preselectedProductName={prodName} />
    </div>
  );
}
