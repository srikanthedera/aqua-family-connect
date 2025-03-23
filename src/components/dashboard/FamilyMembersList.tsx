
import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DropletIcon, UserX } from "lucide-react";
import { useFamily, FamilyMember } from "@/contexts/FamilyContext";
import { useNavigate } from "react-router-dom";

interface FamilyMembersListProps {
  onSelectMember?: (member: FamilyMember) => void;
  showConsumption?: boolean;
  showActions?: boolean;
}

// Memoize the family member card to prevent unnecessary re-renders
const FamilyMemberCard = memo(({ 
  member, 
  onTap, 
  showConsumption 
}: { 
  member: FamilyMember;
  onTap: (member: FamilyMember) => void;
  showConsumption?: boolean;
}) => {
  // Function to get a color based on pH value
  const getPhColor = (phValue: number) => {
    if (phValue < 7.0) return "text-purple-500";
    if (phValue === 7.0) return "text-green-500";
    if (phValue <= 8.0) return "text-blue-500";
    return "text-teal-500";
  };

  return (
    <Card 
      key={member.id} 
      className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300 animate-slide-up"
    >
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="w-full h-full p-6 flex flex-col items-center justify-center space-y-3 rounded-none hover:bg-primary/5"
          onClick={() => onTap(member)}
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
  );
});

FamilyMemberCard.displayName = "FamilyMemberCard";

const FamilyMembersList: React.FC<FamilyMembersListProps> = memo(({
  onSelectMember,
  showConsumption = true,
  showActions = false
}) => {
  const { familyMembers } = useFamily();
  const navigate = useNavigate();

  // TODO: This function needs to be updated to send data to the PCB when a family member's water is dispensed
  // TODO: Implement realtime update when water is dispensed by connecting to PCBService
  const handleTap = React.useCallback((member: FamilyMember) => {
    if (onSelectMember) {
      onSelectMember(member);
    } else {
      // Simulating a tap on the water filter display
      toast.success(`Recording water dispensed for ${member.nickname}`, {
        description: `pH level: ${member.phValue}`
      });
      
      // TODO: Send this data to the PCB through PCBService
      console.log(`Water dispensed for ${member.nickname} with pH ${member.phValue}`);
    }
  }, [onSelectMember]);

  // Navigate to family profile if no members
  if (familyMembers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No family members added yet</p>
        <Button onClick={() => navigate("/family-profile")}>
          Add Family Members
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {familyMembers.map((member) => (
        <FamilyMemberCard 
          key={member.id}
          member={member}
          onTap={handleTap}
          showConsumption={showConsumption}
        />
      ))}
    </div>
  );
});

FamilyMembersList.displayName = "FamilyMembersList";

export default FamilyMembersList;
