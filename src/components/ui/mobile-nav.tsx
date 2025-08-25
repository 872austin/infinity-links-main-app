import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Store, ShoppingCart, User, MessageSquare } from "lucide-react";

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItemCount?: number;
}

const MobileNav = ({ currentPage, onNavigate, cartItemCount = 0 }: MobileNavProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: Store },
    { id: "cart", label: "Cart", icon: ShoppingCart },
    { id: "profile", label: "Profile", icon: User },
    { id: "contact", label: "Contact", icon: MessageSquare },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mobile-nav bg-card/95 border-t border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center gap-1 h-auto py-2 px-3 transition-all relative",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => onNavigate(item.id)}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "animate-bounce-in")} />
                {item.id === "cart" && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-in">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-fade-in" />
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export { MobileNav };