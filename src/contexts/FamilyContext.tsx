
import React, { createContext, useContext, useState, useEffect } from "react";

export interface FamilyMember {
  id: string;
  nickname: string;
  age: number;
  phValue: number;
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
    if (storedMembers) {
      setFamilyMembers(JSON.parse(storedMembers));
    }
  }, []);

  // Save to local storage whenever familyMembers changes
  useEffect(() => {
    localStorage.setItem("familyMembers", JSON.stringify(familyMembers));
  }, [familyMembers]);

  const addFamilyMember = (member: Omit<FamilyMember, "id">) => {
    const newMember = {
      ...member,
      id: Math.random().toString(36).substring(2, 9),
      dateAdded: new Date().toISOString(),
      consumption: {
        today: 0,
        week: 0,
        month: 0
      }
    };
    
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const updateFamilyMember = (id: string, data: Partial<FamilyMember>) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, ...data } : member
      )
    );
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
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
