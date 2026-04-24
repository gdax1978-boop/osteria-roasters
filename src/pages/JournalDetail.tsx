import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { useApi } from '../hooks/useApi';
import type { JournalPost, Product } from '../types';

export const JournalDetail = () => {
  const { id } = useParams();
  const { data: posts } = useApi<JournalPost[]>('/api/posts');
  const { data: products } = useApi<Product[]>('/api/products');
  
  const post = posts?.find(p => p.id === Number(id));
  
  if (!posts) return null; // Loading handled by PageTransition blur usually
  if (!post) return <div className="pt-32 text-center font-serif text-2xl">Post not found.</div>;

  // Simple "related products" logic based on category
  const relatedProducts = products?.filter(p => {
    if (post.category === 'Education' || post.category === 'Brew Guides') return p.type === 'Coffee';
    if (post.category === 'Origins') return p.origin?.includes(post.title.split(' ').pop() || '');
    return p.featured;
  }).slice(0, 3);

  return (
    <PageTransition className="pb-24">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={post.img}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover film-filter"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/journal"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cream/70 hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Journal
            </Link>
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-4">{post.category}</p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream max-w-4xl leading-[1.1] mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-8 items-center text-xs uppercase tracking-widest text-cream/60">
              <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
              <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> Osteria Editorial</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-20">
          {/* Main Article Body */}
          <article className="prose prose-espresso max-w-none">
            <div 
              className="font-light text-lg md:text-xl leading-relaxed text-espresso-light mb-12 italic border-l-2 border-gold pl-8 py-2"
            >
              {post.excerpt}
            </div>
            
            {post.content ? (
              <div 
                className="article-content font-light text-lg leading-[1.8] text-espresso"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="text-espresso-light">Full content coming soon...</p>
            )}
          </article>

          {/* Sidebar / Related */}
          <aside className="space-y-16">
            <div>
              <h4 className="font-serif text-xl mb-6 pb-2 border-b border-espresso/10 text-terracotta">Brew the Story</h4>
              <div className="space-y-8">
                {relatedProducts?.map(product => (
                  <Link key={product.id} to="/menu" className="group block">
                    <div className="aspect-[4/5] overflow-hidden rounded-sm mb-3">
                      <img 
                        src={product.img} 
                        alt={product.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h5 className="font-serif text-lg group-hover:text-gold transition-colors">{product.title}</h5>
                    <p className="text-xs uppercase tracking-widest text-espresso/40 mt-1">${product.price}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-espresso p-8 rounded-sm text-cream">
              <h4 className="font-serif text-xl mb-4">Never Miss a Roast</h4>
              <p className="text-sm font-light text-cream/60 mb-6 leading-relaxed">
                Join our newsletter for weekly brewing guides and early access to micro-lot releases.
              </p>
              <Link 
                to="/subscribe" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold border-b border-gold pb-1 hover:text-cream hover:border-cream transition-colors"
              >
                Join the Ritual <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
};
