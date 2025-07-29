import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Trophy, Clock, Copy, Play, Search } from "lucide-react";
import { Tournament } from "@/types/sports";
import { useLocation } from "wouter";
import CreateTournamentDialog from "@/components/CreateTournamentDialog";
import toast from "react-hot-toast";

const Tournaments = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [tournaments, setTournaments] = useState<Tournament[]>([
    // Mock tournament data - in real app, this would come from an API
    {
      id: "1",
      name: "IPL 2024 Championship",
      sport: "cricket",
      realLifeTournament: "IPL 2024",
      admin: "Current User",
      participants: [
        { id: "1", name: "You", budget: 100000, squad: [], userId: "1", isAdmin: false, inviteStatus: "accepted", currentBudget: 100000, totalScore: 0 },
        { id: "2", name: "Alex Kumar", budget: 100000, squad: [], userId: "2", isAdmin: false, inviteStatus: "accepted", currentBudget: 100000, totalScore: 0 }
      ],
      maxParticipants: 10,
      status: "setup",
      budget: 100000,
      squadComposition: {
        batsmen: 4,
        bowlers: 4,
        allRounders: 2,
        wicketKeepers: 1
      },
      auctionDate: new Date("2024-03-15T18:00:00"),
      auctionDuration: 2,
      createdAt: new Date("2024-03-01"),
      inviteCode: "ABC123"
    },
    {
      id: "2", 
      name: "Australia vs India Test Series",
      sport: "cricket",
      realLifeTournament: "Border-Gavaskar Trophy 2024",
      admin: "Sarah Smith",
      participants: [],
      maxParticipants: 8,
      status: "auction_scheduled",
      budget: 80000,
      squadComposition: {
        batsmen: 4,
        bowlers: 4,
        allRounders: 2,
        wicketKeepers: 1
      },
      auctionDate: new Date("2024-03-20T19:30:00"),
      auctionDuration: 1.5,
      createdAt: new Date("2024-03-02"),
      inviteCode: "XYZ789"
    },
    {
      id: "3",
      name: "Big Bash League Pro",
      sport: "cricket", 
      realLifeTournament: "BBL 2024",
      admin: "Mike Johnson",
      participants: [],
      maxParticipants: 12,
      status: "active",
      budget: 120000,
      squadComposition: {
        batsmen: 3,
        bowlers: 4,
        allRounders: 3,
        wicketKeepers: 1
      },
      auctionDate: new Date("2024-03-10T17:00:00"),
      auctionDuration: 2,
      createdAt: new Date("2024-02-28"),
      inviteCode: "DEF456"
    }
  ]);

  const handleCreateTournament = (tournamentData: Omit<Tournament, 'id' | 'createdAt'>) => {
    const newTournament: Tournament = {
      ...tournamentData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setTournaments(prev => [newTournament, ...prev]);
  };

  const handleJoinTournament = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    if (tournament.participants.length >= tournament.maxParticipants) {
      toast.error("Tournament is full!");
      return;
    }

    setTournaments(prev => prev.map(t => 
      t.id === tournamentId 
        ? { ...t, participants: [...t.participants, { 
            id: "current-user", 
            name: "You", 
            budget: t.budget, 
            squad: [],
            userId: "current-user",
            isAdmin: false,
            inviteStatus: "accepted",
            currentBudget: t.budget,
            totalScore: 0
          }] }
        : t
    ));
    
    toast.success("Joined tournament successfully!");
  };

  const handleStartAuction = (tournamentId: string) => {
    navigate(`/auction/${tournamentId}`);
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Invite code copied!");
  };

  const tabs = [
    { 
      value: "all", 
      label: "All", 
      count: tournaments.length 
    },
    { 
      value: "setup", 
      label: "Setup", 
      count: tournaments.filter(t => t.status === "setup").length 
    },
    { 
      value: "active", 
      label: "Active", 
      count: tournaments.filter(t => t.status === "active").length 
    },
    { 
      value: "auction_scheduled", 
      label: "Auction Soon", 
      count: tournaments.filter(t => t.status === "auction_scheduled").length 
    },
  ];

  // Filter tournaments based on search and selected tab
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.realLifeTournament.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || tournament.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cricket Tournaments</h1>
            <p className="text-muted-foreground">Create and join strategic cricket tournaments</p>
          </div>
          <CreateTournamentDialog onCreateTournament={handleCreateTournament} />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                {tournaments.filter(t => t.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active Tournaments</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {tournaments.filter(t => t.status === "auction_scheduled").length}
              </div>
              <div className="text-sm text-muted-foreground">Auctions Soon</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">
                {tournaments.reduce((acc, t) => acc + t.participants.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {tournaments.reduce((acc, t) => acc + (t.budget * t.participants.length), 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Budget</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tournaments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="relative">
                {tab.label}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {tab.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{tournament.name}</CardTitle>
                      <div className="text-sm text-muted-foreground mb-2">
                        Based on {tournament.realLifeTournament}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={
                          tournament.status === 'active' ? 'default' : 
                          tournament.status === 'auction_scheduled' ? 'secondary' : 
                          'outline'
                        }>
                          {tournament.status === 'setup' ? 'Setup' :
                           tournament.status === 'auction_scheduled' ? 'Auction Scheduled' :
                           tournament.status === 'active' ? 'Live' : 'Completed'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          by {tournament.admin}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {tournament.participants.length}/{tournament.maxParticipants} players
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-medium">{tournament.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Squad Size:</span>
                      <span className="font-medium">
                        {tournament.squadComposition.batsmen + tournament.squadComposition.bowlers + 
                         tournament.squadComposition.allRounders + tournament.squadComposition.wicketKeepers} players
                      </span>
                    </div>
                    {tournament.inviteCode && (
                      <div className="flex justify-between">
                        <span>Invite Code:</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-1 font-mono"
                          onClick={() => copyInviteCode(tournament.inviteCode!)}
                        >
                          {tournament.inviteCode}
                          <Copy className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {tournament.admin === "Current User" ? (
                      <Button 
                        className="flex-1" 
                        onClick={() => handleStartAuction(tournament.id)}
                        disabled={tournament.participants.length < 2}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {tournament.status === 'setup' ? 'Start Auction' : 'Enter Auction'}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleJoinTournament(tournament.id)}
                        disabled={tournament.participants.length >= tournament.maxParticipants}
                      >
                        {tournament.participants.some(p => p.name === "You") ? "Joined" : "Join Tournament"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground mb-4">No tournaments found</div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTab("all");
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;