import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, ExternalLink, ShieldCheck, HelpCircle, Layers, ArrowRight, Tag,
  Activity, FileText, ChevronDown, ChevronUp, Package, Leaf, Hotel, Wrench
} from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  products: Product[];
  onRequestQuote: (productName: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'All':                                  return <Layers size={12} />;
    case 'Industrial Products':                  return <Package size={12} />;
    case 'Natural Eco Friendly Green Products':  return <Leaf size={12} />;
    case 'PVC & ABS Products':                   return <Layers size={12} />;
    case 'Curtains, Healthcare & Hospitality':   return <Hotel size={12} />;
    default:                                     return <Wrench size={12} />;
  }
};

const getCategoryBadgeClass = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'bg-orange-50 text-brand-orange border-orange-200';
    case 'Natural Eco Friendly Green Products':  return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'PVC & ABS Products':                   return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Curtains, Healthcare & Hospitality':   return 'bg-purple-50 text-purple-700 border-purple-200';
    default:                                     return 'bg-teal-50 text-teal-700 border-teal-200';
  }
};

const getCategoryHoverClass = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'hover:border-brand-orange/50 hover:shadow-[0_16px_48px_-12px_rgba(243,112,33,0.18)]';
    case 'Natural Eco Friendly Green Products':  return 'hover:border-emerald-400/50 hover:shadow-[0_16px_48px_-12px_rgba(16,185,129,0.14)]';
    case 'PVC & ABS Products':                   return 'hover:border-blue-400/50 hover:shadow-[0_16px_48px_-12px_rgba(59,130,246,0.14)]';
    case 'Curtains, Healthcare & Hospitality':   return 'hover:border-purple-400/50 hover:shadow-[0_16px_48px_-12px_rgba(168,85,247,0.14)]';
    default:                                     return 'hover:border-teal-400/50 hover:shadow-[0_16px_48px_-12px_rgba(20,184,166,0.14)]';
  }
};

const getCategoryAccentBg = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'bg-brand-orange';
    case 'Natural Eco Friendly Green Products':  return 'bg-emerald-500';
    case 'PVC & ABS Products':                   return 'bg-blue-500';
    case 'Curtains, Healthcare & Hospitality':   return 'bg-purple-500';
    default:                                     return 'bg-teal-500';
  }
};

const getCategoryGlowBg = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'from-orange-100/80 via-orange-50/50';
    case 'Natural Eco Friendly Green Products':  return 'from-emerald-100/80 via-emerald-50/50';
    case 'PVC & ABS Products':                   return 'from-blue-100/80 via-blue-50/50';
    case 'Curtains, Healthcare & Hospitality':   return 'from-purple-100/80 via-purple-50/50';
    default:                                     return 'from-teal-100/80 via-teal-50/50';
  }
};

const getCategoryTitleHover = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'group-hover:text-brand-orange';
    case 'Natural Eco Friendly Green Products':  return 'group-hover:text-emerald-700';
    case 'PVC & ABS Products':                   return 'group-hover:text-blue-700';
    case 'Curtains, Healthcare & Hospitality':   return 'group-hover:text-purple-700';
    default:                                     return 'group-hover:text-teal-700';
  }
};

const getCategoryDividerHover = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'group-hover:border-orange-200';
    case 'Natural Eco Friendly Green Products':  return 'group-hover:border-emerald-200';
    case 'PVC & ABS Products':                   return 'group-hover:border-blue-200';
    case 'Curtains, Healthcare & Hospitality':   return 'group-hover:border-purple-200';
    default:                                     return 'group-hover:border-teal-200';
  }
};

const getCategoryCtaHover = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'group-hover:bg-orange-50/60';
    case 'Natural Eco Friendly Green Products':  return 'group-hover:bg-emerald-50/60';
    case 'PVC & ABS Products':                   return 'group-hover:bg-blue-50/60';
    case 'Curtains, Healthcare & Hospitality':   return 'group-hover:bg-purple-50/60';
    default:                                     return 'group-hover:bg-teal-50/60';
  }
};

