import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu as MenuIcon, X, ShoppingBag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/story',     label: 'Our Story' },
  { to: '/menu',      label: 'Provisions' },
  { to: '/brew',      label: 'Brew Guides' },
  { to: '/journal',   label: 'Journal' },
  { to: '/visit',     label: 'Visit Us' },
];

export const Navbar = () => {
  const [isOpen,      setIsOpen]      = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location  = useLocation();
  const navigate  = useNavigate();
  const { totalCount, setIsOpen: openCart } = useCart();

  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHome  = location.pathname === '/';
  const isHero  = isHome && !scrolled && !isOpen;
  const linkCls = `transition-colors duration-200 hover:text-gold ${isHero ? 'text-cream/90' : 'text-espresso'}`;
  const active  = (to: string) => location.pathname === to ? '!text-gold' : '';

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-white/30 shadow-[0_4px_32px_rgba(45,41,38,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`font-serif text-2xl font-semibold tracking-tight z-50 transition-colors duration-300 ${
              scrolled || isOpen ? 'text-espresso' : 'text-cream'
            }`}
          >
            Osteria <br /> Roasters
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm tracking-widest uppercase font-medium">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`${linkCls} ${active(to)}`}>
                {label}
              </Link>
            ))}
            <Link
              to="/subscribe"
              className={`px-5 py-2 text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-200 btn-float ${
                isHero
                  ? 'bg-gold text-espresso hover:bg-gold/90'
                  : 'bg-gold text-espresso hover:bg-gold-muted'
              }`}
            >
              Subscribe
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`transition-colors hover:text-gold ${isHero ? 'text-cream/80' : 'text-espresso'}`}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => openCart(true)}
              className={`relative transition-colors hover:text-gold ${isHero ? 'text-cream/80' : 'text-espresso'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-gold text-espresso text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button
              onClick={() => { setIsOpen(false); setSearchOpen(!searchOpen); }}
              className={`transition-colors hover:text-gold ${scrolled || isOpen ? 'text-espresso' : 'text-cream'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => openCart(true)}
              className={`relative transition-colors hover:text-gold ${scrolled || isOpen ? 'text-espresso' : 'text-cream'}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-espresso text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1 transition-colors ${scrolled || isOpen ? 'text-espresso' : 'text-cream'}`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/20 glass"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-6 py-4 flex gap-4">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coffees and provisions…"
                  className="flex-1 bg-transparent border-b border-espresso/20 py-2 outline-none focus:border-gold transition-colors text-espresso placeholder:text-espresso/30 text-sm"
                />
                <button type="submit" className="text-xs uppercase tracking-widest font-semibold text-espresso hover:text-gold transition-colors">
                  Search
                </button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-espresso/40 hover:text-gold transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center gap-8 text-xl font-serif lg:hidden"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="hover:text-gold transition-colors">
                {label}
              </Link>
            ))}
            <Link
              to="/subscribe"
              className="bg-gold text-espresso px-10 py-3 text-sm tracking-widest uppercase font-sans font-semibold hover:bg-gold-muted transition-colors rounded-sm btn-float"
            >
              Subscribe & Save
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
