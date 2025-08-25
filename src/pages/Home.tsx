import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store, ShoppingCart, MessageCircle, Star, Infinity } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import mobilePreview from "@/assets/mobile-preview.jpg";

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home = ({ onNavigate }: HomeProps) => {
  const features = [
    {
      icon: Store,
      title: "Premium Products",
      description: "Quality items at affordable prices"
    },
    {
      icon: ShoppingCart,
      title: "Easy Shopping",
      description: "Simple cart and checkout process"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Orders",
      description: "Order directly via WhatsApp chat"
    },
    {
      icon: Star,
      title: "Best Service",
      description: "Customer satisfaction guaranteed"
    }
  ];

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="h-80 bg-gradient-hero bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/90" />
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="text-center w-full animate-bounce-in">
              <div className="flex items-center justify-center mb-4">
                <Infinity className="h-8 w-8 text-primary-foreground mr-2" />
                <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  Infinity Links Shop
                </h1>
              </div>
              <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Your trusted mobile marketplace for quality products in Kenya
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => onNavigate("shop")}
                  className="animate-slide-up"
                >
                  <Store className="h-5 w-5" />
                  Start Shopping
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => onNavigate("contact")}
                  className="animate-slide-up"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Why Choose Infinity Links?
            </h2>
            <p className="text-muted-foreground">
              We make online shopping simple and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="text-center hover:shadow-medium transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Preview Section */}
      <section className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <Badge variant="secondary" className="mb-4">
                Mobile First Design
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Shop Anywhere, Anytime
              </h2>
              <p className="text-muted-foreground mb-6">
                Our mobile-optimized platform lets you browse products, 
                manage your cart, and place orders seamlessly from any device.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs text-accent-foreground font-bold">✓</span>
                  </div>
                  <span className="text-sm">Fast & Responsive Design</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs text-accent-foreground font-bold">✓</span>
                  </div>
                  <span className="text-sm">Secure Payment Options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs text-accent-foreground font-bold">✓</span>
                  </div>
                  <span className="text-sm">WhatsApp Integration</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src={mobilePreview}
                alt="Mobile app preview"
                className="w-64 h-auto object-contain animate-bounce-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-card border-0 shadow-medium">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Start Shopping?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Discover amazing products with competitive prices and fast delivery across Kenya.
              </p>
              <Button 
                variant="default" 
                size="lg"
                onClick={() => onNavigate("shop")}
                className="animate-bounce-in"
              >
                <Store className="h-5 w-5" />
                Browse Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;