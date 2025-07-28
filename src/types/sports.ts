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

export interface League {
  id: string;
  name: string;
  sport: string;
  creator: string;
  members: number;
  maxMembers: number;
  status: 'draft' | 'active' | 'completed';
  budget: number;
  auctionDate?: Date;
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