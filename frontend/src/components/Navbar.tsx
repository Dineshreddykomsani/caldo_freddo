import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X, ArrowUpRight, ChevronDown, Info, BookOpen, MessageSquare } from 'lucide-react';
import Logo from './Logo';
import { CompanyContact } from '../api';

interface NavbarProps {
  onRequestQuote: () => void;
  companyContact: CompanyContact;
}

export default function Navbar({ onRequestQuote, companyContact }: NavbarProps) {
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyOpen,    setCompanyOpen]    = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  /* Close company dropdown when clicking outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setCompanyOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const mainLinks = [
    { name: 'Home',         href: '#home'          },
    { name: 'Why Us',       href: '#why-choose-us' },
    { name: 'Services',     href: '#services'      },
    { name: 'Portfolio',    href: '#products'      },
  ];

  const companyLinks = [
    { name: 'About Us',   href: '#about',                 icon: <Info size={14} />,          desc: 'Our story, mission & partners'   },
    { name: 'Partnership', href: '#exclusive-partnership', icon: <BookOpen size={14} />,       desc: 'UltraTecno sole distributor & video'     },
    { name: 'Contact',    href: '#contact',               icon: <MessageSquare size={14} />,  desc: 'Talk to a product specialist'    },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setCompanyOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = isScrolled ? 64 : 120;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-[#071120]/97 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_6px_24px_rgba(0,0,0,0.4)]'
        : 'bg-[#071120]'
    }`}>

      {/* ── Top info bar (desktop only) ── */}
      <motion.div
        animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.28, ease: 'easeInOut' }}
        className="hidden lg:block overflow-hidden border-b border-white/[0.06]"
      >
        <div className="cx">
          <div className="flex items-center justify-between h-14 md:h-16 gap-4">

            <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex-shrink-0">
              <Logo className="h-11 md:h-14 w-auto" />
            </a>

            <div className="hidden lg:flex items-center divide-x divide-white/10 flex-1 justify-end">
              <div className="flex items-center gap-2.5 pr-6">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-brand-orange" />
                </div>
                <div className="leading-tight">
                  <p className="text-brand-blue text-[9px] font-mono font-bold uppercase tracking-widest">Jeser Al Arab</p>
                  <p className="text-white text-[11px] font-medium mt-0.5">UAE & Saudi Arabia</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-6">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Phone size={13} className="text-brand-blue" />
                </div>
                <div className="leading-tight">
                  <p className="text-brand-blue text-[9px] font-mono font-bold uppercase tracking-widest">Contact</p>
                  <a href={`tel:${companyContact.phone}`} className="text-white text-[11px] font-semibold mt-0.5 block hover:text-brand-orange transition-colors">
                    {companyContact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-6">
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Mail size={13} className="text-brand-orange" />
                </div>
                <div className="leading-tight">
                  <p className="text-brand-blue text-[9px] font-mono font-bold uppercase tracking-widest">Email</p>
                  <a href={`mailto:${companyContact.email}`} className="text-white text-[11px] font-semibold mt-0.5 block hover:text-brand-orange transition-colors">
                    {companyContact.email}
                  </a>
                </div>
              </div>

              <div className="pl-6">
                <button onClick={onRequestQuote} className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-[11px] font-bold tracking-[0.06em] uppercase rounded-lg transition-all duration-200 shadow-sm shadow-brand-orange/20 hover:shadow-brand-orange/30">
                  Request A Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ── Primary nav bar ── */}
      <div className="bg-[#030b16]/80 border-b border-white/[0.05]">
        <div className="cx">
          <div className="flex items-center h-16 lg:h-14 gap-1">

            {/* On mobile: logo always visible (top bar is hidden). On desktop: only when scrolled */}
            <a
              href="#home"
              onClick={(e) => scrollTo(e, '#home')}
              className={`flex-shrink-0 mr-4 ${isScrolled ? 'block' : 'block lg:hidden'}`}
            >
              <Logo className="h-9 md:h-10 lg:h-12 w-auto" />
            </a>

            {/* Nav links — desktop */}
            <nav className="hidden lg:flex items-center gap-0.5 flex-1" role="navigation">
              {mainLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="px-3.5 py-2 text-[12.5px] xl:text-[13px] font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}

              {/* Company dropdown */}
              <div ref={companyRef} className="relative">
                <button
                  onClick={() => setCompanyOpen(o => !o)}
                  aria-expanded={companyOpen}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[12.5px] xl:text-[13px] font-semibold rounded-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${companyOpen ? 'text-white bg-white/8' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  Company
                  <ChevronDown size={13} className={`transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {companyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute top-full left-0 mt-1.5 w-56 bg-[#0d1f35] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      {companyLinks.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => scrollTo(e, item.href)}
                          className="flex items-start gap-3 px-4 py-3.5 hover:bg-white/6 transition-colors group border-b border-white/[0.05] last:border-0"
                        >
                          <div className="mt-0.5 text-brand-orange flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-white/90 text-sm font-semibold leading-tight group-hover:text-white transition-colors">{item.name}</p>
                            <p className="text-slate-500 text-[11px] mt-0.5 leading-tight">{item.desc}</p>
                          </div>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right: phone + CTA */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto flex-shrink-0">
              <a href={`tel:${companyContact.phone}`} className="flex items-center gap-2 text-white hover:text-brand-orange transition-colors group">
                <div className="w-7 h-7 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                  <Phone size={13} className="text-brand-orange" />
                </div>
                <div className="leading-tight hidden xl:block">
                  <span className="block text-brand-orange font-mono font-bold text-[11px]">{companyContact.phone}</span>
                  <span className="block text-slate-500 text-[9px] font-mono uppercase tracking-wider">Call Now</span>
                </div>
              </a>

              {isScrolled && (
                <button onClick={onRequestQuote} className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-orange-600 text-white text-[11px] font-bold tracking-[0.06em] uppercase rounded-lg transition-all duration-200 shadow-sm shadow-brand-orange/20 hover:shadow-brand-orange/30">
                  Request A Quote
                </button>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0, 0.25, 1] }}
            className="overflow-hidden bg-[#071120] border-b border-white/[0.06] lg:hidden"
          >
            <div className="cx py-3 space-y-0.5">
              {mainLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="flex items-center justify-between py-3 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
                >
                  <span>{item.name}</span>
                  <ArrowUpRight size={14} className="text-slate-500" />
                </a>
              ))}

              {/* Company sub-links inline on mobile */}
              <div className="px-4 pt-2 pb-1">
                <p className="text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-2">Company</p>
                <div className="space-y-0.5 pl-1 border-l border-white/10">
                  {companyLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => scrollTo(e, item.href)}
                      className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
                    >
                      <span className="text-brand-orange/60">{item.icon}</span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-2 space-y-2 border-t border-white/[0.06]">
                <div className="grid grid-cols-2 gap-2 px-1">
                  <a href={`tel:${companyContact.phone}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/4 text-white text-sm font-semibold">
                    <Phone size={15} className="text-brand-orange flex-shrink-0" />
                    <span className="truncate">Call Us</span>
                  </a>
                  <a href={`mailto:${companyContact.email}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/4 text-white text-sm font-semibold">
                    <Mail size={15} className="text-brand-blue flex-shrink-0" />
                    <span className="truncate">Email Us</span>
                  </a>
                </div>
                <div className="px-1 pb-1">
                  <button
                    onClick={() => { setMobileMenuOpen(false); onRequestQuote(); }}
                    className="btn-primary w-full justify-center text-sm py-3"
                  >
                    Request A Free Quote
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
