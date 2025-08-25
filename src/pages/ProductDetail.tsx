import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ShoppingCart, 
  MessageCircle, 
  Heart, 
  Share2,
  Star,
  Shield,
  Truck
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { openWhatsAppOrder } from "@/utils/whatsapp";

interface ProductDetailProps {
  product: any;
  onBack: () => void;
}

const ProductDetail = ({ product, onBack }: ProductDetailProps) => {
  const { addToCart, formatKES, getCartTotal, cartItems } = useCart();

  if (!product) {
    return null;
  }

  const handleOrderNow = () => {
    const cartTotal = getCartTotal();
    openWhatsAppOrder(product, cartTotal, cartItems);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold line-clamp-1 flex-1">
              {product.name}
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Product Image */}
        <Card className="overflow-hidden animate-fade-in">
          <div className="relative">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-80 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Button
                variant="secondary"
                size="icon"
                className="bg-background/90 hover:bg-background"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Product Info */}
        <Card className="animate-slide-up">
          <CardContent className="p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 
                          ? "text-secondary fill-current" 
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  (4.0) · 128 reviews
                </span>
              </div>
              <div className="text-3xl font-bold text-primary mb-4">
                {formatKES(product.price)}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-accent" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-accent" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 text-accent" />
                <span>WhatsApp Support</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Similar Products */}
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">You might also like</h3>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-full h-24 bg-muted rounded-lg mb-2" />
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    Similar Product {i + 1}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatKES(3500 + (i * 500))}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sticky Action Buttons */}
        <Card className="sticky bottom-24 bg-gradient-card shadow-strong animate-bounce-in">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Button 
                variant="cart"
                className="flex-1"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button 
                variant="whatsapp"
                className="flex-1"
                onClick={handleOrderNow}
              >
                <MessageCircle className="h-4 w-4" />
                Order Now
              </Button>
            </div>
            
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                🔒 Secure ordering via WhatsApp
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;