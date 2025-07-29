import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tournament } from "@/types/sports";
import { Calendar, Users, DollarSign, Search, Trophy, Crown } from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import toast from 'react-hot-toast';

const Tournaments = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock tournament data - in real app, this would come from an API
  const tournaments: Tournament[] = [
    {
      id: "1",
      name: "IPL 2024 Championship",
      sport: "cricket",
      realLifeTournament: "IPL 2024",
      admin: "John Doe",
      participants: [],
      maxParticipants: 10,
      status: "auction_scheduled",
      budget: 100000,
      squadRules: {
        totalPlayers: 11,
        batsmen: { min: 3, max: 6 },
        bowlers: { min: 3, max: 6 },
        allRounders: { min: 1, max: 4 },
        wicketKeepers: { min: 1, max: 2 }
      },
      auctionDate: new Date("2024-03-15T18:00:00"),
      auctionDuration: 2,
      createdAt: new Date("2024-03-01"),
    },
    {
      id: "2", 
      name: "Australia vs India Test Series",
      sport: "cricket",
      realLifeTournament: "Border-Gavaskar Trophy 2024",
      admin: "Sarah Smith",
      participants: [],
      maxParticipants: 8,
      status: "draft",
      budget: 80000,
      squadRules: {
        totalPlayers: 11,
        batsmen: { min: 4, max: 6 },
        bowlers: { min: 4, max: 6 },
        allRounders: { min: 1, max: 3 },
        wicketKeepers: { min: 1, max: 2 }
      },
      auctionDate: new Date("2024-03-20T19:30:00"),
      auctionDuration: 1.5,
      createdAt: new Date("2024-03-02"),
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
      squadRules: {
        totalPlayers: 11,
        batsmen: { min: 3, max: 5 },
        bowlers: { min: 3, max: 5 },
        allRounders: { min: 2, max: 4 },
        wicketKeepers: { min: 1, max: 2 }
      },
      auctionDate: new Date("2024-03-10T17:00:00"),
      auctionDuration: 2,
      createdAt: new Date("2024-02-28"),
    }
  ];

  const tabs = [
    { 
      value: "all", 
      label: "All Tournaments", 
      count: tournaments.length 
    },
    { 
      value: "active", 
      label: "Active", 
      count: tournaments.filter(t => t.status === "active").length 
    },
    { 
      value: "draft", 
      label: "Draft", 
      count: tournaments.filter(t => t.status === "draft").length 
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

  // Helper function to get status color
  const getStatusColor = (status: Tournament["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "auction_scheduled":
        return "destructive";
      case "auction_live":
        return "default";
      case "completed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Cricket Tournaments</h1>
            <p className="text-muted-foreground">Create and join strategic cricket tournaments</p>
          </div>
          <Button onClick={() => toast.success("Create Tournament feature coming soon!")}>
            Create Tournament
          </Button>
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
                ${tournaments.reduce((acc, t) => acc + (t.budget * t.participants.length), 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Budgets</div>
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
              <Card 
                key={tournament.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  toast.success(`Viewing ${tournament.name}`);
                  navigate(`/tournament/${tournament.id}`);
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{tournament.name}</CardTitle>
                      <div className="text-sm text-muted-foreground mb-2">
                        Based on {tournament.realLifeTournament}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getStatusColor(tournament.status)}>
                          {tournament.status === "auction_scheduled" ? "Auction Soon" : 
                           tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          by {tournament.admin}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">
                        {tournament.participants.length}/{tournament.maxParticipants}
                      </div>
                      <div className="text-xs text-muted-foreground">participants</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">${tournament.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Squad Size:</span>
                      <span className="font-medium">{tournament.squadRules.totalPlayers} players</span>
                    </div>
                    {tournament.auctionDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Auction:</span>
                        <span className="font-medium">
                          {tournament.auctionDate.toLocaleDateString()}
                        </span>
                      </div>
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