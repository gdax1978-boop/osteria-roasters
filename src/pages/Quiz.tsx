import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';
import type { Product } from '../types';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'style',
    text: 'How do you take your coffee?',
    options: [
      { label: 'Black — no additions', value: 'black' },
      { label: 'With milk or a creamy base', value: 'milk' },
      { label: 'Iced or cold brew', value: 'cold' },
      { label: 'Sweet and flavored', value: 'sweet' },
    ],
  },
  {
    id: 'flavor',
    text: 'What flavors draw you in?',
    options: [
      { label: 'Fruity & floral — like jasmine or berries', value: 'fruity' },
      { label: 'Chocolate & nutty — warm and comforting', value: 'chocolate' },
      { label: 'Dark & intense — bold and smoky', value: 'dark' },
      { label: 'Balanced — a little of everything', value: 'balanced' },
    ],
  },
  {
    id: 'brew',
    text: 'How do you brew at home?',
    options: [
      { label: 'Espresso machine', value: 'espresso' },
      { label: 'Pour over or drip', value: 'pourover' },
      { label: 'French press or AeroPress', value: 'press' },
      { label: "I don't brew — I visit cafés", value: 'cafe' },
    ],
  },
  {
    id: 'adventure',
    text: 'How adventurous are you with coffee?',
    options: [
      { label: 'I love exploring new single origins', value: 'adventurous' },
      { label: 'I have a favorite and I stick to it', value: 'classic' },
      { label: 'Somewhere in the middle', value: 'moderate' },
    ],
  },
];

function getRecommendedId(answers: Record<string, string>): number {
  const { flavor, style, adventure } = answers;
  if (flavor === 'fruity' || adventure === 'adventurous') return 3; // Ethiopian Yirgacheffe
  if (flavor === 'dark' || style === 'espresso') return 2; // Oaxacan
  if (style === 'cold' || flavor === 'chocolate') return 1; // Tuscan Sunrise
  return 1; // Default
}

export const Quiz = () => {
  const { data: products } = useApi<Product[]>('/api/products');
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const question = QUESTIONS[step];
  const progress = ((step) / QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const recommendedId = done ? getRecommendedId(answers) : null;
  const recommended = products?.find((p) => p.id === recommendedId);

  return (
    <PageTransition className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-3">Coffee Finder</p>
          <h1 className="font-serif text-5xl md:text-6xl mb-4">Find Your Roast</h1>
          <p className="text-espresso-light font-light text-lg">
            Four questions. One perfect coffee.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress bar */}
              <div className="w-full h-0.5 bg-espresso/10 mb-12 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-terracotta"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <p className="text-xs uppercase tracking-widest text-espresso/40 mb-4">
                Question {step + 1} of {QUESTIONS.length}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl mb-10">{question.text}</h2>

              <div className="space-y-4">
                {question.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left border border-espresso/15 px-8 py-5 hover:border-terracotta hover:bg-terracotta/5 transition-all group flex items-center justify-between rounded-sm"
                  >
                    <span className="font-light text-lg">{opt.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-terracotta transition-opacity" />
                  </button>
                ))}
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-8 text-xs uppercase tracking-widest text-espresso/40 hover:text-espresso transition-colors"
                >
                  ← Back
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-widest text-terracotta font-medium mb-4">
                Your perfect match
              </p>
              <h2 className="font-serif text-4xl mb-12">We think you'll love this.</h2>

              {recommended && (
                <div className="max-w-sm mx-auto">
                  <div className="aspect-[3/4] overflow-hidden mb-6 rounded-sm">
                    <img
                      src={recommended.img}
                      alt={recommended.title}
                      className="w-full h-full object-cover film-filter"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {recommended.roastLevel && (
                    <p className="text-xs uppercase tracking-widest text-espresso/50 mb-2">
                      {recommended.roastLevel} Roast · {recommended.origin}
                    </p>
                  )}
                  <h3 className="font-serif text-3xl mb-2">{recommended.title}</h3>
                  <p className="text-espresso-light font-light mb-6">{recommended.notes}</p>
                  {recommended.description && (
                    <p className="text-sm text-espresso/60 font-light leading-relaxed mb-8">
                      {recommended.description}
                    </p>
                  )}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => addItem(recommended, recommended.grindOptions?.[0] ?? 'Whole Bean')}
                      className="w-full bg-espresso text-cream py-4 text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors"
                    >
                      Add to Cart — ${recommended.price}
                    </button>
                    <Link
                      to="/menu"
                      className="w-full border border-espresso/20 py-3 text-xs uppercase tracking-widest font-medium hover:border-terracotta hover:text-terracotta transition-colors"
                    >
                      Browse All Provisions
                    </Link>
                  </div>
                </div>
              )}

              <button
                onClick={reset}
                className="mt-10 flex items-center gap-2 text-xs uppercase tracking-widest text-espresso/40 hover:text-espresso transition-colors mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};
