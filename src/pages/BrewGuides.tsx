import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Clock, Thermometer, Scale } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

interface BrewGuide {
  id: string;
  method: string;
  tagline: string;
  img: string;
  time: string;
  temp: string;
  ratio: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  steps: string[];
  tip: string;
  bestWith: string;
}

const GUIDES: BrewGuide[] = [
  {
    id: 'espresso',
    method: 'Espresso',
    tagline: 'The foundation of Italian coffee culture.',
    img: 'https://picsum.photos/seed/brew-espresso/1200/700',
    time: '25–30 sec', temp: '93°C / 200°F', ratio: '1:2',
    difficulty: 'Advanced',
    steps: [
      'Preheat your machine and portafilter for at least 15 minutes.',
      'Dose 18–20g of finely ground coffee into the portafilter.',
      'Distribute evenly, then tamp with 30 lbs of pressure — level and firm.',
      'Lock in the portafilter and begin extraction immediately.',
      'Aim for 36–40g of liquid espresso in 25–30 seconds.',
      'Observe the crema: golden-brown and thick indicates proper extraction.',
    ],
    tip: 'If the shot runs fast and tastes sour, grind finer. If slow and bitter, grind coarser.',
    bestWith: 'Oaxacan Single Origin, Tuscan Sunrise Blend',
  },
  {
    id: 'pourover',
    method: 'Pour Over',
    tagline: 'Precision, patience, and a perfect cup.',
    img: 'https://picsum.photos/seed/brew-pourover/1200/700',
    time: '3–4 min', temp: '93–96°C / 200–205°F', ratio: '1:16',
    difficulty: 'Intermediate',
    steps: [
      'Place a paper filter in your dripper and rinse with hot water.',
      'Add 25g of medium-ground coffee (coarse sand consistency).',
      'Pour 50ml in slow circles to bloom for 30 seconds.',
      'Continue pouring in slow, concentric circles, keeping the water level steady.',
      'Pour in 3–4 stages, reaching 400ml total by the 3-minute mark.',
      'Let the dripper drain — total time should be 3:30–4:00.',
    ],
    tip: 'The bloom releases CO₂ from freshly roasted beans, ensuring even extraction.',
    bestWith: 'Ethiopian Yirgacheffe, Tuscan Sunrise Blend',
  },
  {
    id: 'frenchpress',
    method: 'French Press',
    tagline: 'Full immersion. Full body. Full flavor.',
    img: 'https://picsum.photos/seed/brew-french/1200/700',
    time: '4 min', temp: '93°C / 200°F', ratio: '1:15',
    difficulty: 'Easy',
    steps: [
      'Preheat your French press with hot water, then discard.',
      'Add 30g of coarsely ground coffee — think raw sugar crystals.',
      'Pour 450ml of hot water, ensuring all grounds are saturated.',
      'Place the lid on but do not press. Set a timer for 4 minutes.',
      'At 4 minutes, press the plunger down slowly and steadily.',
      'Pour immediately — leaving it in the press will over-extract.',
    ],
    tip: 'French press produces a heavy, textured cup thanks to the metal filter. Embrace the body.',
    bestWith: 'Decaf House Blend, Oaxacan Single Origin',
  },
  {
    id: 'aeropress',
    method: 'AeroPress',
    tagline: 'The most versatile brewer ever made.',
    img: 'https://picsum.photos/seed/brew-aero/1200/700',
    time: '1–2 min', temp: '80–96°C / 175–205°F', ratio: '1:12–1:16',
    difficulty: 'Intermediate',
    steps: [
      'Insert a paper filter, rinse with hot water, and screw onto the chamber.',
      'Place on your mug and add 17g of medium-fine ground coffee.',
      'Pour 200ml at 88°C and stir gently for 10 seconds.',
      'Insert the plunger and steep for 1 minute.',
      'Press down slowly and steadily over 30 seconds.',
      'Stop when you hear the first hiss of air.',
    ],
    tip: 'Try the inverted method or different temperatures — AeroPress rewards experimentation.',
    bestWith: 'Ethiopian Yirgacheffe, Tuscan Sunrise Blend',
  },
  {
    id: 'coldbrew',
    method: 'Cold Brew',
    tagline: 'Slow, smooth, and worth the wait.',
    img: 'https://picsum.photos/seed/brew-cold/1200/700',
    time: '12–18 hours', temp: 'Cold water', ratio: '1:8',
    difficulty: 'Easy',
    steps: [
      'Coarsely grind 100g of coffee — coarser than French press.',
      'Combine with 800ml of cold filtered water in a jar or pitcher.',
      'Stir gently to ensure all grounds are saturated.',
      'Cover and refrigerate for 12–18 hours. Longer = stronger.',
      'Strain through a fine mesh sieve or cheesecloth.',
      'Serve over ice, diluted 1:1 with water or milk, or as concentrate.',
    ],
    tip: 'Cold brew keeps refrigerated for up to 2 weeks. Brew a large batch Sunday for the whole week.',
    bestWith: 'Ethiopian Yirgacheffe, Oaxacan Single Origin',
  },
];

