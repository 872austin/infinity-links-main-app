import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { openWhatsAppOrder } from "@/utils/whatsapp";

interface ShopProps {
  onNavigate: (page: string) => void;
  onProductSelect: (product: any) => void;
}

const Shop = ({ onNavigate, onProductSelect }: ShopProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cartItems, formatKES } = useCart();
  const { products, loading } = useProducts();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderNow = (product: any) => {
    openWhatsAppOrder(product, 0, cartItems);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <Search className="w-6 h-6" />
            <h1 className="text-xl font-bold">Shop</h1>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/10 border-background/20 text-primary-foreground placeholder:text-primary-foreground/70"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Products Grid */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {products.length === 0 
                  ? "No products available. Add some products to your database!" 
                  : "No products found matching your search."
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{ ...product, id: product.id.toString() }}
                  onAddToCart={() => addToCart(product)}
                  onOrderNow={() => handleOrderNow(product)}
                  onViewDetails={() => onProductSelect(product)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Database Status Notice */}
        {products.length === 0 && !loading && (
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Add Products to Your Database</CardTitle>
              <CardDescription>
                Your app is connected to Supabase! Add some products to your database to see them here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Go to your Supabase dashboard</p>
                <p>• Navigate to the products table</p>
                <p>• Add products with name, price, description, and image_url</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Shop;