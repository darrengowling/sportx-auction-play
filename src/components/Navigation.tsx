import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home, Trophy, Users, Settings, User, HelpCircle } from "lucide-react";
import toast from 'react-hot-toast';

const Navigation = () => {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/auctions", icon: Trophy, label: "Auctions" },
    { path: "/tournaments", icon: Users, label: "Tournaments" },
    { path: "/how-it-works", icon: HelpCircle, label: "How it Works" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border md:top-0 md:bottom-auto md:bg-card/95">
      <div className="container mx-auto px-4">
        {/* Mobile Navigation */}
        <div className="flex justify-around py-2 md:hidden">
          {navItems.slice(0, 4).map(({ path, icon: Icon, label }) => (
            <Link key={path} href={path}>
              <Button
                variant={location === path ? "default" : "ghost"}
                size="sm"
                className="flex flex-col h-auto py-2 px-2 min-w-[55px]"
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{label === "How it Works" ? "Guide" : label}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
              Sport X
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link key={path} href={path}>
                <Button
                  variant={location === path ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-sm text-muted-foreground">
              Welcome to <span className="text-primary font-semibold">Sport X</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;