import React, { useState } from "react";
import { MobileNav } from "@/components/ui/mobile-nav";
import { useCart } from "@/hooks/useCart";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Contact from "./Contact";
import Profile from "./Profile";
import ProductDetail from "./ProductDetail";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { getCartItemCount } = useCart();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage("shop");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "shop":
        return <Shop onNavigate={handleNavigate} onProductSelect={handleProductSelect} />;
      case "cart":
        return <Cart onNavigate={handleNavigate} />;
      case "contact":
        return <Contact onNavigate={handleNavigate} />;
      case "profile":
        return <Profile onNavigate={handleNavigate} />;
      case "product-detail":
        return <ProductDetail product={selectedProduct} onBack={handleBackFromProduct} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentPage()}
      
      <MobileNav
        currentPage={currentPage === "product-detail" ? "shop" : currentPage}
        onNavigate={handleNavigate}
        cartItemCount={getCartItemCount()}
      />
    </div>
  );
};

export default Index;
