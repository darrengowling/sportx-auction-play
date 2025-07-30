import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Trophy, 
  Zap, 
  Users, 
  Target, 
  Star, 
  Award,
  CheckCircle,
  Crown,
  Medal,
  TrendingUp
} from "lucide-react";
import toast from "react-hot-toast";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  reward?: string;
}

interface AchievementSystemProps {
  userStats: {
    tournamentsCreated: number;
    tournamentsJoined: number;
    auctionsParticipated: number;
    totalBids: number;
    tournamentsWon: number;
    highestBid: number;
  };
  onClaimReward?: (achievementId: string) => void;
}

const achievementDefinitions: Omit<Achievement, 'unlocked' | 'progress'>[] = [
  {
    id: 'first-tournament',
    title: 'Tournament Creator',
    description: 'Create your first tournament',
    icon: Trophy,
    color: 'text-warning',
    reward: '100 bonus credits'
  },
  {
    id: 'first-join',
    title: 'Team Player',
    description: 'Join your first tournament',
    icon: Users,
    color: 'text-success',
    reward: '50 bonus credits'
  },
  {
    id: 'first-bid',
    title: 'Bidding Rookie',
    description: 'Place your first bid in an auction',
    icon: Zap,
    color: 'text-primary',
    reward: 'Unlock bid strategies guide'
  },
  {
    id: 'high-roller',
    title: 'High Roller',
    description: 'Place a bid over ₹50,000',
    icon: Target,
    color: 'text-secondary',
    maxProgress: 50000,
    reward: 'VIP bidder badge'
  },
  {
    id: 'social-butterfly',
    title: 'Social Butterfly',
    description: 'Join 5 different tournaments',
    icon: Star,
    color: 'text-primary',
    maxProgress: 5,
    reward: 'Social player badge'
  },
  {
    id: 'champion',
    title: 'Champion',
    description: 'Win your first tournament',
    icon: Crown,
    color: 'text-warning',
    reward: 'Champion badge + 500 credits'
  },
  {
    id: 'legend',
    title: 'Cricket Legend',
    description: 'Win 3 tournaments',
    icon: Medal,
    color: 'text-success',
    maxProgress: 3,
    reward: 'Legend status + exclusive avatar'
  },
  {
    id: 'auction-master',
    title: 'Auction Master',
    description: 'Participate in 10 auctions',
    icon: TrendingUp,
    color: 'text-secondary',
    maxProgress: 10,
    reward: 'Auction expert badge'
  }
];

const AchievementSystem = ({ userStats, onClaimReward }: AchievementSystemProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);

  useEffect(() => {
    const updatedAchievements = achievementDefinitions.map(def => {
      let unlocked = false;
      let progress = 0;

      switch (def.id) {
        case 'first-tournament':
          unlocked = userStats.tournamentsCreated > 0;
          progress = Math.min(userStats.tournamentsCreated, 1);
          break;
        case 'first-join':
          unlocked = userStats.tournamentsJoined > 0;
          progress = Math.min(userStats.tournamentsJoined, 1);
          break;
        case 'first-bid':
          unlocked = userStats.totalBids > 0;
          progress = Math.min(userStats.totalBids, 1);
          break;
        case 'high-roller':
          unlocked = userStats.highestBid >= 50000;
          progress = userStats.highestBid;
          break;
        case 'social-butterfly':
          unlocked = userStats.tournamentsJoined >= 5;
          progress = userStats.tournamentsJoined;
          break;
        case 'champion':
          unlocked = userStats.tournamentsWon > 0;
          progress = Math.min(userStats.tournamentsWon, 1);
          break;
        case 'legend':
          unlocked = userStats.tournamentsWon >= 3;
          progress = userStats.tournamentsWon;
          break;
        case 'auction-master':
          unlocked = userStats.auctionsParticipated >= 10;
          progress = userStats.auctionsParticipated;
          break;
      }

      return {
        ...def,
        unlocked,
        progress
      };
    });

    // Check for newly unlocked achievements
    const previouslyUnlocked = achievements.filter(a => a.unlocked).map(a => a.id);
    const nowUnlocked = updatedAchievements.filter(a => a.unlocked).map(a => a.id);
    const newUnlocks = nowUnlocked.filter(id => !previouslyUnlocked.includes(id));
    
    if (newUnlocks.length > 0) {
      setNewlyUnlocked(newUnlocks);
      newUnlocks.forEach(id => {
        const achievement = updatedAchievements.find(a => a.id === id);
        if (achievement) {
          toast.success(`🎉 Achievement Unlocked: ${achievement.title}!`, {
            duration: 4000,
            style: {
              background: '#22c55e',
              color: 'white',
            }
          });
        }
      });
    }

    setAchievements(updatedAchievements);
  }, [userStats]);

  const getProgressPercentage = (achievement: Achievement) => {
    if (!achievement.maxProgress) return achievement.unlocked ? 100 : 0;
    return Math.min((achievement.progress || 0) / achievement.maxProgress * 100, 100);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Achievements
            </h3>
            <p className="text-sm text-muted-foreground">
              {unlockedCount} of {totalCount} unlocked
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-warning">{unlockedCount}/{totalCount}</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const progressPercentage = getProgressPercentage(achievement);
            const isNewlyUnlocked = newlyUnlocked.includes(achievement.id);

            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-success/5 border-success/20' 
                    : 'bg-muted/20 border-border'
                } ${isNewlyUnlocked ? 'animate-pulse' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    achievement.unlocked 
                      ? 'bg-success/20' 
                      : 'bg-muted/50'
                  }`}>
                    <IconComponent className={`h-5 w-5 ${
                      achievement.unlocked 
                        ? achievement.color 
                        : 'text-muted-foreground'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {achievement.title}
                      </h4>
                      {achievement.unlocked && (
                        <CheckCircle className="h-4 w-4 text-success" />
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    
                    {achievement.maxProgress && (
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{achievement.progress || 0}</span>
                          <span>{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {achievement.reward && (
                      <Badge variant="outline" className="text-xs">
                        🎁 {achievement.reward}
                      </Badge>
                    )}
                    
                    {achievement.unlocked && onClaimReward && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 h-auto p-1 text-xs text-primary"
                        onClick={() => onClaimReward(achievement.id)}
                      >
                        Claim Reward →
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementSystem;