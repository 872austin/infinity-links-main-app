import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  LogIn, 
  UserPlus, 
  Settings, 
  Heart, 
  ShoppingBag, 
  CreditCard,
  Bell,
  Shield
} from "lucide-react";

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile = ({ onNavigate }: ProfileProps) => {
  // Mock user state - In real app, this would come from Supabase auth
  const isLoggedIn = false;
  const user = null;

  const LoginForm = () => (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" />
            Login to Your Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Access your orders and manage your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1"
            />
          </div>
          <Button className="w-full">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
          <div className="text-center">
            <Button variant="link" className="text-sm">
              Forgot password?
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Create New Account
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Join Infinity Links for a better shopping experience
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newEmail">Email Address</Label>
            <Input
              id="newEmail"
              type="email"
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Create a password"
              className="mt-1"
            />
          </div>
          <Button variant="secondary" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Create Account
          </Button>
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed border-primary/20">
        <CardContent className="text-center py-6">
          <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
          <h3 className="font-semibold text-primary mb-2">
            Supabase Authentication Required
          </h3>
          <p className="text-sm text-muted-foreground">
            Connect your Supabase project to enable user authentication and account management.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const ProfileDashboard = () => (
    <div className="space-y-6">
      {/* User Info */}
      <Card className="animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 rounded-full p-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name || "John Doe"}</h2>
              <p className="text-muted-foreground">{user?.email || "john@example.com"}</p>
              <Badge variant="secondary" className="mt-1">Premium Member</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: ShoppingBag, label: "Orders", count: "12" },
          { icon: Heart, label: "Wishlist", count: "5" },
          { icon: CreditCard, label: "Payment", count: "3" },
          { icon: Bell, label: "Notifications", count: "2" }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={index} 
              className="text-center cursor-pointer hover:shadow-medium transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
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
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "Edit Profile Information",
            "Change Password",
            "Payment Methods",
            "Delivery Addresses",
            "Notification Preferences",
            "Privacy Settings"
          ].map((setting, index) => (
            <Button 
              key={index}
              variant="ghost" 
              className="w-full justify-start"
            >
              {setting}
            </Button>
          ))}
          <Button variant="destructive" className="w-full mt-4">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4 shadow-medium">
        <div className="container mx-auto">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6" />
            <h1 className="text-xl font-bold">
              {isLoggedIn ? "My Account" : "Login / Register"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {isLoggedIn ? <ProfileDashboard /> : <LoginForm />}
      </div>
    </div>
  );
};

export default Profile;