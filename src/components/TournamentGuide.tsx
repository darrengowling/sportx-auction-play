import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  HelpCircle, 
  Zap, 
  Users, 
  Trophy, 
  Clock, 
  DollarSign, 
  Target, 
  TrendingUp,
  MessageCircle,
  Share2
} from "lucide-react";

interface TournamentGuideProps {
  variant?: 'compact' | 'detailed';
  showQuickActions?: boolean;
  onQuickAction?: (action: string) => void;
}

const quickTips = [
  {
    icon: Zap,
    title: "Quick Start",
    tip: "Use 'Quick Test Tournament' for instant 5-player setup",
    action: "create-quick"
  },
  {
    icon: Users,
    title: "Invite Friends",
    tip: "Share invite codes via WhatsApp or copy-paste",
    action: "share-code"
  },
  {
    icon: DollarSign,
    title: "Smart Bidding",
    tip: "Use Quick Bid buttons for fast, competitive bidding",
    action: "bid-tips"
  },
  {
    icon: Trophy,
    title: "Winning Strategy",
    tip: "Balance star players with consistent performers",
    action: "strategy-guide"
  }
];

const biddingStrategies = [
  "🎯 Set player priorities before auction starts",
  "💰 Don't spend more than 30% budget on one player",
  "⚡ Use Quick Bid for popular players (acts fast)",
  "🔄 Keep some budget for surprise opportunities",
  "📊 Check recent performance stats before bidding"
];

const tournamentFlow = [
  { step: "Create", desc: "Set tournament rules & budget", time: "2 min" },
  { step: "Invite", desc: "Share code with 4-9 friends", time: "5 min" },
  { step: "Auction", desc: "Live bidding for players", time: "30-60 min" },
  { step: "Compete", desc: "Track real cricket performance", time: "Ongoing" }
];

const TournamentGuide = ({ 
  variant = 'compact', 
  showQuickActions = true,
  onQuickAction 
}: TournamentGuideProps) => {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  if (variant === 'compact') {
    return (
      <TooltipProvider>
        <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/10 rounded-lg">
          <div className="flex items-center gap-2 flex-1">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">New to Sport X?</span>
          </div>
          <div className="flex gap-1">
            {quickTips.slice(0, 2).map((tip) => (
              <Tooltip key={tip.action}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onQuickAction?.(tip.action)}
                  >
                    <tip.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{tip.tip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-warning" />
            Quick Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickTips.map((tip) => (
              <div
                key={tip.action}
                className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => setExpandedTip(expandedTip === tip.action ? null : tip.action)}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <tip.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{tip.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{tip.tip}</div>
                  {showQuickActions && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary hover:text-primary mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickAction?.(tip.action);
                      }}
                    >
                      Try it →
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tournament Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-success" />
            How It Works (Simple 4-Step Flow)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tournamentFlow.map((item, index) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.step}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  ~{item.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bidding Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-secondary" />
            Winning Bidding Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {biddingStrategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className="text-muted-foreground mt-0.5">•</div>
                <span>{strategy}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              Pro Tip: Communication wins tournaments!
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Coordinate with friends before auction to avoid bidding wars
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentGuide;