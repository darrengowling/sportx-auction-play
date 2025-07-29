import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Tournament } from "@/types/sports";

interface CreateTournamentDialogProps {
  onCreateTournament: (tournament: Omit<Tournament, 'id' | 'createdAt'>) => void;
}

const CreateTournamentDialog = ({ onCreateTournament }: CreateTournamentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    realLifeTournament: "",
    description: "",
    maxParticipants: 8,
    budget: 100000,
    squadComposition: {
      batsmen: 4,
      bowlers: 4,
      allRounders: 2,
      wicketKeepers: 1
    },
    auctionDate: new Date(),
    auctionDuration: 2
  });

  const realTournaments = [
    "IPL 2024", "BBL 2024", "CPL 2024", "PSL 2024", 
    "England vs India Test Series", "Australia vs Pakistan ODI Series",
    "T20 World Cup 2024", "Champions Trophy 2025"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.realLifeTournament) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTournament: Omit<Tournament, 'id' | 'createdAt'> = {
      name: formData.name,
      sport: "cricket",
      realLifeTournament: formData.realLifeTournament,
      // description: formData.description, // Remove this line since description is optional in the type
      admin: "Current User", // In real app, get from auth
      participants: [],
      maxParticipants: formData.maxParticipants,
      status: "draft",
      budget: formData.budget,
      squadComposition: formData.squadComposition,
      auctionDate: formData.auctionDate,
      auctionDuration: formData.auctionDuration,
      inviteCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    };

    onCreateTournament(newTournament);
    toast.success("Tournament created successfully!");
    setOpen(false);
    
    // Reset form
    setFormData({
      name: "",
      realLifeTournament: "",
      description: "",
      maxParticipants: 8,
      budget: 100000,
      squadComposition: {
        batsmen: 4,
        bowlers: 4,
        allRounders: 2,
        wicketKeepers: 1
      },
      auctionDate: new Date(),
      auctionDuration: 2
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Tournament
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Tournament</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <div>
              <Label htmlFor="name">Tournament Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder="e.g., Friends IPL Championship"
                required
              />
            </div>
            <div>
              <Label htmlFor="realTournament">Based on Real Tournament *</Label>
              <Select value={formData.realLifeTournament} onValueChange={(value) => setFormData(prev => ({...prev, realLifeTournament: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select real cricket tournament" />
                </SelectTrigger>
                <SelectContent>
                  {realTournaments.map(tournament => (
                    <SelectItem key={tournament} value={tournament}>
                      {tournament}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                placeholder="Tournament details, rules, prizes..."
              />
            </div>
            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Select value={formData.maxParticipants.toString()} onValueChange={(value) => setFormData(prev => ({...prev, maxParticipants: parseInt(value)}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 Players</SelectItem>
                  <SelectItem value="5">5 Players (Recommended for Testing)</SelectItem>
                  <SelectItem value="6">6 Players</SelectItem>
                  <SelectItem value="8">8 Players</SelectItem>
                  <SelectItem value="10">10 Players</SelectItem>
                  <SelectItem value="12">12 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget & Squad Rules */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Budget & Squad Composition</h3>
            <div>
              <Label htmlFor="budget">Budget per Player (Credits)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({...prev, budget: parseInt(e.target.value)}))}
                min="50000"
                max="500000"
                step="10000"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Batsmen Required</Label>
                <Input
                  type="number"
                  value={formData.squadComposition.batsmen}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    squadComposition: {...prev.squadComposition, batsmen: parseInt(e.target.value)}
                  }))}
                  min="2"
                  max="8"
                />
              </div>
              <div>
                <Label>Bowlers Required</Label>
                <Input
                  type="number"
                  value={formData.squadComposition.bowlers}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    squadComposition: {...prev.squadComposition, bowlers: parseInt(e.target.value)}
                  }))}
                  min="2"
                  max="8"
                />
              </div>
              <div>
                <Label>All-Rounders Required</Label>
                <Input
                  type="number"
                  value={formData.squadComposition.allRounders}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    squadComposition: {...prev.squadComposition, allRounders: parseInt(e.target.value)}
                  }))}
                  min="1"
                  max="4"
                />
              </div>
              <div>
                <Label>Wicket-Keepers Required</Label>
                <Input
                  type="number"
                  value={formData.squadComposition.wicketKeepers}
                  onChange={(e) => setFormData(prev => ({
                    ...prev, 
                    squadComposition: {...prev.squadComposition, wicketKeepers: parseInt(e.target.value)}
                  }))}
                  min="1"
                  max="2"
                />
              </div>
            </div>
          </div>

          {/* Auction Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Auction Schedule</h3>
            <div>
              <Label>Auction Date & Time</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.auctionDate, "PPP 'at' p")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.auctionDate}
                    onSelect={(date) => date && setFormData(prev => ({...prev, auctionDate: date}))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Auction Duration (hours)</Label>
              <Select value={formData.auctionDuration.toString()} onValueChange={(value) => setFormData(prev => ({...prev, auctionDuration: parseFloat(value)}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="1.5">1.5 hours</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Tournament
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTournamentDialog;