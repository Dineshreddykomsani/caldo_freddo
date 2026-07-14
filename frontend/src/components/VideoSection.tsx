    import { motion, useReducedMotion } from "motion/react";
    import { ArrowRight, PlayCircle, ShieldCheck, Sparkles, Gauge } from "lucide-react";

    const featureStripVariants = {
      hidden: {},
      show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
    };

    const featureItemVariants = {
      hidden: { opacity: 0, y: 15 },
      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    interface VideoSectionProps {
    onRequestQuote?: () => void;
    }

    export default function VideoSection({
    onRequestQuote,
    }: VideoSectionProps) {
    const prefersReducedMotion = useReducedMotion();
    return (
        <section
        id="video"
        className="relative overflow-hidden py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-[#07121E] via-[#0B1A29] to-[#07121E]"
        >
        {/* Background Effects */}

        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#2DBEF2]/10 blur-[220px]" />

        <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#F37021]/10 blur-[220px]" />

        <div className="relative max-w-[1500px] mx-auto px-6">

            {/* ================= SECTION HEADER ================= */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="text-center max-w-5xl mx-auto"
>

  {/* Badge */}

  <motion.div
    initial={{ opacity: 0, y: 15, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1, duration: 0.5 }}
    className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#F37021]/25 bg-[#F37021]/[0.06] text-[#F37021] font-mono text-xs md:text-sm uppercase tracking-[0.3em] justify-center mb-6"
  >
    <PlayCircle size={14} className="animate-pulse" />
    <span>CORPORATE VIDEO</span>
  </motion.div>

  {/* Heading */}

  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="
      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      font-sans
      font-black
      tracking-tight
      leading-[1.08]
      text-white
    "
  >
    Advanced Ultrasonic

    <span className="block text-[#2DBEF2] mt-2">
      Washing Machines
    </span>

  </motion.h2>

  {/* Description */}

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.35 }}
    className="
      mt-8
      max-w-4xl
      mx-auto
      text-base md:text-lg
      text-slate-400
      leading-relaxed
      font-normal
    "
  >
    Discover Caldo Freddo's premium ultrasonic washing machines,
    engineered for industrial kitchens, hotels, food processing,
    healthcare facilities and commercial applications. Designed
    to deliver superior cleaning performance, exceptional hygiene,
    reduced operating costs and long-term reliability for demanding
    business environments.
  </motion.p>

</motion.div>

            {/* ================= VIDEO ================= */}

            <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .8, ease: "easeOut" }}
            whileHover={{ scale: 1.007 }}
            className="
            relative
            mt-20
            max-w-7xl
            mx-auto
            group
            "
            >
                {/* Rotating gradient border glow — only animates on hover, skips for reduced-motion users */}
                <motion.div
                  aria-hidden
                  animate={prefersReducedMotion ? {} : { rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-[38px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none bg-[conic-gradient(from_0deg,#2DBEF2,#F37021,#2DBEF2)] blur-md motion-reduce:hidden"
                />
                            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[36px]
                    border
                    border-[#2DBEF2]/20
                    group-hover:border-[#2DBEF2]/40
                    bg-[#112335]
                    shadow-[0_40px_120px_rgba(0,0,0,.55)]
                    group-hover:shadow-[0_50px_140px_rgba(0,0,0,.65)]
                    transition-all duration-500
                "
                >

                {/* Animated Glow */}

                <motion.div
                  animate={prefersReducedMotion ? {} : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-32 -left-32 w-[350px] h-[350px] rounded-full bg-[#2DBEF2]/10 blur-[140px]"
                />

                <motion.div
                  animate={prefersReducedMotion ? {} : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full bg-[#F37021]/10 blur-[140px]"
                />

                {/* Premium Header */}

                <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#17324B] via-[#1A3956] to-[#17324B] border-b border-white/10">
                    <div className="flex items-center gap-3">
                    <div className="hidden sm:flex w-9 h-9 rounded-xl bg-[#2DBEF2]/12 border border-[#2DBEF2]/25 items-center justify-center text-[#2DBEF2] flex-shrink-0">
                        <PlayCircle size={18} />
                    </div>
                    <div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-white leading-tight">
                        Corporate Product Presentation
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#2DBEF2]">
                        Ultrasonic Washing Machine Demonstration
                    </p>
                    </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <span className="relative flex-shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400 flex"></span>
                      <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping"></span>
                    </span>
                    <span className="text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
                        Live Demo
                    </span>
                    </div>
                </div>

                {/* Video */}

               <div className="relative bg-black">
  <div className="aspect-video w-full">
    <iframe
      className="w-full h-full rounded-b-[36px]"
      src="https://www.youtube.com/embed/-f1m0nKBw7Y?autoplay=1&mute=1&loop=1&playlist=-f1m0nKBw7Y&rel=0&modestbranding=1"
      title="Caldo Freddo Corporate Video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  </div>
</div>

                </div>

            </motion.div>

            {/* ================= FEATURE STRIP ================= */}

            <motion.div
              variants={featureStripVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 sm:mt-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {[
                { icon: <Gauge size={16} />, label: "4K Ultra HD Footage" },
                { icon: <ShieldCheck size={16} />, label: "Certified Production Process" },
                { icon: <Sparkles size={16} />, label: "Real Client Facility Footage" },
              ].map((f) => (
                <motion.div
                  key={f.label}
                  variants={featureItemVariants}
                  whileHover={{ y: -3, borderColor: "rgba(45,190,242,0.4)" }}
                  className="flex items-center gap-2.5 justify-center sm:justify-start px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 text-sm font-medium"
                >
                  <span className="text-[#2DBEF2]">{f.icon}</span>
                  {f.label}
                </motion.div>
              ))}
            </motion.div>

            {/* ================= REQUEST CALL ================= */}

<motion.div
  initial={{ opacity: 0, y: 70 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.8,
    delay: 0.2,
  }}
  className="mt-20 max-w-6xl mx-auto"
>
  <div
    className="
      rounded-[36px]
      border
      border-[#2DBEF2]/20
      bg-gradient-to-r
      from-[#17324B]
      via-[#1B3A58]
      to-[#17324B]
      px-5 sm:px-10 md:px-16
      py-10 sm:py-14 md:py-16
      text-center
      shadow-[0_30px_90px_rgba(0,0,0,.45)]
    "
  >
    {/* Badge */}

    <div className="inline-flex items-center gap-3 text-[#F37021] font-mono text-base
md:text-lg
leading-8 uppercase tracking-[0.35em] justify-center mb-6">
      <div className="w-8 h-[2px] bg-[#F37021]" />

      <span>CONSULTATION</span>

      <div className="w-8 h-[2px] bg-[#F37021]" />
    </div>

    {/* Heading */}

    <h3
      className="
        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-sans
        font-black
        tracking-tight
        leading-[1.08]
        text-white
      "
    >
      Ready To Transform

      <span className="block text-[#2DBEF2] mt-2">
        Your Cleaning Process?
      </span>
    </h3>

    {/* Description */}

    <p
      className="
        mt-7
        max-w-3xl
        mx-auto
        text-base
        md:text-lg
        text-slate-400
        leading-8
        font-normal
      "
    >
      Speak directly with our product specialists to discover
      the ideal ultrasonic washing machine for your business.
      Our experts will recommend the perfect solution based on
      your industry, production capacity and operational
      requirements, ensuring maximum performance,
      superior cleaning quality and long-term reliability.
    </p>

    {/* Buttons */}

    <div className="flex flex-col xs:flex-row justify-center gap-4 mt-10 sm:mt-12">

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRequestQuote}
        className="btn-primary justify-center"
      >
        Request A Call
        <ArrowRight size={16} />
      </motion.button>

      <a
        href="tel:+971525060253"
        className="btn-secondary justify-center"
      >
        Call Now
      </a>

    </div>
  </div>
</motion.div>
        </div>

        {/* Decorative Floating Elements */}

        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute top-24 left-20 w-4 h-4 rounded-full bg-[#2DBEF2]/40"
        />

        <motion.div
            animate={prefersReducedMotion ? {} : {
            y: [-12, 12, -12],
            }}
            transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            }}
            className="absolute top-40 right-24 w-6 h-6 rounded-full border border-[#2DBEF2]/40"
        />

        <motion.div
            animate={prefersReducedMotion ? {} : {
            y: [15, -15, 15],
            }}
            transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            }}
            className="absolute bottom-28 left-24 w-5 h-5 rounded-full bg-[#F37021]/40"
        />

        {/* Large Background Blur */}

        <div className="absolute left-0 bottom-0 w-[600px] h-[600px] rounded-full bg-[#2DBEF2]/5 blur-[220px]" />

        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-[#F37021]/5 blur-[220px]" />

        {/* Bottom Divider */}

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2DBEF2]/40 to-transparent" />
            
        </section>
    );
    }
