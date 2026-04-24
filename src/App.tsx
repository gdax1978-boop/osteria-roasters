import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Story } from './pages/Story';
import { Menu } from './pages/Menu';
import { Journal } from './pages/Journal';
import { JournalDetail } from './pages/JournalDetail';
import { VisitUs } from './pages/VisitUs';
import { Quiz } from './pages/Quiz';
import { BrewGuides } from './pages/BrewGuides';
import { Subscribe } from './pages/Subscribe';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:id" element={<JournalDetail />} />
          <Route path="/visit" element={<VisitUs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/brew" element={<BrewGuides />} />
          <Route path="/subscribe" element={<Subscribe />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col noise-overlay">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
