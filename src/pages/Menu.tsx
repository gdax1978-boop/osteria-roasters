import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ProductCard } from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';
import { ErrorBoundary, InlineError } from '../components/ErrorBoundary';
import { useApi } from '../hooks/useApi';
import type { Product } from '../types';

type Filter = 'All' | 'Coffee' | 'Pantry';

/* Asymmetric float offsets for the 3-column grid */
const OFFSETS = [0, 40, 16, 16, 0, 40];

const ProductGrid = ({
  products,
  filter,
  search,
}: {
  products: Product[];
  filter: Filter;
  search: string;
}) => {
  const visible = products.filter((p) => {
    const matchFilter = filter === 'All' || p.type === filter;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.notes.toLowerCase().includes(q) ||
      (p.origin ?? '').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (visible.length === 0) {
    return (
      <p className="text-center text-espresso-light font-light py-24">
        No products match "{search}".
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 items-start">
      {visible.map((item, i) => (
        <ProductCard
          key={item.id}
          product={item}
          floatOffset={OFFSETS[i % OFFSETS.length]}
        />
      ))}
    </div>
  );
};

const MenuContent = () => {
  const { data: products, loading, error } = useApi<Product[]>('/api/products');
  const [filter, setFilter]       = useState<Filter>('All');
  const [searchParams]            = useSearchParams();
  const [search, setSearch]       = useState(searchParams.get('search') ?? '');

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearch(q);
  }, [searchParams]);

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-3">
            Osteria Provisions
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-4">Provisions</h1>
          <p className="text-espresso-light font-light max-w-xl text-lg">
            Carefully curated beans and pantry staples to elevate your daily rituals.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-16 border-b border-espresso/8 pb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, notes, or origin…"
            className="flex-1 bg-transparent border-b border-espresso/15 py-2 outline-none focus:border-gold transition-colors placeholder:text-espresso/25 text-sm"
          />
          <div className="flex gap-6 items-center">
            {(['All', 'Coffee', 'Pantry'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs uppercase tracking-widest font-semibold transition-colors pb-1 border-b-2 ${
                  filter === f
                    ? 'border-gold text-gold'
                    : 'border-transparent text-espresso-light hover:text-espresso'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* States */}
        {loading && <ProductGridSkeleton count={6} />}

        {error && (
          <InlineError
            message="Could not load products — make sure the dev server is running on port 4001."
          />
        )}

        {!loading && !error && products && (
          <ProductGrid products={products} filter={filter} search={search} />
        )}
      </div>
    </PageTransition>
  );
};

export const Menu = () => (
  <ErrorBoundary>
    <MenuContent />
  </ErrorBoundary>
);
