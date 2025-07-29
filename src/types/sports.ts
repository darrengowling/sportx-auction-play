export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
}

export interface Player {
  id: string;
  name: string;
  sport: string;
  position: string;
  rating: number;
  price: number;
  image: string;
  stats: Record<string, number>;
}

export interface SquadComposition {
  batsmen: number;
  bowlers: number;
  allRounders: number;
  wicketKeepers: number;
}

export interface TournamentParticipant {
  id: string;
  name: string;
  userId?: string;
  isAdmin?: boolean;
  inviteStatus?: 'pending' | 'accepted' | 'declined';
  currentBudget?: number;
  totalScore?: number;
  budget: number;
  squad: Player[];
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  description?: string;
  realLifeTournament: string; // e.g., "IPL 2024", "Test Series vs Australia"
  admin: string; // Tournament admin/creator
  participants: TournamentParticipant[];
  maxParticipants: number;
  status: 'draft' | 'setup' | 'auction_scheduled' | 'auction_live' | 'active' | 'completed';
  budget: number; // Budget per participant
  squadComposition: SquadComposition;
  auctionDate?: Date;
  auctionDuration: number; // in hours
  createdAt: Date;
  inviteCode?: string;
}

export interface AuctionBid {
  id: string;
  playerId: string;
  userId: string;
  amount: number;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  credits: number;
  leaguesWon: number;
  totalSpent: number;
}