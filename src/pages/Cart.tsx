import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { openWhatsAppCart } from "@/utils/whatsapp";

interface CartProps {
  onNavigate: (page: string) => void;
}

const Cart = ({ onNavigate }: CartProps) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    formatKES 
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (cartItems.length > 0) {
      openWhatsAppCart(cartItems, getCartTotal());
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6" />
            <h1 className="text-xl font-bold">Your Cart</h1>
            <Badge variant="secondary" className="bg-background/20 text-primary-foreground">
              {cartItems.length} items
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Empty Cart */}
        {cartItems.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-4">
                Start shopping to add items to your cart
              </p>
              <Button onClick={() => onNavigate("shop")}>
                <Store className="h-4 w-4" />
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Cart Items */}
        {cartItems.length > 0 && (
          <div className="space-y-4">
            {/* Cart Items List */}
            {cartItems.map((item, index) => (
              <Card key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">
                          {formatKES(item.price)}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-sm text-muted-foreground">
                          Subtotal: <span className="font-semibold text-foreground">
                            {formatKES(item.price * item.quantity)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Cart Summary */}
            <Card className="sticky bottom-24 bg-gradient-card shadow-strong">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Summary</span>
                  <Badge variant="secondary">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)} items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary text-xl">
                    {formatKES(getCartTotal())}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    onClick={handleWhatsAppOrder}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Order via WhatsApp
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => onNavigate("shop")}
                    >
                      <Store className="h-4 w-4" />
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="destructive"
                      className="flex-1"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;