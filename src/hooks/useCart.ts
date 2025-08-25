import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Added to cart",
          description: `${product.name} quantity increased`,
        });
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart`,
        });
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }, [toast]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.id === productId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.name} removed from your cart`,
        });
      }
      return prev.filter(item => item.id !== productId);
    });
  }, [toast]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items removed from your cart",
    });
  }, [toast]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const formatKES = useCallback((amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  }, []);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    formatKES,
  };
};