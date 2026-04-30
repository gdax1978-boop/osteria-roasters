import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';

const MILESTONES = [
  { year: '1968', label: 'The Roaster Is Born', desc: 'A Probat drum roaster is installed in a small Florentine café. It would roast Florentine espresso blends for the next 47 years.' },
  { year: '2015', label: 'Brooklyn Bound', desc: 'Elena and Marco Ricci leave Florence for Brooklyn, shipping the 1968 Probat across the Atlantic. "We could have bought a new machine. We couldn\'t bring ourselves to."' },
  { year: '2018', label: 'Osteria Roasters Opens', desc: 'The doors open at 124 Artisan Way. The first bag sold: a natural-process Ethiopian that sold out in three hours.' },
  { year: '2020', label: 'Direct Trade Partnership', desc: 'We establish direct relationships with farms in Colombia, Ethiopia, and Guatemala — paying 40% above fair-trade minimums.' },
  { year: '2023', label: 'The Pantry Launches', desc: 'Expanding beyond coffee to curate provisions that share our values: an heirloom olive oil from Tuscany, raw honey from the Hudson Valley.' },
];

const VALUES = [
  { title: 'No Rush', body: 'Every batch roasted to order. Every cup worth waiting for. We believe the best things in life are slow.' },
  { title: 'Radical Transparency', body: 'We publish the prices we pay our farmers. We name the people who grow our coffee. You deserve to know.' },
  { title: 'Old Tools, New Ideas', body: 'Our 1968 Probat produces a sweetness modern roasters struggle to replicate. We keep what works.' },
];

export const Story = () => (
  <PageTransition className="pb-24">
    {/* Hero */}
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0 bg-espresso/50 z-10" />
      <img
        src="https://picsum.photos/seed/roaster/1500/700"
        alt="Coffee roasting process"
        className="w-full h-full object-cover film-filter"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 z-20 flex items-end max-w-7xl mx-auto px-6 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cream/70 text-xs uppercase tracking-widest mb-3">Est. 2018 · Brooklyn, NY</p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream">Our Story</h1>
        </motion.div>
      </div>
    </div>

    {/* Opening */}
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="font-serif text-2xl md:text-3xl leading-relaxed text-espresso mb-8">
        Osteria Roasters was born out of a simple, stubborn idea: that the unhurried coffee culture of Italy could find a home in the most fast-paced city on earth.
      </p>
      <p className="text-espresso-light font-light leading-relaxed text-lg mb-6">
        Our founders, Elena and Marco Ricci, grew up in Florence surrounded by the rituals of the bar — the morning espresso pulled to order, the afternoon macchiato shared with friends, the after-dinner sambuca caffe that stretched into the small hours. Coffee, in their world, was not fuel. It was punctuation.
      </p>
      <p className="text-espresso-light font-light leading-relaxed text-lg">
        When they moved to Brooklyn in 2015, they brought with them a vintage 1968 Probat drum roaster — heavier than a small car, and more valuable to them than anything else they owned.
      </p>
    </div>

    {/* Image duo */}
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
      <img
        src="https://picsum.photos/seed/beans1/800/1000"
        alt="Coffee detail"
        className="w-full aspect-[4/5] object-cover film-filter rounded-sm"
        referrerPolicy="no-referrer"
      />
      <img
        src="https://picsum.photos/seed/beans2/800/1000"
        alt="Roasting process"
        className="w-full aspect-[4/5] object-cover film-filter rounded-sm sm:mt-16"
        referrerPolicy="no-referrer"
      />
    </div>

    {/* Sourcing */}
    <div className="bg-espresso text-cream py-20 px-6 mb-20">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-4">Sourcing with Integrity</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">
          We name the people who grow our coffee.
        </h2>
        <p className="text-cream/70 font-light leading-relaxed text-lg mb-6">
          We work directly with small-holder farms in Colombia, Ethiopia, and Guatemala. Not through brokers. Not through trading floors. Directly, with the farmers themselves.
        </p>
        <p className="text-cream/70 font-light leading-relaxed text-lg mb-10">
          By paying premium prices well above fair-trade minimums — and publishing those prices — we ensure the people who cultivate our coffee can build sustainable futures. This is not charity. It is how we believe business should work.
        </p>
        <Link to="/journal" className="inline-flex items-center gap-2 border-b border-cream/40 pb-1 text-xs uppercase tracking-widest font-semibold hover:text-terracotta hover:border-terracotta transition-colors">
          Read Our Farmer Stories
        </Link>
      </div>
    </div>

    {/* Timeline */}
    <div className="max-w-3xl mx-auto px-6 mb-20">
      <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-12 text-center">Our Journey</p>
      <div className="space-y-12">
        {MILESTONES.map(({ year, label, desc }, i) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex gap-8"
          >
            <div className="shrink-0 text-right w-16">
              <span className="font-serif text-terracotta text-xl">{year}</span>
            </div>
            <div className="flex-1 border-l border-espresso/15 pl-8 pb-8">
              <h3 className="font-serif text-xl mb-2">{label}</h3>
              <p className="text-espresso-light font-light leading-relaxed text-sm">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Values */}
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-espresso/10 pt-16">
      {VALUES.map(({ title, body }) => (
        <div key={title}>
          <h3 className="font-serif text-2xl mb-4 text-terracotta">{title}</h3>
          <p className="text-espresso-light font-light leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  </PageTransition>
);
