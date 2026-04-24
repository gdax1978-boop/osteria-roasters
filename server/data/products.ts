import type { Product } from '../../src/types/index.ts';

const GRIND_OPTIONS = ['Whole Bean', 'Coarse', 'Medium', 'Fine', 'Espresso'];

export const products: Product[] = [
  {
    id: 1,
    title: 'Tuscan Sunrise Blend',
    type: 'Coffee',
    notes: 'Hazelnut, Cacao, Sweet Cherry',
    price: 22,
    img: 'https://picsum.photos/seed/coffee1/800/1000',
    featured: true,
    roastLevel: 'Medium',
    origin: 'Colombia & Ethiopia',
    description:
      'Our signature house blend, designed to evoke the warmth of an early Tuscan morning. Expect a sweet, approachable cup with layers of hazelnut and cacao that linger long after the last sip.',
    grindOptions: GRIND_OPTIONS,
    brewingRecs: ['Pour Over', 'Drip', 'French Press'],
  },
  {
    id: 2,
    title: 'Oaxacan Single Origin',
    type: 'Coffee',
    notes: 'Dark Chocolate, Plum, Brown Sugar',
    price: 26,
    img: 'https://picsum.photos/seed/coffee2/800/1000',
    featured: true,
    roastLevel: 'Medium-Dark',
    origin: 'Oaxaca, Mexico',
    description:
      'Sourced from the remote highlands of Oaxaca, this single origin is shade-grown beneath a canopy of indigenous flora. The result is a refined, complex cup that reveals new notes with each brew.',
    grindOptions: GRIND_OPTIONS,
    brewingRecs: ['Espresso', 'Moka Pot', 'Pour Over'],
  },
  {
    id: 3,
    title: 'Ethiopian Yirgacheffe',
    type: 'Coffee',
    notes: 'Jasmine, Lemon, Bergamot',
    price: 24,
    img: 'https://picsum.photos/seed/coffee3/800/1000',
    featured: false,
    roastLevel: 'Light',
    origin: 'Yirgacheffe, Ethiopia',
    description:
      'The birthplace of coffee delivers a cup unlike any other. Washed with precision and roasted lightly to preserve every delicate floral note, this is a coffee for those who appreciate the extraordinary.',
    grindOptions: GRIND_OPTIONS,
    brewingRecs: ['Pour Over', 'AeroPress', 'Cold Brew'],
  },
  {
    id: 4,
    title: 'Decaf House Blend',
    type: 'Coffee',
    notes: 'Molasses, Graham Cracker',
    price: 21,
    img: 'https://picsum.photos/seed/coffee4/800/1000',
    featured: false,
    roastLevel: 'Medium',
    origin: 'Colombia',
    description:
      'Decaffeinated via the Swiss Water Process to preserve the integrity of the bean. Rich, comforting, and deeply satisfying — no compromise required.',
    grindOptions: GRIND_OPTIONS,
    brewingRecs: ['Drip', 'French Press', 'Pour Over'],
  },
  {
    id: 5,
    title: 'Artisan Olive Oil',
    type: 'Pantry',
    notes: 'Cold Pressed, Unfiltered — 500ml',
    price: 34,
    img: 'https://picsum.photos/seed/olive/800/1000',
    featured: true,
    origin: 'Tuscany, Italy',
    description:
      'Pressed from hand-harvested olives on a 200-year-old family estate in Tuscany. Peppery, grassy, and alive — the kind of oil that makes you taste the land it came from.',
  },
  {
    id: 6,
    title: 'Raw Wildflower Honey',
    type: 'Pantry',
    notes: 'Sourced from Upstate NY — 12oz',
    price: 18,
    img: 'https://picsum.photos/seed/honey/800/1000',
    featured: false,
    origin: 'Hudson Valley, NY',
    description:
      'Harvested by a family apiary in the Hudson Valley. Raw, unfiltered, and packed with the complex floral character of the valley\'s wildflower meadows. Perfect with a morning espresso.',
  },
];
