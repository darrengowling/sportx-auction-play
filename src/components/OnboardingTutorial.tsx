import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Trophy, Users, Zap, Play, X } from "lucide-react";

interface OnboardingTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Sport X Cricket!",
    icon: Trophy,
    description: "Ready to compete with friends in live cricket auctions? Let's get you started in 3 simple steps.",
    action: "Start with a Quick Test Tournament",
    benefit: "Perfect for trying with 5 friends"
  },
  {
    title: "Create or Join Tournaments",
    icon: Users,
    description: "Create your own tournament or join one using an invite code. Set your budget, squad rules, and invite friends.",
    action: "Use the Quick Test button for instant setup",
    benefit: "Pre-configured for 5 players, 30-min auction"
  },
  {
    title: "Live Auction Experience",
    icon: Zap,
    description: "Bid on players in real-time! Use Quick Bid buttons for fast bidding. Build your dream cricket team strategically.",
    action: "Timer-based bidding keeps it exciting",
    benefit: "Real cricket stats determine winners"
  }
];

const OnboardingTutorial = ({ open, onOpenChange, onComplete }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onOpenChange(false);
    setCurrentStep(0);
  };

  const handleSkip = () => {
    onOpenChange(false);
    setCurrentStep(0);
  };

  const step = tutorialSteps[currentStep];
  const IconComponent = step.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <IconComponent className="h-5 w-5 text-primary" />
              Quick Start Guide
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="text-center space-y-4">
            <div className="p-4 rounded-lg bg-primary/10">
              <IconComponent className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="space-y-2">
              <Badge variant="secondary" className="px-3 py-1">
                💡 {step.action}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {step.benefit}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>

            <div className="text-sm text-muted-foreground">
              {currentStep + 1} of {tutorialSteps.length}
            </div>

            <Button onClick={nextStep}>
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <Play className="mr-1 h-4 w-4" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {currentStep === 0 && (
            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                Skip tutorial - I know how this works
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;