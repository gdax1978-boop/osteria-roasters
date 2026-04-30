import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const ROAST_COLORS: Record<string, string> = {
  Light:         'bg-amber-50  text-amber-700  border-amber-200',
  Medium:        'bg-orange-50 text-orange-700 border-orange-200',
  'Medium-Dark': 'bg-orange-100 text-orange-800 border-orange-300',
  Dark:          'bg-stone-700 text-stone-100  border-stone-600',
};

/* Pill-shaped subscribe toggle */
const SubscribeToggle = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 ${
      active
        ? 'bg-gold border-gold text-espresso shadow-[0_0_12px_rgba(212,175,55,0.3)]'
        : 'border-espresso/15 text-espresso/50 hover:border-gold/50 hover:text-gold-muted'
    }`}
    title={active ? 'Cancel subscription — click to revert to one-time' : 'Subscribe & save 10%'}
  >
    <span
      className={`w-3 h-3 rounded-full toggle-track flex items-center justify-center ${
        active ? 'bg-espresso' : 'bg-espresso/20'
      }`}
    >
      {active && <Check className="w-2 h-2 text-gold" />}
    </span>
    {active ? 'Subscribe ✓' : 'Subscribe & Save'}
  </button>
);

/* The floating card itself */
export const ProductCard = ({
  product,
  floatOffset = 0,
}: {
  product: Product;
  floatOffset?: number; // px to shift vertically for asymmetric layout
}) => {
  const [subscribe, setSubscribe] = useState(false);
  const [grind, setGrind] = useState(product.grindOptions?.[0] ?? 'Whole Bean');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const displayPrice = subscribe
    ? (product.price * 0.9).toFixed(2)
    : product.price.toFixed(2);

  const handleAdd = () => {
    addItem(product, grind);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <motion.div
      style={{
        filter: 'drop-shadow(0 4px 24px rgba(45,41,38,0.07))',
        '--float-offset': `${floatOffset}px`,
      } as CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      animate={{ y: 0 }}
      className="group flex flex-col cursor-pointer md:[margin-top:var(--float-offset)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-sm bg-espresso/5">
        <motion.img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover film-filter"
          referrerPolicy="no-referrer"
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.06 }}
        />

        {/* Roast badge */}
        {product.roastLevel && (
          <span
            className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border ${ROAST_COLORS[product.roastLevel]}`}
          >
            {product.roastLevel}
          </span>
        )}

        {/* Hover reveal — origin & brewing recs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 bottom-0 glass-dark p-4"
        >
          {product.origin && (
            <p className="text-cream/70 text-[10px] uppercase tracking-widest mb-2">
              {product.origin}
            </p>
          )}
          {product.brewingRecs && (
            <div className="flex flex-wrap gap-1.5">
              {product.brewingRecs.map((r) => (
                <span
                  key={r}
                  className="text-[9px] border border-cream/20 rounded-full px-2 py-0.5 text-cream/60 uppercase tracking-wider"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Info panel — glass card */}
      <div className="glass rounded-b-sm shadow-float group-hover:shadow-float-hover transition-shadow duration-400 p-5 flex flex-col flex-1 border border-espresso/6 border-t-0">
        {/* Type + Subscribe toggle */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest font-medium text-terracotta">
            {product.type}
          </span>
          {product.type === 'Coffee' && (
            <SubscribeToggle
              active={subscribe}
              onToggle={() => setSubscribe((v) => !v)}
            />
          )}
        </div>

        {/* Title + notes */}
        <h3 className="font-serif text-xl leading-snug mb-1 group-hover:text-terracotta transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-espresso-light font-light mb-4 leading-relaxed">
          {product.notes}
        </p>

        {/* Grind selector */}
        {product.grindOptions && product.grindOptions.length > 0 && (
          <select
            value={grind}
            onChange={(e) => setGrind(e.target.value)}
            className="text-xs border border-espresso/12 rounded-sm py-2 px-3 bg-transparent outline-none focus:border-gold transition-colors cursor-pointer mb-4 text-espresso/70"
          >
            {product.grindOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        )}

        {/* Price + CTA */}
        <div className="mt-auto space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl">${displayPrice}</span>
              {subscribe && (
                <span className="text-[10px] text-gold-muted font-semibold uppercase tracking-wider line-through decoration-terracotta/40 decoration-2">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            {subscribe && (
              <span className="flex items-center gap-1 text-[10px] text-gold-muted font-semibold uppercase tracking-wider">
                <RefreshCw className="w-3 h-3" /> 10% off
              </span>
            )}
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 btn-float ${
              added
                ? 'bg-gold text-espresso'
                : 'bg-espresso text-cream hover:bg-terracotta'
            }`}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" /> Added to Cart
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  {subscribe ? 'Subscribe — Add to Cart' : 'Add to Cart'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
