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

  const visible = !posts ? [] : activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = visible;

  return (
    <PageTransition className="pb-24">
      {/* Header */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-3">The Osteria Journal</p>
            <h1 className="font-serif text-5xl md:text-7xl">Stories &<br/>Education</h1>
          </div>
          <p className="text-espresso-light font-light max-w-sm text-lg md:text-right">
            Coffee culture, farmer spotlights, roasting insights, and brew guides from our Brooklyn roastery.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-widest font-semibold px-4 py-2 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-espresso text-cream border-espresso'
                  : 'border-espresso/20 text-espresso/60 hover:border-espresso hover:text-espresso'
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

      {!loading && !error && visible.length === 0 && (
        <p className="text-center text-espresso-light font-light py-24">
          No posts in this category yet.
        </p>
      )}

      {!loading && !error && featured && (
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured post */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 border border-espresso/10 rounded-sm overflow-hidden mb-12"
          >
            <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover film-filter transition-transform duration-700 group-hover:scale-105 min-h-[360px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex gap-4 items-center text-xs uppercase tracking-widest text-espresso-light mb-6">
                <span className="font-semibold text-terracotta">{featured.category}</span>
                <span>&bull;</span>
                <span>{featured.date}</span>
                {featured.readTime && <><span>&bull;</span><span>{featured.readTime}</span></>}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl group-hover:text-terracotta transition-colors leading-tight mb-6">
                {featured.title}
              </h2>
              <p className="text-espresso-light font-light leading-relaxed mb-8">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-espresso hover:text-terracotta transition-colors self-start border-b border-current pb-0.5">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.article>

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {rest.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-5 rounded-sm">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover film-filter transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex gap-3 items-center text-xs uppercase tracking-widest text-espresso-light mb-3">
                    <span className="font-medium text-terracotta">{post.category}</span>
                    <span>&bull;</span>
                    <span>{post.date}</span>
                    {post.readTime && <><span>&bull;</span><span>{post.readTime}</span></>}
                  </div>
                  <h2 className="font-serif text-xl group-hover:text-terracotta transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm text-espresso-light font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to="/journal"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs uppercase tracking-widest font-semibold text-espresso/50 hover:text-terracotta transition-colors"
                  >
                    Read More <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      )}
    </PageTransition>
  );
};
