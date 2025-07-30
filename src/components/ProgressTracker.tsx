import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Clock, Users, Zap } from "lucide-react";

interface ProgressTrackerProps {
  currentStep: 'create' | 'invite' | 'auction' | 'compete';
  tournamentData?: {
    participantCount: number;
    maxParticipants: number;
    auctionStarted: boolean;
  };
}

const progressSteps = [
  {
    id: 'create',
    title: 'Create Tournament',
    icon: Circle,
    description: 'Set up your tournament'
  },
  {
    id: 'invite',
    title: 'Invite Players',
    icon: Users,
    description: 'Share invite code with friends'
  },
  {
    id: 'auction',
    title: 'Live Auction',
    icon: Zap,
    description: 'Bid for your dream team'
  },
  {
    id: 'compete',
    title: 'Compete & Win',
    icon: CheckCircle,
    description: 'Track performance and win'
  }
];

const ProgressTracker = ({ currentStep, tournamentData }: ProgressTrackerProps) => {
  const getCurrentStepIndex = () => {
    return progressSteps.findIndex(step => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepIcon = (step: typeof progressSteps[0], status: string) => {
    if (status === 'completed') return CheckCircle;
    if (status === 'current') return Clock;
    return step.icon;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between">
        {progressSteps.map((step, index) => {
          const status = getStepStatus(index);
          const IconComponent = getStepIcon(step, status);
          const isLast = index === progressSteps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2
                  ${status === 'completed' ? 'bg-success border-success text-success-foreground' :
                    status === 'current' ? 'bg-primary border-primary text-primary-foreground animate-pulse' :
                    'bg-muted border-muted-foreground/20 text-muted-foreground'}
                `}>
                  <IconComponent className="h-5 w-5" />
                </div>
                
                <div className="text-center">
                  <div className={`text-sm font-medium mb-1 ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed' ? 'text-success' : 
                    'text-muted-foreground'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">
                    {step.description}
                  </div>
                  
                  {/* Additional status info */}
                  {step.id === 'invite' && tournamentData && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {tournamentData.participantCount}/{tournamentData.maxParticipants} joined
                    </Badge>
                  )}
                  
                  {step.id === 'auction' && tournamentData?.auctionStarted && status === 'current' && (
                    <Badge variant="default" className="mt-1 text-xs animate-pulse">
                      🔴 Live Now
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Progress Line */}
              {!isLast && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  status === 'completed' ? 'bg-success' : 'bg-muted'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;