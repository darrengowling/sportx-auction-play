import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const AuctionCardSkeleton = () => (
  <Card className="p-4">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24 mb-1" />
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
    
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
    
    <Skeleton className="h-8 w-full" />
  </Card>
);

export const PageLoadingSkeleton = () => (
  <div className="min-h-screen pb-20 md:pt-20">
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4 text-center">
            <Skeleton className="h-6 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <AuctionCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export const EmptyState = ({ 
  icon, 
  title, 
  description, 
  action 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) => (
  <div className="text-center py-12">
    <div className="text-muted-foreground mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">
      {description}
    </p>
    {action && action}
  </div>
);