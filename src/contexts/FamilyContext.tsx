
import React, { createContext, useContext, useState, useEffect } from "react";

export interface FamilyMember {
  id: string;
  nickname: string;
  age: number;
  phValue: number;
  avatar?: string; // Added avatar property as optional
  consumption?: {
    today: number;
    week: number;
    month: number;
  };
  dateAdded?: string;
}

interface FamilyContextType {
  familyMembers: FamilyMember[];
  setFamilyMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  addFamilyMember: (member: Omit<FamilyMember, "id">) => void;
  updateFamilyMember: (id: string, data: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  // Load family members from local storage on initial render
  useEffect(() => {
    const storedMembers = localStorage.getItem("familyMembers");
    const storedFamilyProfile = localStorage.getItem("familyProfile");
    
    if (storedMembers) {
      console.log("Loading family members from localStorage (familyMembers)");
      setFamilyMembers(JSON.parse(storedMembers));
    } else if (storedFamilyProfile) {
      // If no familyMembers in localStorage but we have a familyProfile, use that
      try {
        console.log("Loading family members from localStorage (familyProfile)");
        const familyProfile = JSON.parse(storedFamilyProfile);
        
        if (familyProfile.members && Array.isArray(familyProfile.members)) {
          // Transform the members to ensure they have IDs and consumption data
          const formattedMembers = familyProfile.members.map((member: any) => ({
            id: member.id || Math.random().toString(36).substring(2, 9),
            nickname: member.nickname,
            age: member.age,
            phValue: member.phValue,
            dateAdded: member.dateAdded || new Date().toISOString(),
            consumption: member.consumption || {
              today: 0,
              week: 0,
              month: 0
            }
          }));
          
          setFamilyMembers(formattedMembers);
          // Also save to familyMembers in localStorage for future consistency
          localStorage.setItem("familyMembers", JSON.stringify(formattedMembers));
        }
      } catch (error) {
        console.error("Error parsing family profile:", error);
      }
    }
  }, []);

  // Save to local storage whenever familyMembers changes
  useEffect(() => {
    if (familyMembers.length > 0) {
      localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
    }
  }, [familyMembers]);

  const addFamilyMember = (member: Omit<FamilyMember, "id">) => {
    const newMember = {
      ...member,
      id: Math.random().toString(36).substring(2, 9),
      dateAdded: new Date().toISOString(),
      consumption: member.consumption || {
        today: 0,
        week: 0,
        month: 0
      }
    };
    
    setFamilyMembers(prev => [...prev, newMember]);
    
    // TODO: Sync new family member with PCB board through PCBService
    console.log("New family member added, should sync with PCB:", newMember);
  };

  const updateFamilyMember = (id: string, data: Partial<FamilyMember>) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...data } : member
      )
    );
    
    // TODO: Sync updated family member with PCB board through PCBService
    console.log(`Family member ${id} updated, should sync with PCB:`, data);
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
    
    // TODO: Sync deletion with PCB board through PCBService
    console.log(`Family member ${id} deleted, should sync with PCB`);
  };

  return (
    <FamilyContext.Provider 
      value={{ 
        familyMembers, 
        setFamilyMembers, 
        addFamilyMember, 
        updateFamilyMember, 
        deleteFamilyMember 
      }}
    >
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamily = () => {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error("useFamily must be used within a FamilyProvider");
  }
  return context;
};
