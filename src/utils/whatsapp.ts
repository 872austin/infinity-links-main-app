interface Product {
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

export const openWhatsAppOrder = (
  product: Product,
  cartTotal?: number,
  cartItems?: CartItem[]
) => {
  const phoneNumber = "254768810610"; // Kenya format
  
  let message = `Hi Infinity Links, I'd like to order ${product.name} at KES ${product.price.toLocaleString()}.`;
  
  if (cartTotal && cartItems && cartItems.length > 0) {
    message += `\n\nMy cart contains:`;
    cartItems.forEach(item => {
      message += `\n- ${item.name} (x${item.quantity}) - KES ${(item.price * item.quantity).toLocaleString()}`;
    });
    message += `\n\nTotal: KES ${cartTotal.toLocaleString()}`;
  } else {
    message += ` My total is KES ${product.price.toLocaleString()}.`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
};

export const openWhatsAppCart = (cartItems: CartItem[], cartTotal: number) => {
  if (cartItems.length === 0) return;
  
  const phoneNumber = "254768810610"; // Kenya format
  
  let message = `Hi Infinity Links, I'd like to order the following items:\n\n`;
  
  cartItems.forEach(item => {
    message += `- ${item.name} (x${item.quantity}) - KES ${(item.price * item.quantity).toLocaleString()}\n`;
  });
  
  message += `\nTotal: KES ${cartTotal.toLocaleString()}`;
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Open WhatsApp
  window.open(whatsappUrl, '_blank');
};