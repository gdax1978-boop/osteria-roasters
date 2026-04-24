import type { JournalPost } from '../types';

export const posts: JournalPost[] = [
  {
    id: 1,
    title: 'The Art of the Perfect Crema',
    category: 'Education',
    date: 'Oct 12, 2023',
    img: 'https://picsum.photos/seed/journal1/1000/750',
    readTime: '5 min read',
    excerpt:
      'The crema is the soul of espresso — that rich, reddish-brown foam that crowns a perfect shot. It forms when CO₂ released during roasting emulsifies with the water under pressure. Too little and your extraction is off; too much and bitterness creeps in. Learn the variables that control it and how to dial in your machine for the ideal pour every morning.',
    content: `
      <p>The crema is more than just a beautiful layer of foam atop your espresso; it is a complex emulsion of oils, proteins, and sugars that serves as a visual indicator of the coffee's freshness and the quality of the extraction.</p>
      
      <p>When coffee beans are roasted, carbon dioxide is trapped inside their cellular structure. During the brewing process, high pressure (around 9 bars) forces the water through the finely ground coffee, emulsifying the oils and trapping the CO₂ in tiny bubbles. This is what creates the crema.</p>
      
      <h3>The Variables that Matter</h3>
      <ul>
        <li><strong>Freshness:</strong> Beans roasted within the last 7-14 days will produce a thick, resilient crema. Old beans have lost their CO₂ and will yield a thin, watery layer.</li>
        <li><strong>Temperature:</strong> Too hot and you'll burn the oils, resulting in a dark, bitter crema. Too cool and the extraction will be thin.</li>
        <li><strong>Pressure:</strong> Without sufficient pressure, the emulsion cannot form.</li>
      </ul>
      
      <p>Next time you pull a shot, look for a "tiger-skin" pattern — small dark flecks on a golden-brown surface. That's the sign of a truly balanced extraction.</p>
    `,
  },
  {
    id: 2,
    title: 'Sourcing in the Oaxacan Highlands',
    category: 'Origins',
    date: 'Sep 28, 2023',
    img: 'https://picsum.photos/seed/journal2/1000/750',
    readTime: '7 min read',
    excerpt:
      "Three days, two translators, and a borrowed truck. That's what it took to reach the cooperative farms where our Oaxacan Single Origin is grown. The families we met there have been cultivating coffee for generations — shade-grown beneath native oak and pine at 1,600 meters. This is their story, and why we believe paying 40% above fair-trade minimums is not generosity, but basic fairness.",
    content: `
      <p>The journey to the Sierra Juárez mountains is not for the faint of heart. The roads are narrow, unpaved, and frequently washed out by seasonal rains. But for the roasters at Osteria, it's a journey we make twice a year to maintain the relationships that define our coffee.</p>
      
      <p>In the village of San Pedro, we met with the Díaz family. They've been growing coffee here for four generations, moving away from high-yield, chemically dependent farming toward organic, shade-grown methods that protect the local ecosystem.</p>
      
      <h3>The Price of Quality</h3>
      <p>Many large-scale roasters buy coffee through massive exchanges where the farmer is anonymous and the price is dictated by global commodities markets. We do it differently. By buying directly from cooperatives, we ensure that the premium we pay for quality goes directly into the hands of the people who grew the beans.</p>
      
      <p>This "direct trade" model isn't just about ethics; it's about flavor. When a farmer knows they will be rewarded for extra care in harvesting and processing, the resulting coffee is demonstrably better.</p>
    `,
  },
  {
    id: 3,
    title: 'Why We Use a Vintage 1968 Roaster',
    category: 'Our Craft',
    date: 'Sep 05, 2023',
    img: 'https://picsum.photos/seed/journal3/1000/750',
    readTime: '4 min read',
    excerpt:
      "When Marco brought our 1968 Probat drum roaster from Florence, the shipping cost more than most people spend on a car. Some called it eccentric. We call it essential. Modern roasters optimize for consistency and throughput — admirable goals. But older drum roasters, with their slower heat transfer and longer development times, coax out a sweetness and complexity that faster machines simply cannot replicate.",
    content: `
      <p>The "Lilla" roaster in our Brooklyn shop is more than a piece of machinery; it's a mechanical artisan. Built in a time when cast iron was the standard, its thermal mass allows for a steady, gentle heat that is impossible to achieve with modern, thin-walled steel roasters.</p>
      
      <h3>The Physics of Flavor</h3>
      <p>In a drum roaster, the coffee beans are tumbled as heated air passes through. The cast-iron drum acts as a heat sink, providing conductive heat that helps develop the sugars deep within the bean. This "slow and low" approach results in a more uniform roast and a significantly broader flavor profile.</p>
      
      <p>While we've added modern sensors and computer logging to the vintage frame, the core process remains unchanged. It requires a roaster's intuition — listening for the "first crack," smelling the transition from grassy to toasted — to know exactly when to drop the beans.</p>
    `,
  },
  {
    id: 4,
    title: 'A Guide to Cold Brew Season',
    category: 'Brew Guides',
    date: 'Aug 18, 2023',
    img: 'https://picsum.photos/seed/journal4/1000/750',
    readTime: '6 min read',
    excerpt:
      'Cold brew is not iced coffee — a distinction that matters enormously for your palate. Where iced coffee hotly extracts and then chills, cold brew steeps coarsely ground coffee in cold water for 12 to 24 hours, yielding a concentrate that is smooth, chocolatey, and gentle on the stomach. Our step-by-step guide covers ratios, steeping time, and which of our coffees make the best cold brew.',
    content: `
      <p>As the humidity rises in Brooklyn, the demand for cold brew skyrockets. But what exactly makes a great cold brew? It's not just about the temperature; it's about the chemistry of extraction.</p>
      
      <h3>Cold vs. Hot Extraction</h3>
      <p>Hot water extracts the aromatic oils and acids from coffee beans quickly. Some of these acids are bright and fruity, while others are bitter and sharp. Cold water extracts these compounds much more slowly and selectively. Specifically, many of the bitter oils and "heavy" acids stay trapped in the grounds, resulting in a cup that is up to 60% less acidic than its hot-brewed counterpart.</p>
      
      <h3>The Osteria Method</h3>
      <ol>
        <li><strong>Coarse Grind:</strong> Use a grind size similar to sea salt. Too fine and the brew will be muddy.</li>
        <li><strong>The Ratio:</strong> We recommend a 1:8 ratio (one part coffee to eight parts water) for a concentrate that can be diluted with milk or water.</li>
        <li><strong>Time:</strong> 16 hours is the sweet spot. Less and it's under-extracted; more and it begins to take on a woody, oxidized flavor.</li>
      </ol>
    `,
  },
  {
    id: 5,
    title: 'Seasonal Release: The Winter Comfort Blend',
    category: 'Announcements',
    date: 'Jul 30, 2023',
    img: 'https://picsum.photos/seed/journal5/1000/750',
    readTime: '3 min read',
    excerpt:
      'Every year as the days shorten, we craft a limited seasonal blend designed for slow mornings and long evenings. This year\'s Winter Comfort features a Guatemalan base with a Sumatran accent — heavy-bodied, deeply spiced, with a finish that warms long after the cup is empty. Available in limited quantities starting November 1st.',
    content: `
      <p>The transition from autumn to winter calls for a coffee that can stand up to a cold morning. For this year's "Winter Comfort," our head roaster, Marco, wanted to create something that felt like a warm blanket in a cup.</p>
      
      <h3>A Study in Contrast</h3>
      <p>The base of the blend is a Bourbon variety from the Huehuetenango region of Guatemala, providing a clean sweetness and a milk chocolate mouthfeel. To this, we've added a small percentage of wet-hulled Mandheling from Sumatra. This addition brings a rustic, earthy complexity and notes of dark spice and cedar.</p>
      
      <p>We've roasted this blend to a "Full City" level, just past the second crack, to develop the sugars into a rich caramel without introducing smoky bitterness. It's the perfect companion for a quiet morning by the window.</p>
    `,
  },
  {
    id: 6,
    title: 'Farmer Spotlight: Rosaura Díaz of Oaxaca',
    category: 'Farmer Stories',
    date: 'Jul 10, 2023',
    img: 'https://picsum.photos/seed/journal6/1000/750',
    readTime: '8 min read',
    excerpt:
      "Rosaura Díaz has been growing coffee on her family's 4-hectare plot in the Sierra Juárez mountains for 28 years. When she took over from her father, she made a decision that would define the farm: no synthetic fertilizers, ever. Her coffee is certified organic not by a piece of paper, but by three decades of commitment. We sit down with Rosaura to learn what that commitment costs — and what it gives back.",
    content: `
      <p>Sitting on the porch of her small house overlooking the valley, Rosaura Díaz pours us a cup of the very coffee we've come to buy. It's bright, clean, and surprisingly sweet. "The land gives you what you give to the land," she says through a translator.</p>
      
      <h3>Resistance Through Farming</h3>
      <p>In the late 90s, when the "Green Revolution" pushed high-yield varieties and chemical fertilizers on Oaxacan farmers, Rosaura refused. She saw the neighbors' soil turning hard and gray, and their dependence on expensive imports growing. She chose to keep the old varieties and the old ways — composting with coffee pulp and planting nitrogen-fixing trees among the coffee shrubs.</p>
      
      <p>Today, her farm is a lush, biodiverse oasis. Her yields might be lower than the industrial farms down the valley, but her quality is incomparable. And because she sells directly to us, she earns three times what her neighbors get at the local exchange.</p>
    `,
  },
];
