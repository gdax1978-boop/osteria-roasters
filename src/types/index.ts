export interface Product {
  id: number;
  title: string;
  type: 'Coffee' | 'Pantry';
  notes: string;
  price: number;
  img: string;
  featured: boolean;
  roastLevel?: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  origin?: string;
  description?: string;
  grindOptions?: string[];
  brewingRecs?: string[];
}

export interface JournalPost {
  id: number;
  title: string;
  category: string;
  date: string;
  img: string;
  excerpt: string;
  readTime?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  grind: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  error: string;
}
