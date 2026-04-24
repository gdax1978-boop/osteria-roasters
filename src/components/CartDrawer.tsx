import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalCount, totalPrice } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-espresso/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-espresso/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="font-serif text-2xl">Your Cart</h2>
                {totalCount > 0 && (
                  <span className="text-xs bg-terracotta text-cream rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:text-terracotta transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6">
                  <ShoppingBag className="w-12 h-12 text-espresso/20" />
                  <div>
                    <p className="font-serif text-2xl mb-2">Your cart is empty</p>
                    <p className="text-espresso-light font-light text-sm">
                      Add something beautiful.
                    </p>
                  </div>
                  <Link
                    to="/menu"
                    onClick={() => setIsOpen(false)}
                    className="bg-espresso text-cream px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors"
                  >
                    Shop Provisions
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={`${item.product.id}-${item.grind}`}
                      className="flex gap-4 border-b border-espresso/10 pb-6"
                    >
                      <div className="w-20 h-20 rounded-sm overflow-hidden shrink-0 bg-espresso/5">
                        <img
                          src={item.product.img}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-base leading-tight mb-1">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-espresso-light mb-3">{item.grind}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-espresso/20 rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.grind, item.quantity - 1)
                              }
                              className="px-2 py-1 hover:text-terracotta transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.grind, item.quantity + 1)
                              }
                              className="px-2 py-1 hover:text-terracotta transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id, item.grind)}
                              className="text-espresso/40 hover:text-terracotta transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-espresso/10 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm uppercase tracking-widest font-medium">Subtotal</span>
                  <span className="font-serif text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-espresso text-cream py-4 text-xs uppercase tracking-widest font-semibold hover:bg-terracotta transition-colors mb-3">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full border border-espresso/20 py-3 text-xs uppercase tracking-widest font-medium hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
