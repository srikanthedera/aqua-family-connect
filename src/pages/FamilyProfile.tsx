
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UserIcon,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditMemberDialog from "@/components/profile/EditMemberDialog";
import { useFamily, FamilyMember } from "@/contexts/FamilyContext";

const FamilyProfile = () => {
  const navigate = useNavigate();
  const { familyMembers, updateFamilyMember, deleteFamilyMember, syncFamilyProfileData } = useFamily();
  const [familyName, setFamilyName] = useState<string>("My");
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<FamilyMember | null>(null);
  
  useEffect(() => {
    // Force sync with familyProfile storage on component mount
    syncFamilyProfileData();
    
    // Load family name from localStorage
    const storedFamilyProfile = localStorage.getItem('familyProfile');
    if (storedFamilyProfile) {
      try {
        const parsedProfile = JSON.parse(storedFamilyProfile);
        setFamilyName(parsedProfile.familyName || "My");
      } catch (error) {
        console.error("Error parsing family profile:", error);
      }
    }
  }, [syncFamilyProfileData]);

  const handleEditMember = (member: FamilyMember) => {
    setMemberToEdit(member);
  };

  const handleSaveMember = (updatedMember: FamilyMember) => {
    updateFamilyMember(updatedMember.id, updatedMember);
    setMemberToEdit(null);
    toast.success(`${updatedMember.nickname}'s profile updated`);
  };

  const handleDeleteMember = (id: string) => {
    setMemberToDelete(id);
  };

  const confirmDeleteMember = () => {
    if (!memberToDelete) return;
    
    const memberToRemove = familyMembers.find(m => m.id === memberToDelete);
    
    if (familyMembers.length <= 1) {
      toast.error("Cannot delete the last family member");
      setMemberToDelete(null);
      return;
    }
    
    deleteFamilyMember(memberToDelete);
    setMemberToDelete(null);
    
    toast.success(`${memberToRemove?.nickname || 'Member'} removed from family profile`);
  };

  const handleAddMember = () => {
    if (familyMembers.length >= 6) {
      toast.error("Maximum 6 family members allowed");
      return;
    }
    
    navigate("/create-family-profile");
  };

  const getPhColor = (phValue: number) => {
    if (phValue < 7.0) return "text-purple-500";
    if (phValue === 7.0) return "text-green-500";
    if (phValue <= 8.0) return "text-blue-500";
    return "text-teal-500";
  };

  if (familyMembers.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">No Family Profile Found</h2>
          <p className="text-muted-foreground mb-6">Let's create a family profile to get started</p>
          <Button onClick={() => navigate("/create-family-profile")}>Create Family Profile</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium mb-2">{familyName} Family Profile</h1>
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
              style={{ animationDelay: `${parseInt(member.id.slice(-2), 16) * 50}ms` }}
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
                        Added on {new Date(member.dateAdded || "").toLocaleDateString()}
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
                        onClick={() => handleEditMember(member)}
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
            onClick={() => {
              toast.info("Syncing data with PCB board");
              // TODO: Implement sync with PCB board through PCBService.syncFamilyMembers()
            }}
          >
            Sync with Water Filter
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!memberToDelete} onOpenChange={(open) => !open && setMemberToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this family member from your profile. You can add them again later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteMember} className="bg-destructive text-destructive-foreground">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Edit Member Dialog */}
      {memberToEdit && (
        <EditMemberDialog 
          member={memberToEdit} 
          open={!!memberToEdit} 
          onOpenChange={(open) => !open && setMemberToEdit(null)}
          onSave={handleSaveMember}
        />
      )}
    </DashboardLayout>
  );
};

export default FamilyProfile;
