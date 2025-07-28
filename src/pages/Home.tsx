import { useState } from "react";
import { Button } from "@/components/ui/button";
import SportCard from "@/components/SportCard";
import AuctionCard from "@/components/AuctionCard";
import { sports } from "@/data/sports";
import { Sport, Player } from "@/types/sports";
import { TrendingUp, Trophy, Users, Clock } from "lucide-react";
import { useLocation } from "wouter";

const Home = () => {
  const [, navigate] = useLocation();
  
  const handleSportSelect = (sport: Sport) => {
    navigate(`/sport/${sport.id}`);
  };

  const handlePlayerBid = (player: Player) => {
    navigate(`/auction/${player.id}`);
  };

  // Sample data for featured auctions
  const featuredAuctions: Player[] = [
    {
      id: "1",
      name: "Virat Kohli",
      sport: "cricket",
      position: "Batsman",
      rating: 95,
      price: 850000,
      image: "",
      stats: { runs: 12000, average: 59.07, centuries: 70 }
    },
    {
      id: "2", 
      name: "MS Dhoni",
      sport: "cricket",
      position: "Wicket Keeper",
      rating: 92,
      price: 750000,
      image: "",
      stats: { runs: 10500, sixes: 229, matches: 350 }
    },
    {
      id: "3",
      name: "Rohit Sharma", 
      sport: "cricket",
      position: "Batsman",
      rating: 91,
      price: 680000,
      image: "",
      stats: { runs: 9500, average: 48.96, doublecenturies: 3 }
    }
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-hero bg-clip-text text-transparent">
                Cricket Auction Pro
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              The ultimate cricket auction platform. Build your dream cricket team and dominate the league.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" onClick={() => navigate("/auctions")}>
                <Trophy className="mr-2 h-5 w-5" />
                Start Bidding
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("/leagues")}>
                <Users className="mr-2 h-5 w-5" />
                Join League
              </Button>
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
              <div className="text-sm text-muted-foreground">Active Leagues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Prize Pool</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">🏏 Live Cricket Auctions</h2>
            <Button variant="outline" onClick={() => navigate("/auctions")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAuctions.map((player, index) => (
              <AuctionCard
                key={player.id}
                player={player}
                currentBid={player.price + Math.floor(Math.random() * 100000)}
                timeLeft={`${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`}
                bidders={Math.floor(Math.random() * 20) + 5}
                onBid={handlePlayerBid}
                isLive={index < 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cricket Focus */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Cricket Leagues</h2>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>IPL • BBL • CPL</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Home;