import { products } from '../../server/data/products.js';
import { posts } from '../../server/data/posts.js';

export default async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;

  // GET /api/products/featured — must be checked before /api/products
  if (req.method === 'GET' && path === '/api/products/featured') {
    return Response.json(products.filter((p) => p.featured));
  }

  if (req.method === 'GET' && path === '/api/products') {
    return Response.json(products);
  }

  if (req.method === 'GET' && path === '/api/posts') {
    return Response.json(posts);
  }

  if (req.method === 'POST' && path === '/api/contact') {
    let body: { name?: string; email?: string; message?: string };
    try {
      body = await req.json();
    } catch {
      return Response.json({ error: 'Invalid JSON.' }, { status: 400 });
    }

    const { name, email, message } = body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    console.log('[Contact]', { name, email, message });
    return Response.json({ success: true, message: "Message received. We'll be in touch soon." });
  }

  return Response.json({ error: 'Not found.' }, { status: 404 });
};

export const config = {
  path: '/api/*',
};
