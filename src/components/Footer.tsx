import { Link } from 'react-router-dom';
import { MapPin, Mail, Instagram } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-espresso text-cream pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <h2 className="font-serif text-3xl mb-6">Osteria Roasters</h2>
        <p className="text-cream/70 max-w-sm mb-8 font-light leading-relaxed">
          Small-batch artisan coffee and fine provisions, crafted with intention in Brooklyn, NY.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-espresso transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-cream hover:text-espresso transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg mb-6 text-terracotta">Explore</h3>
        <ul className="space-y-4 text-sm tracking-widest uppercase text-cream/70">
          <li><Link to="/menu" className="hover:text-cream transition-colors">Shop Coffee</Link></li>
          <li><Link to="/menu" className="hover:text-cream transition-colors">Pantry</Link></li>
          <li><Link to="/story" className="hover:text-cream transition-colors">Our Story</Link></li>
          <li><Link to="/journal" className="hover:text-cream transition-colors">Journal</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="font-serif text-lg mb-6 text-terracotta">Visit Us</h3>
        <ul className="space-y-4 text-cream/70 font-light">
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-1 shrink-0" />
            <span>
              124 Artisan Way,
              <br />
              Brooklyn, NY 11211
            </span>
          </li>
          <li className="text-sm">
            Mon–Fri: 7am – 4pm
            <br />
            Sat–Sun: 8am – 5pm
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/50">
      <p>&copy; {new Date().getFullYear()} Osteria Roasters. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-cream transition-colors">Privacy</a>
        <a href="#" className="hover:text-cream transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);
