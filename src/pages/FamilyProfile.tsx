
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon, PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import { toast } from "sonner";

interface FamilyMember {
  id: number;
  nickname: string;
  age: number;
  phValue: number;
  dateAdded: string;
}

// Sample data - in a real app, this would come from your API
const familyMembers: FamilyMember[] = [
  { id: 1, nickname: "Mom", age: 42, phValue: 8.2, dateAdded: "Jan 15, 2023" },
  { id: 2, nickname: "Dad", age: 45, phValue: 7.8, dateAdded: "Jan 15, 2023" },
  { id: 3, nickname: "Emma", age: 12, phValue: 7.2, dateAdded: "Jan 15, 2023" },
  { id: 4, nickname: "Jake", age: 8, phValue: 7.0, dateAdded: "Jan 15, 2023" },
];

const FamilyProfile = () => {
  const handleEditMember = (id: number) => {
    toast.info(`Editing member with ID: ${id}`);
  };

  const handleDeleteMember = (id: number) => {
    toast.info(`Deleting member with ID: ${id}`);
  };

  const handleAddMember = () => {
    toast.info("Adding new family member");
  };

  const getPhColor = (phValue: number) => {
    if (phValue < 7.0) return "text-purple-500";
    if (phValue === 7.0) return "text-green-500";
    if (phValue <= 8.0) return "text-blue-500";
    return "text-teal-500";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium mb-2">Family Profile</h1>
            <p className="text-muted-foreground">
              Manage your family members and their water preferences
            </p>
          </div>
          <Button 
            onClick={handleAddMember}
            className="rounded-xl"
            disabled={familyMembers.length >= 6}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {familyMembers.map((member) => (
            <Card 
              key={member.id} 
              className="shadow-md border-none overflow-hidden animate-slide-up"
              style={{ animationDelay: `${member.id * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6">
                  <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{member.nickname}</h3>
                      <p className="text-sm text-muted-foreground">
                        Added on {member.dateAdded}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="text-base font-medium">{member.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">pH Preference</p>
                      <p className={`text-base font-medium ${getPhColor(member.phValue)}`}>
                        {member.phValue}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-center justify-start md:justify-end space-x-2 mt-4 md:mt-0">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-9 px-3"
                        onClick={() => handleEditMember(member.id)}
                      >
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-9 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => toast.info("Syncing data with PCB board")}
          >
            Sync with Water Filter
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FamilyProfile;
