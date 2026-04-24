import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';

interface Plan {
  id: string;
  name: string;
  price: number;
  frequency: string;
  description: string;
  bags: number;
  perks: string[];
  highlight?: boolean;
}

const PLANS: Plan[] = [
  {
    id: 'ritual',
    name: 'The Ritual',
    price: 22,
    frequency: 'month',
    description: 'One carefully chosen bag, delivered on your schedule.',
    bags: 1,
    perks: [
      '1 bag of your choice (12oz)',
      'Free standard shipping',
      '10% off all Provisions purchases',
      'Early access to seasonal releases',
      'Pause or cancel anytime',
    ],
  },
  {
    id: 'craft',
    name: 'The Craft',
    price: 40,
    frequency: 'month',
    description: 'Our curated selection — the two coffees we are most excited about right now.',
    bags: 2,
    highlight: true,
    perks: [
      '2 bags, curated by our roasters (12oz each)',
      'Free priority shipping',
      '15% off all Provisions purchases',
      'Exclusive subscriber tasting notes',
      'Invitation to quarterly roastery events',
      'Pause or cancel anytime',
    ],
  },
  {
    id: 'obsession',
    name: 'The Obsession',
    price: 76,
    frequency: 'month',
    description: 'For the devoted. Four bags, exclusive access, and direct farmer connection.',
    bags: 4,
    perks: [
      '4 bags, including limited micro-lots (12oz each)',
      'Free priority shipping',
      '20% off all Provisions purchases',
      'Quarterly "Roaster\'s Selection" — not sold elsewhere',
      'Annual visit to the Brooklyn roastery',
      'Direct line to our head roaster',
      'Pause or cancel anytime',
    ],
  },
];

const FREQUENCIES = ['Weekly', 'Bi-weekly', 'Monthly'] as const;
type Frequency = (typeof FREQUENCIES)[number];

export const Subscribe = () => {
  const [frequency, setFrequency] = useState<Frequency>('Monthly');
  const [selected, setSelected] = useState<string | null>(null);

  const getPrice = (base: number) => {
    if (frequency === 'Weekly') return +(base * 0.9).toFixed(0);
    if (frequency === 'Bi-weekly') return +(base * 0.95).toFixed(0);
    return base;
  };

  return (
    <PageTransition className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-3">
            Subscribe & Save
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Never run out.</h1>
          <p className="text-espresso-light font-light text-lg max-w-2xl mx-auto">
            Fresh coffee, roasted to order, delivered on your schedule. Pause, skip, or cancel anytime — no questions asked.
          </p>
        </div>

        {/* Frequency selector */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex border border-espresso/15 rounded-sm overflow-hidden">
            {FREQUENCIES.map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-colors ${
                  frequency === f
                    ? 'bg-espresso text-cream'
                    : 'text-espresso/60 hover:text-espresso'
                }`}
              >
                {f}
                {f !== 'Monthly' && (
                  <span className="ml-2 text-terracotta">
                    {f === 'Weekly' ? '−10%' : '−5%'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative flex flex-col border rounded-sm p-8 cursor-pointer transition-all ${
                plan.highlight
                  ? 'border-terracotta bg-terracotta/5'
                  : selected === plan.id
                  ? 'border-espresso bg-espresso/3'
                  : 'border-espresso/15 hover:border-espresso/40'
              }`}
              onClick={() => setSelected(plan.id)}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-cream text-[10px] uppercase tracking-widest font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <h2 className="font-serif text-2xl mb-2">{plan.name}</h2>
                <p className="text-sm text-espresso-light font-light leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="font-serif text-5xl">${getPrice(plan.price)}</span>
                  <span className="text-espresso-light font-light mb-2">/ {frequency.toLowerCase()}</span>
                </div>
                <p className="text-xs text-espresso/50 mt-1">
                  {plan.bags} bag{plan.bags > 1 ? 's' : ''} · 12oz each
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
                    <span className="text-sm text-espresso-light font-light">{perk}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 text-xs uppercase tracking-widest font-semibold transition-colors ${
                  plan.highlight
                    ? 'bg-terracotta text-cream hover:bg-espresso'
                    : 'bg-espresso text-cream hover:bg-terracotta'
                }`}
              >
                Start {plan.name}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ strip */}
        <div className="border-t border-espresso/10 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { q: 'Can I pause or cancel?', a: 'Yes, at any time. No fees, no hoops, no hard feelings. Manage everything from your account dashboard.' },
            { q: 'When does it ship?', a: 'Roasted to order and shipped within 24 hours. Delivery takes 2–5 business days depending on your location.' },
            { q: 'Can I choose my coffee?', a: 'The Ritual lets you choose your bag. The Craft and Obsession tiers feature curated selections from our roasters — a pleasant surprise every time.' },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-serif text-lg mb-3">{q}</h3>
              <p className="text-sm text-espresso-light font-light leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};
