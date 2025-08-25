import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact = ({ onNavigate }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - In real app, this would save to Supabase "messages" table
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "254768810610";
    const message = "Hi Infinity Links, I have a question about your products.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-6 w-6" />
            <h1 className="text-xl font-bold">Contact Us</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Contact Options */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Quick Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button 
                variant="whatsapp" 
                className="flex-col h-auto py-4"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="h-6 w-6 mb-2" />
                <span className="font-semibold">WhatsApp</span>
                <span className="text-xs opacity-80">Instant messaging</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4"
                onClick={() => window.open("tel:+254768810610")}
              >
                <Phone className="h-6 w-6 mb-2" />
                <span className="font-semibold">Call Us</span>
                <span className="text-xs opacity-80">+254 768 810 610</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4"
                onClick={() => window.open("mailto:info@infinitylinks.ke")}
              >
                <Mail className="h-6 w-6 mb-2" />
                <span className="font-semibold">Email</span>
                <span className="text-xs opacity-80">Send us an email</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <p className="text-sm text-muted-foreground">
              Have questions about our products? We'd love to hear from you.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="mt-1 min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Infinity Links Shop</h4>
              <p className="text-sm text-muted-foreground">
                Your trusted mobile marketplace for quality products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+254 768 810 610</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@infinitylinks.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>WhatsApp Support</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <strong>Note:</strong> Contact form requires Supabase connection to save messages to the "messages" table.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;