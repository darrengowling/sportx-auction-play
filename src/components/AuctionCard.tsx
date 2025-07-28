import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/sports";
import { Clock, Users, DollarSign, TrendingUp } from "lucide-react";

interface AuctionCardProps {
  player: Player;
  currentBid: number;
  timeLeft: string;
  bidders: number;
  onBid: (player: Player) => void;
  isLive?: boolean;
}

const AuctionCard = ({ 
  player, 
  currentBid, 
  timeLeft, 
  bidders, 
  onBid, 
  isLive = false 
}: AuctionCardProps) => {
  return (
    <Card className="relative overflow-hidden auction-glow hover:scale-105 transition-all duration-300">
      {isLive && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-warning to-destructive animate-pulse" />
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full gradient-card flex items-center justify-center text-lg font-bold">
              {player.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-semibold text-sm">{player.name}</h3>
              <p className="text-xs text-muted-foreground">{player.position}</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs font-medium">{player.rating}/100</span>
              </div>
            </div>
          </div>
          {isLive && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-success">
              <DollarSign className="h-4 w-4" />
              <span className="font-semibold">${currentBid.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{bidders} bidders</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-warning">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{timeLeft}</span>
          </div>
        </div>

        <Button 
          onClick={() => onBid(player)}
          className="w-full"
          variant={isLive ? "auction" : "default"}
          size="sm"
        >
          {isLive ? "Place Bid" : "Join Auction"}
        </Button>
      </div>
    </Card>
  );
};

export default AuctionCard;