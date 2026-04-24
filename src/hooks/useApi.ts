import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { posts } from '../data/posts';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(url: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    
    // Reset state whenever URL changes
    setState({ data: null, loading: true, error: null });

    // Normalize URL (remove trailing slashes for matching)
    const path = url.replace(/\/$/, '');

    // Simulate API delay for smoothness
    const timer = setTimeout(() => {
      if (cancelled) return;

      try {
        if (path === '/api/products') {
          setState({ data: products as unknown as T, loading: false, error: null });
        } else if (path === '/api/products/featured') {
          const featured = products.filter(p => p.featured);
          setState({ data: featured as unknown as T, loading: false, error: null });
        } else if (path === '/api/posts') {
          setState({ data: posts as unknown as T, loading: false, error: null });
        } else {
          // Fallback to real fetch for other URLs
          fetch(url)
            .then((res) => {
              if (!res.ok) throw new Error(`Request failed (${res.status})`);
              return res.json() as Promise<T>;
            })
            .then((data) => {
              if (!cancelled) setState({ data, loading: false, error: null });
            })
            .catch((err: Error) => {
              if (!cancelled) setState({ data: null, loading: false, error: err.message });
            });
        }
      } catch (err) {
        if (!cancelled) setState({ data: null, loading: false, error: 'Local data load failed' });
      }
    }, 400); // Slightly longer delay for a premium "loading" feel

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [url]);

  return state;
}
