import { useState, useRef, type CSSProperties, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Truck, Award, Leaf } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ProductCard } from '../components/ProductCard';
import { HeroProductSkeleton } from '../components/Skeleton';
import { useApi } from '../hooks/useApi';
import type { Product } from '../types';

/* ── Steam particles (CSS-driven, zero JS cost) ─────── */
const STEAM = [
  { left: '18%', dur: '4.2s', delay: '0s',   size: 64, alt: false },
  { left: '32%', dur: '5.1s', delay: '0.9s', size: 80, alt: true  },
  { left: '50%', dur: '4.7s', delay: '1.6s', size: 56, alt: false },
  { left: '65%', dur: '5.5s', delay: '0.4s', size: 72, alt: true  },
  { left: '78%', dur: '4.0s', delay: '2.1s', size: 60, alt: false },
];

const SteamLayer = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-[15]">
    {STEAM.map((s, i) => (
      <div
        key={i}
        className={s.alt ? 'steam-particle-alt' : 'steam-particle'}
        style={{
          position: 'absolute',
          bottom: '12%',
          left: s.left,
          width: s.size,
          height: s.size,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
          filter: 'blur(18px)',
          '--dur': s.dur,
          '--delay': s.delay,
        } as CSSProperties}
      />
    ))}
  </div>
);

/* ── Mouse-reactive spotlight ────────────────────────── */
const MouseSpotlight = () => {
  const ref   = useRef<HTMLDivElement>(null);
  const rawX  = useMotionValue(0.5);
  const rawY  = useMotionValue(0.5);
  const x     = useSpring(rawX, { stiffness: 60, damping: 20 });
  const y     = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top)  / rect.height);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="absolute inset-0 z-[16] pointer-events-none overflow-hidden"
    >
      <motion.div
        style={{
          left:  useTransform(x, [0, 1], ['10%', '90%']),
          top:   useTransform(y, [0, 1], ['10%', '90%']),
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-auto"
        /* pointer-events-auto so the parent onMouseMove fires */
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
};

/* ── Hero ────────────────────────────────────────────── */
const HeroParallax = () => {
  const { scrollY } = useScroll();
  const imgY    = useTransform(scrollY, [0, 700], [0, 160]);
  const textY   = useTransform(scrollY, [0, 500], [0, -60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-[96vh] min-h-[640px] flex items-center overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 via-espresso/40 to-espresso/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2400"
          alt="Espresso pour"
          className="w-full h-full object-cover object-center film-filter"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <SteamLayer />
      <MouseSpotlight />

      {/* Hero text */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 max-w-7xl mx-auto w-full px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-xs uppercase tracking-[0.35em] mb-8 font-medium text-gold/80"
        >
          Est. 2018 &bull; Small-Batch &bull; Brooklyn
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] text-balance mb-10 text-cream"
        >
          Sip slowly.
          <br />
          <em className="not-italic" style={{ color: '#D4AF37' }}>Live fully.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.7 }}
          className="text-lg md:text-xl font-light max-w-md mb-12 text-cream/80 leading-relaxed"
        >
          Old-world roasting craft. New-world Brooklyn soul. Every bag a ritual.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7 }}
          className="flex flex-wrap gap-5 items-center"
        >
          <Link
            to="/menu"
            className="bg-gold text-espresso px-10 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-gold/80 transition-colors btn-float rounded-sm"
          >
            Shop Coffee
          </Link>
          <Link
            to="/quiz"
            className="border border-cream/30 text-cream px-10 py-4 uppercase tracking-widest text-xs font-semibold hover:border-gold hover:text-gold transition-colors btn-float rounded-sm"
          >
            Find Your Roast
          </Link>
          <Link
            to="/story"
            className="text-cream/70 uppercase tracking-widest text-xs font-semibold hover:text-gold transition-colors flex items-center gap-2"
          >
            Our Story <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-cream/40 text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-cream/30 to-transparent"
        />
      </motion.div>
    </section>
  );
};

