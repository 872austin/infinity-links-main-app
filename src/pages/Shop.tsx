import React, { useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { openWhatsAppOrder } from "@/utils/whatsapp";
import productSample from "@/assets/product-sample.jpg";

interface ShopProps {
  onNavigate: (page: string) => void;
  onProductSelect: (product: any) => void;
}

const Shop = ({ onNavigate, onProductSelect }: ShopProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, formatKES, getCartTotal, cartItems } = useCart();

  // Sample products - In real app, this would come from Supabase
  const sampleProducts = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 8500,
      description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers.",
      image_url: productSample
    },
    {
      id: "2", 
      name: "Smart Fitness Watch",
      price: 12000,
      description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
      image_url: productSample
    },
    {
      id: "3",
      name: "Portable Power Bank 20000mAh",
      price: 3500,
      description: "Never run out of battery with this high-capacity power bank. Fast charging for all your devices.",
      image_url: productSample
    },
    {
      id: "4",
      name: "Bluetooth Speaker Waterproof",
      price: 6500,
      description: "Portable waterproof speaker with amazing sound quality. Perfect for outdoor adventures.",
      image_url: productSample
    },
    {
      id: "5",
      name: "Wireless Charging Pad",
      price: 2800,
      description: "Convenient wireless charging solution for your smartphone. Fast and safe charging technology.",
      image_url: productSample
    },
    {
      id: "6",
      name: "Gaming Mouse RGB",
      price: 4200,
      description: "Professional gaming mouse with RGB lighting and precision sensors for competitive gaming.",
      image_url: productSample
    }
  ];

  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderNow = (product: any) => {
    const cartTotal = getCartTotal();
    openWhatsAppOrder(product, cartTotal, cartItems);
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Store className="h-6 w-6" />
            <h1 className="text-xl font-bold">Infinity Links Shop</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/70"
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {searchTerm ? "Search Results" : "All Products"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
          <Badge variant="secondary">
            {filteredProducts.length} items
          </Badge>
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms
              </p>
              <Button onClick={() => setSearchTerm("")}>
                View All Products
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onOrderNow={handleOrderNow}
                  onViewDetails={onProductSelect}
                />
              </div>
            ))}
          </div>
        )}

        {/* Connect to Supabase Notice */}
        <Card className="mt-8 border-2 border-dashed border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              Connect to Supabase for Live Products
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              These are sample products. Connect your Supabase database to load real products from your "products" table.
            </p>
            <Button variant="secondary" size="sm">
              Learn More About Supabase Integration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shop;