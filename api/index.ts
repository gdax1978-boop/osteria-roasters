import express from 'express';
import type { Request, Response } from 'express';
import { products } from '../server/data/products.js';
import { posts } from '../server/data/posts.js';
import type { ContactPayload } from '../src/types/index.js';

const app = express();
app.use(express.json());

app.get('/api/products', (_req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/featured', (_req: Request, res: Response) => {
  res.json(products.filter((p) => p.featured));
});

app.get('/api/posts', (_req: Request, res: Response) => {
  res.json(posts);
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body as ContactPayload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  console.log('[Contact]', { name, email, message });
  res.json({ success: true, message: "Message received. We'll be in touch soon." });
});

export default app;
