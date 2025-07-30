import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Target, 
  Zap,
  Trophy,
  DollarSign,
  Activity,
  Bell,
  X
} from "lucide-react";
import toast from "react-hot-toast";

interface Notification {
  id: string;
  type: 'player_joined' | 'auction_starting' | 'bid_placed' | 'tournament_won' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface AnalyticsData {
  totalTournaments: number;
  totalBids: number;
  averageBidAmount: number;
  winRate: number;
  favoritePosition: string;
  recentActivity: Array<{
    action: string;
    timestamp: Date;
    details: string;
  }>;
  performanceMetrics: {
    bidsPerMinute: number;
    successfulBids: number;
    totalSpent: number;
    topPurchase: string;
  };
}

interface NotificationSystemProps {
  userId: string;
  tournamentId?: string;
}

const NotificationSystem = ({ userId, tournamentId }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'player_joined',
      title: 'New Player Joined!',
      message: 'Alex Kumar joined your tournament "IPL 2024 Championship"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'auction_starting',
      title: 'Auction Starting Soon!',
      message: 'Your auction starts in 10 minutes. Get ready!',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You earned "Tournament Creator" - 100 bonus credits awarded!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      priority: 'medium'
    }
  ]);

  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalTournaments: 5,
    totalBids: 23,
    averageBidAmount: 25000,
    winRate: 60,
    favoritePosition: 'Batsman',
    recentActivity: [
      {
        action: 'Won Tournament',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: 'IPL Fantasy League'
      },
      {
        action: 'Placed Bid',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        details: '₹45,000 for Virat Kohli'
      },
      {
        action: 'Joined Tournament',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        details: 'BBL Championship'
      }
    ],
    performanceMetrics: {
      bidsPerMinute: 2.3,
      successfulBids: 15,
      totalSpent: 575000,
      topPurchase: 'MS Dhoni (₹65,000)'
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'bid_placed',
          title: 'New Bid Alert!',
          message: 'Someone bid on Rohit Sharma - ₹35,000',
          timestamp: new Date(),
          read: false,
          priority: 'medium'
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep last 10
        
        toast.success('New bid placed!', {
          icon: '⚡',
          duration: 3000
        });
      }
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'player_joined': return Users;
      case 'auction_starting': return Clock;
      case 'bid_placed': return Zap;
      case 'tournament_won': return Trophy;
      case 'achievement': return Target;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.slice(0, 5).map((notification) => {
            const IconComponent = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-all ${
                  notification.read 
                    ? 'bg-muted/20 border-border' 
                    : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-primary/10">
                    <IconComponent className={`h-4 w-4 ${getPriorityColor(notification.priority)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-medium ${
                        notification.read ? 'text-muted-foreground' : 'text-foreground'
                      }`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-auto p-1"
                        onClick={() => markAsRead(notification.id)}
                      >
                        ✓
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-auto p-1"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          {notifications.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{analytics.totalTournaments}</div>
              <div className="text-xs text-muted-foreground">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{analytics.totalBids}</div>
              <div className="text-xs text-muted-foreground">Total Bids</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{analytics.winRate}%</div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">₹{analytics.averageBidAmount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Avg Bid</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Bidding Performance</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Bids per minute:</span>
                  <span className="font-medium">{analytics.performanceMetrics.bidsPerMinute}</span>
                </div>
                <div className="flex justify-between">
                  <span>Successful bids:</span>
                  <span className="font-medium">{analytics.performanceMetrics.successfulBids}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total spent:</span>
                  <span className="font-medium">₹{analytics.performanceMetrics.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Top purchase:</span>
                  <span className="font-medium">{analytics.performanceMetrics.topPurchase}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {analytics.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Activity className="h-3 w-3 text-muted-foreground" />
                      <span>{activity.action}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">{activity.details}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSystem;