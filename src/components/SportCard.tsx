import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sport } from "@/types/sports";
import { Users, Clock, Trophy } from "lucide-react";

interface SportCardProps {
  sport: Sport;
  onSelect: (sport: Sport) => void;
  activeAuctions?: number;
  upcomingAuctions?: number;
}

const SportCard = ({ sport, onSelect, activeAuctions = 0, upcomingAuctions = 0 }: SportCardProps) => {
  return (
    <Card className="relative overflow-hidden auction-glow hover:scale-105 transition-all duration-300 cursor-pointer group">
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
        style={{ background: sport.gradient }}
      />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{sport.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{sport.name}</h3>
              <p className="text-sm text-muted-foreground">{sport.description}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-1 text-success">
            <Trophy className="h-4 w-4" />
            <span>{activeAuctions} Active</span>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            <Clock className="h-4 w-4" />
            <span>{upcomingAuctions} Upcoming</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{Math.floor(Math.random() * 500) + 100}+ Players</span>
          </div>
        </div>

        <Button 
          onClick={() => onSelect(sport)}
          className="w-full"
          variant="outline"
          style={{ borderColor: sport.color }}
        >
          View Tournaments
        </Button>
      </div>
    </Card>
  );
};

export default SportCard;