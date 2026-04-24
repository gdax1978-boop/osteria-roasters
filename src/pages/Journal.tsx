import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { LoadingDots } from '../components/LoadingDots';
import { useApi } from '../hooks/useApi';
import type { JournalPost } from '../types';

const CATEGORIES = ['All', 'Education', 'Origins', 'Our Craft', 'Brew Guides', 'Farmer Stories', 'Announcements'];

export const Journal = () => {
  const { data: posts, loading, error } = useApi<JournalPost[]>('/api/posts');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = !posts ? [] : posts.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [featured, ...rest] = filtered;

  return (
    <PageTransition className="pb-24">
      {/* Header */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-3">The Osteria Journal</p>
            <h1 className="font-serif text-5xl md:text-7xl">Stories &<br/>Education</h1>
          </motion.div>
          
          <div className="flex flex-col gap-6 w-full lg:max-w-md">
            <div className="relative">
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-espresso/20 py-3 outline-none focus:border-gold transition-colors placeholder:text-espresso/30 font-light"
              />
            </div>
            <p className="text-espresso-light font-light text-lg lg:text-right text-balance">
              Coffee culture, farmer spotlights, roasting insights, and brew guides from our Brooklyn roastery.
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-[10px] uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-espresso text-cream border-espresso shadow-lg'
                  : 'border-espresso/10 text-espresso/50 hover:border-espresso/40 hover:text-espresso'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="px-6"><LoadingDots /></div>}

      {error && (
        <p className="text-center text-espresso-light font-light py-24">
          Could not load posts. Please try again.
        </p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-espresso-light font-light py-24">
          No matches found for "{searchQuery}" in {activeCategory}.
        </p>
      )}

      {!loading && !error && featured && (
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <Link to={`/journal/${featured.id}`}>
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 border border-espresso/10 rounded-sm overflow-hidden mb-20 hover:border-gold/30 transition-colors"
            >
              <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover film-filter transition-transform duration-1000 group-hover:scale-105 min-h-[400px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex gap-4 items-center text-xs uppercase tracking-widest text-espresso-light mb-8">
                  <span className="font-semibold text-terracotta">{featured.category}</span>
                  <span className="opacity-30">&bull;</span>
                  <span>{featured.date}</span>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl group-hover:text-gold transition-colors leading-[1.1] mb-8">
                  {featured.title}
                </h2>
                <p className="text-espresso-light font-light text-lg leading-relaxed mb-10">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-3 text-xs uppercase tracking-widest font-semibold text-espresso group-hover:text-gold transition-colors self-start border-b border-espresso group-hover:border-gold pb-1">
                  Read Full Story <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.article>
          </Link>

          {/* Grid of remaining posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
              {rest.map((post, i) => (
                <Link key={post.id} to={`/journal/${post.id}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-[4/5] overflow-hidden mb-8 rounded-sm">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover film-filter transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex gap-3 items-center text-[10px] uppercase tracking-[0.2em] text-espresso/40 mb-4">
                      <span className="font-bold text-terracotta">{post.category}</span>
                      <span>&bull;</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="font-serif text-2xl group-hover:text-gold transition-colors leading-tight mb-4">
                      {post.title}
                    </h2>
                    <p className="text-espresso-light font-light leading-relaxed line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-espresso/30 group-hover:text-gold transition-colors">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </motion.article>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
};
