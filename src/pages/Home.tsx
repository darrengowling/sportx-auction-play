import { Button } from "@/components/ui/button";
import SportCard from "@/components/SportCard";
import { sports } from "@/data/sports";
import { Sport } from "@/types/sports";
import { TrendingUp, Trophy, Users } from "lucide-react";
import { useLocation } from "wouter";
import toast from 'react-hot-toast';

// Force rebuild to clear featuredAuctions cache

const Home = () => {
  const [, navigate] = useLocation();
  
  const handleSportSelect = (sport: Sport) => {
    navigate(`/sport/${sport.id}`);
  };


  return (
    <div className="min-h-screen pb-20 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center md:min-h-0">
        <div className="container mx-auto px-4 py-8 md:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-hero bg-clip-text text-transparent">
                Sport X Cricket
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Cricket gaming with friends
            </p>
            <div className="inline-block bg-success/20 text-success px-4 py-2 rounded-full text-sm font-medium mb-8">
              No gambling. All game.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg" 
                className="touch-target"
                onClick={() => {
                  toast.success("Welcome to Sport X Cricket! 🏏");
                  navigate("/auctions");
                }}
              >
                <Trophy className="mr-2 h-5 w-5" />
                Start Bidding
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="touch-target"
                onClick={() => {
                  toast.success("Finding leagues for you! 🎯");
                  navigate("/leagues");
                }}
              >
                <Users className="mr-2 h-5 w-5" />
                Join League
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Over Luck Section */}
      <section className="py-12 md:py-16 min-h-screen flex items-center md:min-h-0">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategy Over Luck</h2>
            <p className="text-lg text-muted-foreground mb-8">Where skill beats chance</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use knowledge and tactics to outperform opponents. Victory based on smarts, not chance.
            </p>
          </div>
        </div>
      </section>

      {/* The Arena Section */}
      <section className="py-12 md:py-16 min-h-screen flex items-center md:min-h-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The arena where instinct meets insight</h2>
            <p className="text-lg text-muted-foreground">
              Where fans don't just spectate—they strategize, socialize, and stake their claim.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto md:grid-cols-3 md:gap-8 md:max-w-4xl">
            <div className="text-center p-8 rounded-lg border border-border bg-card/50">
              <div className="text-warning text-3xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2 text-lg">Real-time tournaments</h3>
              <p className="text-muted-foreground">Live bidding and instant results</p>
            </div>
            <div className="text-center p-8 rounded-lg border border-border bg-card/50">
              <div className="text-success text-3xl mb-4">🏆</div>
              <h3 className="font-semibold mb-2 text-lg">Build dream teams</h3>
              <p className="text-muted-foreground">Auction top cricket stars</p>
            </div>
            <div className="text-center p-8 rounded-lg border border-border bg-card/50">
              <div className="text-primary text-3xl mb-4">📈</div>
              <h3 className="font-semibold mb-2 text-lg">Climb leaderboards</h3>
              <p className="text-muted-foreground">Compete with friends</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-8 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-success">47</div>
              <div className="text-sm text-muted-foreground">Live Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-warning">1.2K</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">156</div>
              <div className="text-sm text-muted-foreground">Active Leagues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Prize Pool</div>
            </div>
          </div>
        </div>
      </section>


      {/* Cricket Focus */}
      <section className="py-12 md:py-16 min-h-screen flex items-center md:min-h-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Cricket Leagues</h2>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground mb-8">
              <TrendingUp className="h-4 w-4" />
              <span>IPL • BBL • CPL</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto md:grid-cols-2 lg:grid-cols-3 md:max-w-none">
            {sports.map((sport) => (
              <SportCard
                key={sport.id}
                sport={sport}
                onSelect={handleSportSelect}
                activeAuctions={Math.floor(Math.random() * 15) + 3}
                upcomingAuctions={Math.floor(Math.random() * 10) + 2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 min-h-screen flex items-center md:min-h-0">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Own the moment. Outbid the ordinary.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              No bets. No chance. Just you, the game, and bragging rights.
            </p>
            <div className="flex flex-col gap-4 justify-center">
              <Button 
                variant="hero" 
                size="lg"
                className="touch-target w-full sm:w-auto"
                onClick={() => {
                  toast.success("Account creation coming soon! For now, explore as guest 🚀");
                }}
              >
                Create Account
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="touch-target w-full sm:w-auto"
                onClick={() => {
                  toast.success("Learn how it works first! 📚");
                  navigate("/how-it-works");
                }}
              >
                How it Works
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;