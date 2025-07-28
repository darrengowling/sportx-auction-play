import { Sport } from "@/types/sports";

export const sports: Sport[] = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "🏏",
    color: "hsl(142, 76%, 50%)",
    gradient: "linear-gradient(135deg, hsl(142, 76%, 50%), hsl(142, 76%, 60%))",
    description: "International cricket leagues and tournaments"
  },
  {
    id: "nfl", 
    name: "NFL",
    icon: "🏈",
    color: "hsl(30, 100%, 60%)",
    gradient: "linear-gradient(135deg, hsl(30, 100%, 60%), hsl(30, 100%, 70%))",
    description: "National Football League fantasy auctions"
  },
  {
    id: "nba",
    name: "NBA", 
    icon: "🏀",
    color: "hsl(210, 100%, 60%)",
    gradient: "linear-gradient(135deg, hsl(210, 100%, 60%), hsl(210, 100%, 70%))",
    description: "National Basketball Association drafts"
  },
  {
    id: "rugby",
    name: "Rugby",
    icon: "🏉",
    color: "hsl(270, 95%, 65%)",
    gradient: "linear-gradient(135deg, hsl(270, 95%, 65%), hsl(270, 95%, 75%))",
    description: "Rugby union and league competitions"
  },
  {
    id: "tennis",
    name: "Tennis",
    icon: "🎾",
    color: "hsl(45, 93%, 58%)",
    gradient: "linear-gradient(135deg, hsl(45, 93%, 58%), hsl(45, 93%, 68%))",
    description: "Grand slam and ATP tour events"
  },
  {
    id: "golf",
    name: "Golf",
    icon: "⛳",
    color: "hsl(142, 76%, 50%)",
    gradient: "linear-gradient(135deg, hsl(142, 76%, 50%), hsl(120, 76%, 60%))",
    description: "PGA and major championship tournaments"
  }
];