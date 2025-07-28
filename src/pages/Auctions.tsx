import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AuctionCard from "@/components/AuctionCard";
import { Player } from "@/types/sports";
import { Search, Filter, SortDesc, Trophy, Clock, Users } from "lucide-react";
import { useLocation } from "wouter";

const Auctions = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSport, setSelectedSport] = useState("all");

  const handlePlayerBid = (player: Player) => {
    navigate(`/auction/${player.id}`);
  };

  // Sample auction data
  const auctions: Player[] = [
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
    },
    {
      id: "4",
      name: "Jasprit Bumrah",
      sport: "cricket", 
      position: "Bowler",
      rating: 94,
      price: 720000,
      image: "",
      stats: { wickets: 130, economy: 4.2, average: 24.5 }
    },
    {
      id: "5",
      name: "KL Rahul",
      sport: "cricket",
      position: "Wicket Keeper",
      rating: 88,
      price: 580000,
      image: "",
      stats: { runs: 8000, average: 47.1, strikerate: 135.2 }
    },
    {
      id: "6",
      name: "Hardik Pandya",
      sport: "cricket",
      position: "All Rounder", 
      rating: 90,
      price: 650000,
      image: "",
      stats: { runs: 4500, wickets: 85, sixes: 156 }
    }
  ];

  const sports = ["all", "cricket", "nfl", "nba", "rugby", "tennis", "golf"];

  const filteredAuctions = auctions.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === "all" || player.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Live Auctions
            </h1>
            <p className="text-muted-foreground">
              Bid on your favorite players and build your dream team
            </p>
          </div>
          <Button variant="auction" size="lg" className="mt-4 md:mt-0">
            <Trophy className="mr-2 h-5 w-5" />
            Create Auction
          </Button>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-success">24</div>
            <div className="text-sm text-muted-foreground">Live Now</div>
          </Card>
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-warning">156</div>
            <div className="text-sm text-muted-foreground">Ending Soon</div>
          </Card>
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-primary">2.1K</div>
            <div className="text-sm text-muted-foreground">Active Bidders</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players, positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sports.map((sport) => (
              <Button
                key={sport}
                variant={selectedSport === sport ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSport(sport)}
                className="whitespace-nowrap"
              >
                {sport === "all" ? "All Sports" : sport.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <SortDesc className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAuctions.map((player, index) => (
            <AuctionCard
              key={player.id}
              player={player}
              currentBid={player.price + Math.floor(Math.random() * 200000)}
              timeLeft={`${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`}
              bidders={Math.floor(Math.random() * 25) + 8}
              onBid={handlePlayerBid}
              isLive={index < 4}
            />
          ))}
        </div>

        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No auctions found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or check back later for new auctions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;