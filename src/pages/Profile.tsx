import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Mail, 
  ShoppingBag, 
  Heart, 
  CreditCard, 
  Bell, 
  Settings, 
  Lock, 
  LogOut 
} from "lucide-react";

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile = ({ onNavigate }: ProfileProps) => {
  const { user, signUp, signIn, signOut, loading, isAuthenticated } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      await signIn(formData.email, formData.password);
    } else {
      await signUp(formData.email, formData.password, formData.displayName);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const LoginForm = () => (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {isLoginMode 
              ? 'Sign in to your account to continue shopping'
              : 'Join our community of shoppers'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <div className="space-y-2">
                <Label htmlFor="displayName">Full Name</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={isLoginMode ? "Enter your password" : "Create a password"}
                className="w-full"
                required
              />
            </div>
            <Button 
              type="submit"
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Loading...' : (isLoginMode ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto"
                onClick={() => setIsLoginMode(!isLoginMode)}
              >
                {isLoginMode ? 'Sign up here' : 'Sign in here'}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProfileDashboard = () => (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* User Info Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </CardDescription>
              <Badge variant="secondary" className="mt-2">
                Member
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: ShoppingBag, label: "Orders", count: "0", action: () => onNavigate("shop") },
          { icon: Heart, label: "Wishlist", count: "0", action: () => {} },
          { icon: CreditCard, label: "Payment", count: "0", action: () => {} },
          { icon: Bell, label: "Notifications", count: "0", action: () => {} }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={item.action}
            >
              <CardContent className="p-4 text-center">
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{item.label}</p>
                <Badge variant="secondary" className="mt-1">
                  {item.count}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Account Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-2">
            <Button variant="ghost" className="justify-start">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="ghost" className="justify-start">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="ghost" className="justify-start">
              <CreditCard className="w-4 h-4 mr-2" />
              Payment Methods
            </Button>
            <Button variant="ghost" className="justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            
            <Separator className="my-4" />
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
        <div className="container mx-auto">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6" />
            <h1 className="text-xl font-bold">
              {isAuthenticated ? "My Profile" : "Login / Register"}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : isAuthenticated ? <ProfileDashboard /> : <LoginForm />}
      </div>
    </div>
  );
};

export default Profile;