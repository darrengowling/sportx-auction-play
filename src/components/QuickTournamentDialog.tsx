import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Users, Clock, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import { Tournament } from "@/types/sports";

interface QuickTournamentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTournament: (tournament: Omit<Tournament, 'id' | 'createdAt'>) => void;
}

const QuickTournamentDialog = ({ open, onOpenChange, onCreateTournament }: QuickTournamentDialogProps) => {
  const [tournamentName, setTournamentName] = useState("Quick Test Tournament");

  const handleCreateQuickTournament = () => {
    const quickTournament: Omit<Tournament, 'id' | 'createdAt'> = {
      name: tournamentName || "Quick Test Tournament",
      sport: "cricket",
      realLifeTournament: "IPL 2024",
      admin: "Current User",
      participants: [],
      maxParticipants: 5, // Optimal for testing
      status: "setup",
      budget: 100000, // Standard budget
      squadComposition: {
        batsmen: 3,
        bowlers: 3,
        allRounders: 2,
        wicketKeepers: 1
      },
      auctionDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      auctionDuration: 0.5, // 30 minutes for quick testing
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };

    onCreateTournament(quickTournament);
    toast.success("Test tournament created! Share the invite code with your friends.");
    onOpenChange(false);
    setTournamentName("Quick Test Tournament");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            Create Test Tournament
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Tournament Name */}
          <div>
            <Label htmlFor="quickName">Tournament Name</Label>
            <Input
              id="quickName"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="Quick Test Tournament"
            />
          </div>

          {/* Pre-configured Settings */}
          <div className="bg-muted/20 rounded-lg p-4 space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">Pre-configured for Testing:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>5 Players Max</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-success" />
                <span>$100K Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span>30min Auction</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-secondary" />
                <span>Starts in 10min</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateQuickTournament}
              className="flex-1"
            >
              <Zap className="mr-2 h-4 w-4" />
              Create & Get Code
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Perfect for testing with 5 friends. All settings optimized for quick setup!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTournamentDialog;