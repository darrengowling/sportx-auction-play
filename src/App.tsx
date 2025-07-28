import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import toast, { Toaster as HotToaster } from 'react-hot-toast';
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import Auctions from "@/pages/Auctions";
import Leagues from "@/pages/Leagues";
import HowItWorks from "@/pages/HowItWorks";
import Profile from "@/pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/auctions" component={Auctions} />
          <Route path="/leagues" component={Leagues} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/profile" component={Profile} />
          <Route path="/settings" component={() => <div className="min-h-screen pt-20 pb-20 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
          <Route path="/sport/:sportId" component={() => <div className="min-h-screen pt-20 pb-20 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Sport Details</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
          <Route path="/auction/:playerId" component={() => <div className="min-h-screen pt-20 pb-20 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">Auction Room</h1><p className="text-muted-foreground">Live bidding coming soon...</p></div></div>} />
          <Route path="/league/:leagueId" component={() => <div className="min-h-screen pt-20 pb-20 flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold mb-4">League Details</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Toaster />
      <HotToaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
