
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DropletIcon } from "lucide-react";

interface FamilyMember {
  id: number;
  nickname: string;
  age: number;
  phValue: number;
  avatar?: string;
  consumption?: {
    today: number;
    week: number;
    month: number;
  };
}

// Sample data - in a real app, this would come from your API
const familyMembers: FamilyMember[] = [
  { 
    id: 1, 
    nickname: "Mom", 
    age: 42, 
    phValue: 8.2,
    consumption: {
      today: 1.8,
      week: 12.2,
      month: 48.5
    }
  },
  { 
    id: 2, 
    nickname: "Dad", 
    age: 45, 
    phValue: 7.8,
    consumption: {
      today: 2.2,
      week: 14.5,
      month: 52.3
    }
  },
  { 
    id: 3, 
    nickname: "Emma", 
    age: 12, 
    phValue: 7.2,
    consumption: {
      today: 1.2,
      week: 8.1,
      month: 32.5
    }
  },
  { 
    id: 4, 
    nickname: "Jake", 
    age: 8, 
    phValue: 7.0,
    consumption: {
      today: 0.9,
      week: 6.5,
      month: 24.3
    }
  }
];

interface FamilyMembersListProps {
  onSelectMember?: (member: FamilyMember) => void;
  showConsumption?: boolean;
}

const FamilyMembersList: React.FC<FamilyMembersListProps> = ({
  onSelectMember,
  showConsumption = true
}) => {
  const handleTap = (member: FamilyMember) => {
    if (onSelectMember) {
      onSelectMember(member);
    } else {
      // Simulating a tap on the water filter display
      toast.success(`Recording water dispensed for ${member.nickname}`, {
        description: `pH level: ${member.phValue}`
      });
    }
  };

  // Function to get a color based on pH value
  const getPhColor = (phValue: number) => {
    if (phValue < 7.0) return "text-purple-500";
    if (phValue === 7.0) return "text-green-500";
    if (phValue <= 8.0) return "text-blue-500";
    return "text-teal-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {familyMembers.map((member) => (
        <Card 
          key={member.id} 
          className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
          style={{ animationDelay: `${member.id * 100}ms` }}
        >
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full h-full p-6 flex flex-col items-center justify-center space-y-3 rounded-none hover:bg-primary/5"
              onClick={() => handleTap(member)}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                {member.avatar ? (
                  <img 
                    src={member.avatar} 
                    alt={member.nickname}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="text-xl font-semibold text-primary">
                    {member.nickname.charAt(0)}
                  </div>
                )}
                <div 
                  className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getPhColor(member.phValue)} bg-white border border-border shadow-sm`}
                >
                  <DropletIcon className="h-3 w-3" />
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-medium text-lg">{member.nickname}</h3>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <span>{member.age} years</span>
                  <span>•</span>
                  <span className={getPhColor(member.phValue)}>
                    pH {member.phValue}
                  </span>
                </div>
                
                {showConsumption && member.consumption && (
                  <div className="mt-3 text-sm">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="font-medium">{member.consumption.today}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Week</p>
                        <p className="font-medium">{member.consumption.week}L</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Month</p>
                        <p className="font-medium">{member.consumption.month}L</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FamilyMembersList;