/* ── Featured products ───────────────────────────────── */
const FeaturedProducts = () => {
  const { data: featured, loading } = useApi<Product[]>('/api/products/featured');

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-3">
              Current Offerings
            </p>
            <h2 className="font-serif text-4xl md:text-5xl">Crafted for your ritual.</h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 border-b border-espresso pb-1 uppercase tracking-widest text-xs font-semibold hover:text-gold hover:border-gold transition-colors self-start"
          >
            Full Pantry <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <HeroProductSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(featured ?? []).slice(0, 3).map((item, i) => (
              <ProductCard
                key={item.id}
                product={item}
                floatOffset={i === 1 ? 32 : 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ── Bean-to-Cup journey ─────────────────────────────── */
const STEPS = [
  { icon: Leaf,   label: 'Origin',    desc: 'Hand-selected from family farms in Ethiopia, Colombia & Guatemala' },
  { icon: Coffee, label: 'Roasted',   desc: 'Small-batch, to order, on our 1968 Probat drum roaster in Brooklyn' },
  { icon: Award,  label: 'Curated',   desc: 'Only the top 2% of each harvest makes it into your bag' },
  { icon: Truck,  label: 'Delivered', desc: 'Shipped within 24 hours of roasting, at peak flavor' },
];

const JourneySection = () => (
  <section className="py-24 px-6 bg-espresso text-cream">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-3">Bean to Cup</p>
        <h2 className="font-serif text-4xl md:text-5xl">Every step, intentional.</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {STEPS.map(({ icon: Icon, label, desc }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <Icon className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-serif text-xl mb-3">{label}</h3>
            <p className="text-cream/55 font-light text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Quiz teaser ─────────────────────────────────────── */
const QuizTeaser = () => (
  <section className="py-28 px-6 bg-white">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="aspect-square bg-espresso/5 rounded-sm p-4 md:p-8 transform -rotate-2">
        <div className="w-full h-full overflow-hidden rounded-tl-[100px] rounded-br-[100px]">
          <img
            src="https://picsum.photos/seed/cafestory/1000/1000"
            alt="Cafe interior"
            className="w-full h-full object-cover film-filter"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      <div className="max-w-lg">
        <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-4">
          Not sure where to start?
        </p>
        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          Find your perfect roast in 2 minutes.
        </h2>
        <p className="text-espresso-light font-light leading-relaxed mb-10 text-lg">
          Answer four questions about taste and brewing. We'll match you to the coffee you'll love.
        </p>
        <Link
          to="/quiz"
          className="inline-block bg-gold text-espresso px-10 py-4 uppercase tracking-widest text-xs font-semibold hover:bg-gold-muted transition-colors btn-float rounded-sm"
        >
          Take the Coffee Quiz
        </Link>
      </div>
    </div>
  </section>
);

/* ── Newsletter ──────────────────────────────────────── */
const Newsletter = () => {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-24 px-6 border-t border-espresso/8">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-4">
          Stay in the know
        </p>
        <h2 className="font-serif text-4xl mb-4">The Weekly Grind.</h2>
        <p className="text-espresso-light font-light mb-10 leading-relaxed">
          Roast notes, farmer stories, brew tips, and early access to seasonal releases — every Thursday.
        </p>
        {submitted ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-xl text-gold"
          >
            You're in. Welcome to the ritual.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 border-b border-espresso/25 bg-transparent py-3 outline-none focus:border-gold transition-colors placeholder:text-espresso/30 text-sm"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-espresso text-cream px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gold hover:text-espresso transition-colors btn-float rounded-sm shrink-0"
            >
              Subscribe
            </motion.button>
          </form>
        )}
      </div>
    </section>
  );
};

export const Home = () => (
  <PageTransition>
    <HeroParallax />
    <FeaturedProducts />
    <JourneySection />
    <QuizTeaser />
    <Newsletter />
  </PageTransition>
);
