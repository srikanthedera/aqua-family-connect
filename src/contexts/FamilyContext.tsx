
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface FamilyMember {
  id: string;
  nickname: string;
  age: number;
  phValue: number;
  avatar?: string;
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
  syncFamilyProfileData: () => void; // Function to force sync between storages
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export const FamilyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Function to synchronize data between familyProfile and familyMembers storages
  // Using useCallback to prevent unnecessary re-renders
  const syncFamilyProfileData = useCallback(() => {
    if (isInitialized) return; // Only run on first load or when explicitly called
    
    console.log("Syncing family profile data...");
    
    const storedMembers = localStorage.getItem("familyMembers");
    const storedFamilyProfile = localStorage.getItem("familyProfile");
    
    if (storedFamilyProfile) {
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
          console.log("Family members synced from familyProfile:", formattedMembers);
        }
      } catch (error) {
        console.error("Error parsing family profile:", error);
      }
    } else if (storedMembers) {
      console.log("Loading family members from localStorage (familyMembers)");
      setFamilyMembers(JSON.parse(storedMembers));
    }
    
    setIsInitialized(true);
  }, [isInitialized]);

  // Load family members from local storage only once on initial render
  useEffect(() => {
    syncFamilyProfileData();
  }, [syncFamilyProfileData]);

  // Save to local storage whenever familyMembers changes
  // But avoid excessive updates to localStorage
  useEffect(() => {
    if (!isInitialized) return; // Skip the initial render
    
    if (familyMembers.length > 0) {
      localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
      console.log("Family members saved to localStorage:", familyMembers);
      
      // Check if familyProfile exists, if so update its members too
      const storedFamilyProfile = localStorage.getItem("familyProfile");
      if (storedFamilyProfile) {
        try {
          const familyProfile = JSON.parse(storedFamilyProfile);
          familyProfile.members = familyMembers;
          localStorage.setItem("familyProfile", JSON.stringify(familyProfile));
          console.log("Family profile members updated");
        } catch (error) {
          console.error("Error updating family profile members:", error);
        }
      }
    }
  }, [familyMembers, isInitialized]);

  const addFamilyMember = useCallback((member: Omit<FamilyMember, "id">) => {
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
  }, []);

  const updateFamilyMember = useCallback((id: string, data: Partial<FamilyMember>) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...data } : member
      )
    );
    
    // TODO: Sync updated family member with PCB board through PCBService
    console.log(`Family member ${id} updated, should sync with PCB:`, data);
  }, []);

  const deleteFamilyMember = useCallback((id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
    
    // TODO: Sync deletion with PCB board through PCBService
    console.log(`Family member ${id} deleted, should sync with PCB`);
  }, []);

  const memoizedValue = React.useMemo(() => ({
    familyMembers, 
    setFamilyMembers, 
    addFamilyMember, 
    updateFamilyMember, 
    deleteFamilyMember,
    syncFamilyProfileData
  }), [familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember, syncFamilyProfileData]);

  return (
    <FamilyContext.Provider value={memoizedValue}>
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