const getNumberGradient = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'from-brand-orange via-orange-400 to-amber-300';
    case 'Natural Eco Friendly Green Products':  return 'from-emerald-400 via-green-400 to-teal-300';
    case 'PVC & ABS Products':                   return 'from-blue-400 via-sky-400 to-cyan-300';
    case 'Curtains, Healthcare & Hospitality':   return 'from-purple-400 via-violet-400 to-pink-300';
    default:                                     return 'from-teal-400 via-cyan-400 to-blue-300';
  }
};

const getCategoryRing = (category: string) => {
  switch (category) {
    case 'Industrial Products':                  return 'ring-brand-orange/40';
    case 'Natural Eco Friendly Green Products':  return 'ring-emerald-500/40';
    case 'PVC & ABS Products':                   return 'ring-blue-500/40';
    case 'Curtains, Healthcare & Hospitality':   return 'ring-purple-500/40';
    default:                                     return 'ring-white/20';
  }
};

const productImages: Record<number, string> = {
  1:  'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=200',
  2:  'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=200',
  3:  'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=200',
  4:  'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=200',
  5:  'https://images.pexels.com/photos/2569842/pexels-photo-2569842.jpeg?auto=compress&cs=tinysrgb&w=200',
  6:  'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=200',
  7:  'https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=200',
  8:  'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export default function ProductCatalog({ products, onRequestQuote }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAll, setShowAll] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => list.add(p.category));
    return ['All', ...Array.from(list)];
  }, [products]);

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) ||
      (p.description?.toLowerCase().includes(q) ?? false) ||
      (p.manufacturerName?.toLowerCase().includes(q) ?? false) ||
      p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  }), [selectedCategory, searchQuery]);

  const displayedProducts = useMemo(() =>
    showAll ? filteredProducts : filteredProducts.slice(0, 6),
    [filteredProducts, showAll]
  );

  const catCount = (cat: string) => cat === 'All' ? products.length : products.filter(p => p.category === cat).length;

  return (
    <section id="products" className="py-10 sm:py-14 lg:py-16 bg-white relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand-orange/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full" />
      </div>

      <div className="cx relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 space-y-2 sm:space-y-3 px-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-brand-orange"
          >
            <div className="w-6 sm:w-8 h-[2px] bg-brand-orange" />
            <span>Product Catalogue</span>
            <div className="w-6 sm:w-8 h-[2px] bg-brand-orange" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-display font-black text-slate-900 text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight"
          >
            Explore Our Comprehensive Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Caldo Freddo supplies premium, highly compliant industrial products, green eco-friendly devices, and professional technical services across the GCC.
          </motion.p>
        </div>

        {/* Filter Controls */}
        <div className="mb-5 sm:mb-6 space-y-2.5 sm:space-y-3 max-w-4xl mx-auto">
          {/* Search */}
          <div className={`flex items-center gap-2.5 sm:gap-3 bg-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 shadow-sm ${
            isFocused
              ? 'border-brand-orange shadow-[0_0_0_3px_rgba(243,112,33,0.15)]'
              : 'border-slate-200'
          }`}>
            <Search size={16} className="text-brand-orange flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={searchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => { setSearchQuery(e.target.value); setShowAll(false); }}
              aria-label="Search products, brands, or categories"
              className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-slate-900 placeholder-slate-400 min-w-0"
            />
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center scrollbar-hide">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setShowAll(false); }}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-bold border transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70 ${
                    active
                      ? 'bg-brand-orange border-brand-orange text-white shadow-md shadow-brand-orange/25'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-brand-orange/40 hover:text-slate-900 hover:bg-orange-50/50 shadow-sm'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-slate-400'}>
                    {getCategoryIcon(cat)}
                  </span>
                  {cat}
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {catCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product) => (
              <motion.article
                layout
                key={product.slNo}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.28,
                  layout: { type: 'spring', stiffness: 320, damping: 26 },
                }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.22, ease: 'easeOut' } }}
                className={`bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden shadow-sm ${getCategoryHoverClass(product.category)}`}
                id={`product-card-${product.slNo}`}
              >
                {/* Category top accent line — expands on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] group-hover:h-[5px] rounded-t-2xl transition-all duration-300 ${getCategoryAccentBg(product.category)}`} />


                {/* Top row: circle image + category badge */}
                <div className="flex items-start justify-between mb-4 pt-2">
                  <div className="overflow-hidden rounded-xl flex-shrink-0 shadow-sm">
                    <img
                      src={product.image || productImages[product.slNo] || 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=200'}
                      alt={product.name}
                      loading="lazy"
                      className={`w-11 h-11 rounded-xl object-cover ring-2 transition-transform duration-400 group-hover:scale-110 ${getCategoryRing(product.category)}`}
                    />
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-shadow duration-300 group-hover:shadow-sm ${getCategoryBadgeClass(product.category)}`}>
                    {product.category.length > 20 ? product.category.split(' ').slice(0, 2).join(' ') : product.category}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2 flex-1 flex flex-col relative z-10">
                  {/* Number + heading on same line */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-lg font-black font-mono leading-none select-none shrink-0 bg-gradient-to-br ${getNumberGradient(product.category)} bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110 inline-block`}>
                      {String(product.slNo).padStart(2, '0')}
                    </span>
                    <h3 className={`font-display font-bold text-slate-900 text-[15px] leading-snug transition-colors duration-300 ${getCategoryTitleHover(product.category)}`}>
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">
                    {product.description ?? 'Premium engineering solution tailored for demanding environments in the Middle East.'}
                  </p>

                  {/* Metadata */}
                  <div className={`pt-3 border-t border-slate-100 space-y-2 transition-colors duration-300 ${getCategoryDividerHover(product.category)}`}>
                    {product.manufacturerName && (
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={11} className="text-brand-orange flex-shrink-0" />
                        {product.manufacturerUrl ? (
                          <a
                            href={product.manufacturerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-orange hover:text-orange-600 font-semibold text-xs flex items-center gap-0.5 hover:underline"
                          >
                            {product.manufacturerName}
                            <ExternalLink size={9} />
                          </a>
                        ) : (
                          <span className="text-slate-700 font-semibold text-xs">{product.manufacturerName}</span>
                        )}
                      </div>
                    )}
                    {product.isOwnProduct && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        <Activity size={10} />
                        Caldo Freddo Proprietary
                      </div>
                    )}
                    {product.isOwnService && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                        <FileText size={10} />
                        Caldo Freddo Direct Service
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className={`mt-4 pt-3 border-t border-slate-100 flex items-center justify-between rounded-b-xl -mx-1 px-1 transition-all duration-300 ${getCategoryDividerHover(product.category)} ${getCategoryCtaHover(product.category)}`}>
                  <span className="text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1 uppercase tracking-wider">
                    <Tag size={9} className="text-brand-orange" /> GCC Compliant
                  </span>
                  <button
                    onClick={() => onRequestQuote(product.name)}
                    aria-label={`Request quote for ${product.name}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange hover:text-orange-600 transition-colors group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70 rounded"
                  >
                    Request Quote
                    <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-2xl max-w-md mx-auto w-full shadow-sm">
              <HelpCircle size={36} className="mx-auto text-slate-400 mb-4" />
              <h4 className="font-display font-bold text-slate-800 mb-1">No matching products found</h4>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Try searching for another term or selecting a different category.</p>
            </div>
          )}
        </motion.div>

        {/* Show more */}
        {filteredProducts.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 sm:mt-8 text-center"
          >
            <button
              onClick={() => {
                if (showAll) {
                  // Collapse: wait for exit animations (~320ms) then smoothly return to section top
                  setShowAll(false);
                  setTimeout(() => {
                    const section = document.getElementById('products');
                    if (section) {
                      const y = section.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 320);
                } else {
                  // Expand: freeze current scroll so layout shift doesn't jump the page
                  const lockedY = window.scrollY;
                  setShowAll(true);
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: lockedY, behavior: 'instant' as ScrollBehavior });
                  });
                }
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-orange border border-brand-orange text-white hover:bg-orange-600 hover:border-orange-600 font-bold text-sm rounded-xl transition-all duration-300 cursor-pointer shadow-md shadow-brand-orange/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/70"
            >
              {showAll ? 'Show Fewer Products' : `Show All Solutions (${filteredProducts.length})`}
              {showAll
                ? <ChevronUp size={14} />
                : <ChevronDown size={14} />
              }
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
