import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { League } from "@/types/sports";
import { Users, Trophy, Calendar, DollarSign, Plus, Search, Crown } from "lucide-react";
import { useLocation } from "wouter";

const Leagues = () => {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Cricket-only league data
  const leagues: League[] = [
    {
      id: "1",
      name: "Cricket Champions League",
      sport: "cricket",
      creator: "SportsFan123",
      members: 8,
      maxMembers: 10,
      status: "active",
      budget: 1000000,
      auctionDate: new Date("2024-02-15")
    },
    {
      id: "2",
      name: "IPL Fantasy Pro",
      sport: "cricket",
      creator: "CricketKing",
      members: 12,
      maxMembers: 12,
      status: "active",
      budget: 1500000,
      auctionDate: new Date("2024-02-10")
    },
    {
      id: "3",
      name: "World Cup Legends",
      sport: "cricket",
      creator: "CricketMaster",
      members: 6,
      maxMembers: 12,
      status: "draft",
      budget: 2000000,
      auctionDate: new Date("2024-02-20")
    },
    {
      id: "4",
      name: "T20 Blast League",
      sport: "cricket",
      creator: "T20Expert",
      members: 9,
      maxMembers: 10,
      status: "active",
      budget: 1200000,
      auctionDate: new Date("2024-02-12")
    },
    {
      id: "5",
      name: "Cricket All-Stars",
      sport: "cricket",
      creator: "AllStarFan",
      members: 4,
      maxMembers: 8,
      status: "draft",
      budget: 800000,
      auctionDate: new Date("2024-02-25")
    },
    {
      id: "6",
      name: "Big Bash League Pro",
      sport: "cricket",
      creator: "BBLFan",
      members: 7,
      maxMembers: 10,
      status: "active",
      budget: 1100000,
      auctionDate: new Date("2024-02-08")
    }
  ];

  const tabs = [
    { id: "all", label: "All Leagues", count: leagues.length },
    { id: "my", label: "My Leagues", count: 3 },
    { id: "draft", label: "Draft", count: leagues.filter(l => l.status === "draft").length },
    { id: "active", label: "Active", count: leagues.filter(l => l.status === "active").length }
  ];

  const filteredLeagues = leagues.filter(league => {
    const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         league.sport.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "draft" && league.status === "draft") ||
                      (selectedTab === "active" && league.status === "active") ||
                      (selectedTab === "my" && Math.random() > 0.5); // Mock filter for "my leagues"
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: League["status"]) => {
    switch (status) {
      case "draft": return "warning";
      case "active": return "success";
      case "completed": return "secondary";
      default: return "default";
    }
  };

  const getSportIcon = (sport: string) => {
    // Cricket-only for now
    return "🏏";
  };

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Leagues
            </h1>
            <p className="text-muted-foreground">
              Join leagues, compete with friends, and climb the leaderboards
            </p>
          </div>
          <Button variant="premium" size="lg" className="mt-4 md:mt-0">
            <Plus className="mr-2 h-5 w-5" />
            Create League
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-success">156</div>
            <div className="text-sm text-muted-foreground">Active Leagues</div>
          </Card>
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-warning">23</div>
            <div className="text-sm text-muted-foreground">Drafting</div>
          </Card>
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-primary">8.2K</div>
            <div className="text-sm text-muted-foreground">Total Players</div>
          </Card>
          <Card className="p-4 text-center gradient-auction">
            <div className="text-2xl font-bold text-secondary">$15.6M</div>
            <div className="text-sm text-muted-foreground">Prize Pool</div>
          </Card>
        </div>

        {/* Search and Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leagues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={selectedTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab(tab.id)}
              className="whitespace-nowrap"
            >
              {tab.label}
              <Badge variant="secondary" className="ml-2">
                {tab.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Leagues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeagues.map((league) => (
            <Card key={league.id} className="overflow-hidden auction-glow hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getSportIcon(league.sport)}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{league.name}</h3>
                      <p className="text-sm text-muted-foreground">by {league.creator}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(league.status) as any}>
                    {league.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{league.members}/{league.maxMembers} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-secondary" />
                      <span className="font-medium">${(league.budget / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>

                  {league.auctionDate && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Auction: {league.auctionDate.toLocaleDateString()}</span>
                    </div>
                  )}

                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(league.members / league.maxMembers) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    variant={league.status === "draft" ? "warning" : "default"}
                    onClick={() => navigate(`/league/${league.id}`)}
                  >
                    {league.status === "draft" ? "Join Draft" : "View League"}
                  </Button>
                  {league.creator === "SportsFan123" && (
                    <Button variant="outline" size="sm">
                      <Crown className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLeagues.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No leagues found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or create a new league to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leagues;