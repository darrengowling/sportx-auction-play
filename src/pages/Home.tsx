import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SportCard from "@/components/SportCard";
import TournamentGuide from "@/components/TournamentGuide";
import OnboardingTutorial from "@/components/OnboardingTutorial";
import { sports } from "@/data/sports";
import { Sport } from "@/types/sports";
import { TrendingUp, Trophy, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";
import toast from 'react-hot-toast';
import cricketStadiumHero from "@/assets/cricket-stadium-hero.jpg";
import cricketGroundBg from "@/assets/cricket-ground-bg.jpg";

// Force rebuild to clear featuredAuctions cache

const Home = () => {
  const [, navigate] = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const handleSportSelect = (sport: Sport) => {
    navigate(`/tournaments`);
  };

  // Check if user is new (in real app, this would be from user state/localStorage)
  useEffect(() => {
    console.log("🏠 Home component loaded with all UX improvements");
    console.log("🎯 Checking onboarding status...");
    const hasSeenOnboarding = localStorage.getItem('sport-x-onboarding-seen');
    console.log("📋 Has seen onboarding:", hasSeenOnboarding);
    if (!hasSeenOnboarding) {
      console.log("✨ Showing onboarding tutorial");
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('sport-x-onboarding-seen', 'true');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create-quick':
        navigate("/tournaments?quick=test");
        break;
      case 'share-code':
        toast.success("Tip: Use the share button next to invite codes!");
        break;
      case 'bid-tips':
        toast.success("Quick Tip: Use Quick Bid buttons for fast bidding!");
        break;
      case 'strategy-guide':
        navigate("/how-it-works");
        break;
    }
  };


  return (
    <div className="min-h-screen pb-20 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center md:min-h-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${cricketStadiumHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container mx-auto px-4 py-8 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-hero bg-clip-text text-transparent">
                Sport X Cricket
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Play with friends. Bid for superstars. Build legendary teams.
            </p>
            <div className="inline-block bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium mb-8">
              No gambling. All game.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="touch-target"
                onClick={() => {
                  toast.success("Creating test tournament! 🏏");
                  navigate("/tournaments?quick=test");
                }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Quick Test Tournament
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="touch-target bg-background/10 text-white border-white/20 hover:bg-white/10"
                onClick={() => {
                  navigate("/tournaments");
                }}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Browse All Tournaments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${cricketGroundBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Play. Connect. Compete.</h2>
            <p className="text-lg text-muted-foreground">
              Connect with friends, compete in live auctions, and celebrate cricket together.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto md:grid-cols-3 md:gap-8 md:max-w-4xl">
            <div className="text-center p-8 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
              <div className="text-warning text-3xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2 text-lg">Live Auctions</h3>
              <p className="text-muted-foreground">Real-time bidding with timer-based competitions</p>
            </div>
            <div className="text-center p-8 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
              <div className="text-success text-3xl mb-4">🏆</div>
              <h3 className="font-semibold mb-2 text-lg">Tournament Admin</h3>
              <p className="text-muted-foreground">Create custom tournaments and invite friends</p>
            </div>
            <div className="text-center p-8 rounded-lg border border-border bg-card/80 backdrop-blur-sm">
              <div className="text-primary text-3xl mb-4">📈</div>
              <h3 className="font-semibold mb-2 text-lg">Live Scoring</h3>
              <p className="text-muted-foreground">Track real cricket performance instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-success">47</div>
              <div className="text-sm text-muted-foreground">Live Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-warning">1.2K</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">156</div>
              <div className="text-sm text-muted-foreground">Active Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Prize Pool</div>
            </div>
          </div>
        </div>
      </section>


      {/* Cricket Tournaments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Cricket Tournaments</h2>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-8">
              <TrendingUp className="h-4 w-4" />
              <span>IPL • BBL • CPL • Test Series</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto md:grid-cols-2 lg:grid-cols-3 md:max-w-4xl">
            {sports.map((sport) => (
              <SportCard
                key={sport.id}
                sport={sport}
                onSelect={handleSportSelect}
                activeAuctions={Math.floor(Math.random() * 15) + 3}
                upcomingAuctions={Math.floor(Math.random() * 10) + 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New User Guide */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">New to Sport X Cricket?</h2>
              <p className="text-muted-foreground">Get started in minutes with our simple guide</p>
            </div>
            <TournamentGuide 
              variant="detailed" 
              showQuickActions={true}
              onQuickAction={handleQuickAction}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Squad?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Strategy meets cricket. Knowledge beats luck. Champions are made here.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="hero" 
                size="lg"
                className="touch-target"
                onClick={() => {
                  toast.success("Go to Tournaments! 🏏");
                  navigate("/tournaments");
                }}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Go to Tournaments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Tutorial */}
      <OnboardingTutorial 
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
};

export default Home;