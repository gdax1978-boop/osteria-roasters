import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, grind: string) => void;
  removeItem: (productId: number, grind: string) => void;
  updateQuantity: (productId: number, grind: string, qty: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, grind: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.grind === grind
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.grind === grind
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, grind, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: number, grind: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.grind === grind))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, grind: string, qty: number) => {
      if (qty < 1) {
        removeItem(productId, grind);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.grind === grind
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
