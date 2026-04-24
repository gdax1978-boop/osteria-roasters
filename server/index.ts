import express from 'express';
import type { Request, Response } from 'express';
import { products } from './data/products.ts';
import { posts } from './data/posts.ts';
import type { ContactPayload } from '../src/types/index.ts';

const app = express();
const PORT = 4001;

app.use(express.json());

// ── Products ──────────────────────────────────────────────

app.get('/api/products', (_req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/featured', (_req: Request, res: Response) => {
  res.json(products.filter((p) => p.featured));
});

// ── Journal Posts ─────────────────────────────────────────

app.get('/api/posts', (_req: Request, res: Response) => {
  res.json(posts);
});

// ── Contact Form ──────────────────────────────────────────

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  // Log to console; swap this for a real email/CRM integration later
  console.log('[Contact]', { name, email, message });

  res.json({ success: true, message: "Message received. We'll be in touch soon." });
});

// ── Start ─────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Osteria Roasters API → http://localhost:${PORT}`);
});
