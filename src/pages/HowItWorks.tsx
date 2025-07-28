import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { 
  Users, 
  Trophy, 
  DollarSign, 
  Play, 
  UserPlus, 
  Settings, 
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  Zap
} from "lucide-react";

const HowItWorks = () => {
  const [, navigate] = useLocation();

  const steps = [
    {
      id: 1,
      icon: <Users className="h-8 w-8" />,
      title: "Join or Create a League",
      description: "Start by joining an existing cricket league or create your own with friends",
      details: [
        "Browse available cricket leagues",
        "Set league budget and member limits", 
        "Invite friends via link or username",
        "Choose auction date and settings"
      ],
      action: "Browse Leagues",
      path: "/leagues"
    },
    {
      id: 2,
      icon: <UserPlus className="h-8 w-8" />,
      title: "Invite Friends & Set Budget",
      description: "Build your league community and establish auction rules",
      details: [
        "Send invite links to friends",
        "Set individual budgets (e.g., $1M credits)",
        "Configure auction duration",
        "Set minimum bid increments"
      ],
      action: "Create League",
      path: "/leagues"
    },
    {
      id: 3,
      icon: <Trophy className="h-8 w-8" />,
      title: "Live Cricket Auction",
      description: "Participate in real-time bidding for your favorite cricket stars",
      details: [
        "Real-time bidding on cricket players",
        "See live bid updates from all participants",
        "Strategic budget management",
        "Build your dream cricket team"
      ],
      action: "View Auctions", 
      path: "/auctions"
    },
    {
      id: 4,
      icon: <Target className="h-8 w-8" />,
      title: "Compete & Track Performance",
      description: "Your players' real-world performance determines your league ranking",
      details: [
        "Player stats update automatically",
        "Points based on runs, wickets, catches",
        "Weekly/monthly league standings",
        "Win prizes and bragging rights"
      ],
      action: "View Profile",
      path: "/profile"
    }
  ];

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-warning" />,
      title: "Real-time Bidding",
      description: "Live auctions with instant bid updates"
    },
    {
      icon: <Award className="h-6 w-6 text-success" />,
      title: "Skill-Based Gaming",
      description: "No gambling - pure strategy and cricket knowledge"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Social Competition",
      description: "Play with friends and family in private leagues"
    },
    {
      icon: <Trophy className="h-6 w-6 text-secondary" />,
      title: "Leaderboards",
      description: "Climb rankings and earn achievements"
    }
  ];

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-hero bg-clip-text text-transparent">
              How Sport X Cricket Works
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From creating leagues to winning competitions - your complete guide to cricket fantasy auctions
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center gradient-card">
              <div className="flex justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get Started in 4 Simple Steps</h2>
            <p className="text-muted-foreground">
              Follow this guide to join your first cricket auction league
            </p>
          </div>

          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-primary to-transparent z-0" />
              )}
              
              <Card className="relative z-10 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-white mb-4">
                        {step.icon}
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        Step {step.id}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4 text-lg">
                        {step.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        onClick={() => navigate(step.path)}
                        className="touch-target"
                      >
                        {step.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Game Flow Example */}
        <Card className="p-8 mb-16 gradient-auction">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Example Game Flow</h2>
            <p className="text-muted-foreground">
              See how a typical cricket auction unfolds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border border-border bg-card/50">
              <Clock className="h-8 w-8 mx-auto mb-3 text-warning" />
              <h3 className="font-semibold mb-2">Pre-Auction</h3>
              <p className="text-sm text-muted-foreground">
                League created, friends invited, budgets set at $1M each. 8 participants ready to bid.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-border bg-card/50">
              <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Live Auction</h3>
              <p className="text-sm text-muted-foreground">
                Virat Kohli up for auction! Bidding starts at $500K. Real-time bids from all participants.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-border bg-card/50">
              <Award className="h-8 w-8 mx-auto mb-3 text-success" />
              <h3 className="font-semibold mb-2">Competition</h3>
              <p className="text-sm text-muted-foreground">
                Teams complete, points tracking begins. Your players' real performance determines your ranking.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Is this gambling?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No! Sport X Cricket is skill-based gaming with virtual credits. No real money is involved.
              </p>
              
              <h3 className="font-semibold mb-2">How do points work?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Players earn points based on real cricket performance: runs, wickets, catches, and more.
              </p>
              
              <h3 className="font-semibold mb-2">Can I play with friends?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Create private leagues and invite friends for maximum fun and competition.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">What's the minimum league size?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Leagues can have 4-16 participants. Smaller leagues mean more player choices per person.
              </p>
              
              <h3 className="font-semibold mb-2">How long do auctions take?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Typically 30-60 minutes depending on league size and player pool.
              </p>
              
              <h3 className="font-semibold mb-2">When do competitions start?</h3>
              <p className="text-sm text-muted-foreground">
                Immediately after your auction ends! Points tracking begins with the next cricket matches.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of cricket fans in the ultimate fantasy auction experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="touch-target"
              onClick={() => navigate("/leagues")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Browse Leagues
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="touch-target"
              onClick={() => navigate("/auctions")}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Live Auctions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;