import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AuctionCard from "@/components/AuctionCard";
import { EmptyState } from "@/components/LoadingStates";
import { cricketPlayers } from "@/data/cricketPlayers";
import { Player } from "@/types/sports";
import { Search, Filter, SortDesc, Trophy, Clock, Users } from "lucide-react";
import { useLocation } from "wouter";
import toast from 'react-hot-toast';

const Auctions = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const handlePlayerBid = (player: Player) => {
    navigate(`/auction/${player.id}`);
  };

  // Use expanded cricket player data
  const auctions = cricketPlayers;

  const filteredAuctions = auctions.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.position.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Cricket Auctions
            </h1>
            <p className="text-muted-foreground">
              Bid on cricket stars and build your dream team
            </p>
          </div>
          <Button 
            variant="auction" 
            size="lg" 
            className="mt-4 md:mt-0 touch-target"
            onClick={() => toast.success("Create auction feature coming soon! 🎯")}
          >
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
              placeholder="Search cricket players, positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="touch-target"
              onClick={() => toast.success("Advanced filters coming soon! 🔧")}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="touch-target"
              onClick={() => toast.success("Sort options coming soon! 📊")}
            >
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
          <EmptyState
            icon={<Trophy className="h-16 w-16 mx-auto" />}
            title="No auctions found"
            description="Try adjusting your search criteria or check back later for new auctions."
            action={
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
                className="touch-target"
              >
                Clear Search
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Auctions;