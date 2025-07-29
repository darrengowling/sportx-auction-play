import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Users, DollarSign, Star, Settings } from "lucide-react";
import toast from 'react-hot-toast';

const Profile = () => {
  const mockUser = {
    name: "Cricket Pro",
    username: "@cricketpro",
    avatar: "",
    credits: 50000,
    leaguesWon: 3,
    totalSpent: 125000,
    winRate: 68,
    currentRank: 47,
    totalAuctions: 28,
    favoritePosition: "Batsman"
  };

  const recentActivity = [
    { type: "bid", player: "Virat Kohli", amount: 850000, time: "2 hours ago" },
    { type: "win", player: "MS Dhoni", amount: 750000, time: "1 day ago" },
    { type: "join", league: "IPL Championship Pro", time: "2 days ago" }
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl font-bold gradient-card">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{mockUser.name}</h1>
              <p className="text-muted-foreground mb-4">{mockUser.username}</p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-warning" />
                  <span className="text-sm">Rank #{mockUser.currentRank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">{mockUser.winRate}% Win Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">{mockUser.leaguesWon} Leagues Won</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="touch-target"
              onClick={() => toast.success("Profile settings coming soon! ⚙️")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center gradient-card">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">${mockUser.credits.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Credits</div>
              </Card>
              <Card className="p-4 text-center gradient-card">
                <Trophy className="h-6 w-6 mx-auto mb-2 text-warning" />
                <div className="text-2xl font-bold">{mockUser.totalAuctions}</div>
                <div className="text-xs text-muted-foreground">Auctions</div>
              </Card>
              <Card className="p-4 text-center gradient-card">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">${mockUser.totalSpent.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Spent</div>
              </Card>
              <Card className="p-4 text-center gradient-card">
                <Star className="h-6 w-6 mx-auto mb-2 text-secondary" />
                <div className="text-2xl font-bold">{mockUser.favoritePosition}</div>
                <div className="text-xs text-muted-foreground">Favorite</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      {activity.type === 'bid' && <TrendingUp className="h-4 w-4 text-warning" />}
                      {activity.type === 'win' && <Trophy className="h-4 w-4 text-success" />}
                      {activity.type === 'join' && <Users className="h-4 w-4 text-primary" />}
                      <div>
                        <div className="font-medium text-sm">
                          {activity.type === 'bid' && `Bid on ${activity.player}`}
                          {activity.type === 'win' && `Won ${activity.player}`}
                          {activity.type === 'join' && `Joined ${activity.league}`}
                        </div>
                        {activity.amount && (
                          <div className="text-xs text-muted-foreground">
                            ${activity.amount.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge variant="success">🏆</Badge>
                  <div>
                    <div className="font-medium text-sm">League Champion</div>
                    <div className="text-xs text-muted-foreground">Won 3 leagues</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">⚡</Badge>
                  <div>
                    <div className="font-medium text-sm">Quick Bidder</div>
                    <div className="text-xs text-muted-foreground">Fastest bid times</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">🎯</Badge>
                  <div>
                    <div className="font-medium text-sm">Strategist</div>
                    <div className="text-xs text-muted-foreground">High win rate</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full touch-target" 
                  variant="outline"
                  onClick={() => toast.success("Creating new league! 🏆")}
                >
                  Create League
                </Button>
                <Button 
                  className="w-full touch-target" 
                  variant="outline"
                  onClick={() => toast.success("Finding active auctions! 🎯")}
                >
                  Find Auctions
                </Button>
                <Button 
                  className="w-full touch-target" 
                  variant="outline"
                  onClick={() => toast.success("Viewing leaderboard! 📊")}
                >
                  View Leaderboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;