const DIFFICULTY_STYLES = {
  Easy:         'text-emerald-700 bg-emerald-50 border-emerald-200',
  Intermediate: 'text-amber-700  bg-amber-50  border-amber-200',
  Advanced:     'text-rose-700   bg-rose-50   border-rose-200',
};

/* ── Scroll-telling step: animates in as it enters viewport ── */
const ScrollStep = ({
  index,
  text,
  isLast,
}: {
  index: number;
  text: string;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.95', 'start 0.4'],
  });
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawY       = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const opacity    = useSpring(rawOpacity, { stiffness: 200, damping: 30 });
  const y          = useSpring(rawY,       { stiffness: 200, damping: 30 });

  /* Connector line grows as step enters view */
  const scaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity, y }}
      className="relative flex gap-6 pb-10"
    >
      {/* Number + connector */}
      <div className="relative flex flex-col items-center shrink-0">
        <motion.div
          style={{
            backgroundColor: useTransform(
              scrollYProgress,
              [0, 1],
              ['rgb(248,245,242)', 'rgb(212,175,55)']
            ),
          }}
          className="w-10 h-10 rounded-full border-2 border-gold/30 flex items-center justify-center z-10 text-sm font-serif font-semibold text-espresso shrink-0"
        >
          {index + 1}
        </motion.div>

        {!isLast && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-full overflow-hidden">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-gold/40 to-transparent"
            />
          </div>
        )}
      </div>

      {/* Text */}
      <p className="text-espresso-light font-light leading-relaxed pt-2">{text}</p>
    </motion.li>
  );
};

/* ── Full brew guide section ─────────────────────────── */
const GuideSection = ({ guide, index }: { guide: BrewGuide; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.2'],
  });
  const imgScale   = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6 border-t border-espresso/8"
    >
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${isEven ? '' : 'lg:flex-row-reverse'}`}>

          {/* Image with scroll-driven scale */}
          <motion.div
            style={{ opacity: imgOpacity }}
            className={`${isEven ? '' : 'lg:order-last'} lg:sticky top-24`}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-float">
              <motion.img
                style={{ scale: imgScale }}
                src={guide.img}
                alt={guide.method}
                className="w-full h-full object-cover film-filter"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Clock,       label: 'Time',  value: guide.time  },
                { icon: Thermometer, label: 'Temp',  value: guide.temp  },
                { icon: Scale,       label: 'Ratio', value: guide.ratio },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass border border-espresso/8 rounded-sm p-3 text-center shadow-float">
                  <Icon className="w-4 h-4 text-gold mx-auto mb-1" />
                  <p className="text-[9px] uppercase tracking-widest text-espresso/40 mb-0.5">{label}</p>
                  <p className="text-xs font-medium leading-tight">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Steps */}
          <div>
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-2">
                  {guide.difficulty}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl">{guide.method}</h2>
                <p className="text-espresso-light font-light mt-2">{guide.tagline}</p>
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full border shrink-0 ml-4 ${DIFFICULTY_STYLES[guide.difficulty]}`}>
                {guide.difficulty}
              </span>
            </div>

            <ol className="space-y-0">
              {guide.steps.map((step, i) => (
                <ScrollStep
                  key={i}
                  index={i}
                  text={step}
                  isLast={i === guide.steps.length - 1}
                />
              ))}
            </ol>

            {/* Pro tip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 p-6 rounded-sm border border-gold/20 bg-gold/5"
            >
              <p className="text-[10px] uppercase tracking-widest text-gold-muted font-semibold mb-2">
                Roaster's Tip
              </p>
              <p className="text-sm text-espresso-light font-light leading-relaxed">{guide.tip}</p>
            </motion.div>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-widest text-espresso/40 font-medium mb-2">
                Best With
              </p>
              <p className="text-sm text-espresso-light font-light">{guide.bestWith}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export const BrewGuides = () => (
  <PageTransition>
    {/* Hero */}
    <div className="pt-40 pb-20 px-6 text-center max-w-3xl mx-auto">
      <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-4">
        Education
      </p>
      <h1 className="font-serif text-5xl md:text-7xl mb-6">Brew Guides</h1>
      <p className="text-espresso-light font-light text-lg max-w-xl mx-auto leading-relaxed">
        Great coffee starts long before the cup. Scroll through each method — the steps come alive as you go.
      </p>
    </div>

    {GUIDES.map((guide, i) => (
      <GuideSection key={guide.id} guide={guide} index={i} />
    ))}
  </PageTransition>
);
