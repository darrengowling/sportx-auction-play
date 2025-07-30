import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Users, 
  Crown, 
  Zap, 
  Trophy,
  Clock,
  Smile
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'system' | 'bid';
  isAdmin?: boolean;
}

interface TournamentChatProps {
  tournamentId: string;
  currentUser: {
    id: string;
    name: string;
    isAdmin?: boolean;
  };
  participants: Array<{
    id: string;
    name: string;
    isAdmin?: boolean;
  }>;
  isAuctionLive?: boolean;
}

const TournamentChat = ({ 
  tournamentId, 
  currentUser, 
  participants, 
  isAuctionLive = false 
}: TournamentChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    // Sample messages
    {
      id: '1',
      userId: 'system',
      userName: 'System',
      message: 'Tournament created! Welcome everyone! 🏏',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      type: 'system'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Alex Kumar',
      message: 'Excited for this auction! Who are we targeting first?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      type: 'message'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Sarah Smith',
      message: 'I\'m going for Kohli and Bumrah for sure!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: 'message'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState<string[]>([]);

  // Quick message templates
  const quickMessages = [
    "Good luck everyone! 🍀",
    "Great pick! 👏",
    "My budget is tight now 😅",
    "Let's go! 🔥",
    "Nice strategy! 🎯"
  ];

  const sendMessage = (messageText?: string) => {
    const text = messageText || newMessage.trim();
    if (!text) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      message: text,
      timestamp: new Date(),
      type: 'message',
      isAdmin: currentUser.isAdmin
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const sendBidNotification = (playerName: string, amount: number, bidderName: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'system',
      userName: 'System',
      message: `${bidderName} bid ₹${amount.toLocaleString()} for ${playerName}`,
      timestamp: new Date(),
      type: 'bid'
    };
    setMessages(prev => [...prev, message]);
  };

  // Simulate real-time updates in auction
  useEffect(() => {
    if (isAuctionLive) {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance per interval
          const bidders = participants.filter(p => p.id !== currentUser.id);
          const randomBidder = bidders[Math.floor(Math.random() * bidders.length)];
          const players = ['Virat Kohli', 'MS Dhoni', 'Rohit Sharma', 'Jasprit Bumrah'];
          const randomPlayer = players[Math.floor(Math.random() * players.length)];
          const randomAmount = Math.floor(Math.random() * 50000) + 10000;
          
          if (randomBidder) {
            sendBidNotification(randomPlayer, randomAmount, randomBidder.name);
          }
        }
      }, 15000); // Every 15 seconds

      return () => clearInterval(interval);
    }
  }, [isAuctionLive, participants, currentUser.id]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageStyle = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'bid':
        return 'bg-warning/10 border-warning/20 text-warning';
      default:
        return 'bg-background border-border';
    }
  };

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageCircle className="h-4 w-4" />
          Tournament Chat
          {isAuctionLive && (
            <Badge variant="secondary" className="text-xs animate-pulse">
              🔴 Live Auction
            </Badge>
          )}
          <Badge variant="outline" className="text-xs ml-auto">
            <Users className="h-3 w-3 mr-1" />
            {participants.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3 pt-0">
        {/* Messages */}
        <ScrollArea className="flex-1 mb-3">
          <div className="space-y-3">
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                {message.type === 'system' || message.type === 'bid' ? (
                  <div className={`p-2 rounded-lg text-xs text-center ${getMessageStyle(message.type)}`}>
                    {message.type === 'bid' && <Zap className="inline h-3 w-3 mr-1" />}
                    {message.message}
                    <div className="text-xs opacity-70 mt-1">
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {message.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-medium truncate">
                          {message.userName}
                        </span>
                        {message.isAdmin && (
                          <Crown className="h-3 w-3 text-warning" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-xs">
                        {message.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Messages (only during auction) */}
        {isAuctionLive && (
          <div className="flex gap-1 mb-2 overflow-x-auto">
            {quickMessages.slice(0, 3).map((msg, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="text-xs whitespace-nowrap"
                onClick={() => sendMessage(msg)}
              >
                {msg}
              </Button>
            ))}
          </div>
        )}

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            placeholder={isAuctionLive ? "Quick message..." : "Type a message..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="text-sm"
          />
          <Button 
            size="sm" 
            onClick={() => sendMessage()}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Typing Indicator */}
        {isTyping.length > 0 && (
          <div className="text-xs text-muted-foreground mt-1">
            {isTyping.join(', ')} {isTyping.length === 1 ? 'is' : 'are'} typing...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TournamentChat;