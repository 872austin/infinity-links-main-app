import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
  };
  onAddToCart?: (product: any) => void;
  onOrderNow?: (product: any) => void;
  onViewDetails?: (product: any) => void;
  className?: string;
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onOrderNow, 
  onViewDetails, 
  className 
}: ProductCardProps) => {
  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  return (
    <Card className={cn("product-card overflow-hidden cursor-pointer group", className)}>
      <div 
        className="relative overflow-hidden"
        onClick={() => onViewDetails?.(product)}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/90 text-foreground">
            {formatKES(product.price)}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div onClick={() => onViewDetails?.(product)}>
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="cart"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
          
          <Button 
            variant="whatsapp"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onOrderNow?.(product);
            }}
          >
            <MessageCircle className="h-4 w-4" />
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductCard };