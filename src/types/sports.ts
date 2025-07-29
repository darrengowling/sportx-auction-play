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

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  realLifeTournament: string; // e.g., "IPL 2024", "Test Series vs Australia"
  admin: string; // Tournament admin/creator
  participants: TournamentParticipant[];
  maxParticipants: number;
  status: 'draft' | 'auction_scheduled' | 'auction_live' | 'active' | 'completed';
  budget: number; // Budget per participant
  squadRules: SquadRules;
  auctionDate?: Date;
  auctionDuration: number; // Minutes per player auction
  createdAt: Date;
}

export interface TournamentParticipant {
  id: string;
  userId: string;
  name: string;
  isAdmin: boolean;
  inviteStatus: 'pending' | 'accepted' | 'declined';
  currentBudget: number;
  squad: Player[];
  totalScore: number;
}

export interface SquadRules {
  totalPlayers: number;
  batsmen: { min: number; max: number };
  bowlers: { min: number; max: number };
  allRounders: { min: number; max: number };
  wicketKeepers: { min: number; max: number };
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