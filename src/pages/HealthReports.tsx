
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthReportUploader from "@/components/health/HealthReportUploader";
import HealthReportSummary from "@/components/health/HealthReportSummary";
import { HealthReportData } from "@/types/health";
import { useFamily } from "@/contexts/FamilyContext";

// TODO: This sample health report data should be fetched from a backend service
// TODO: Implement AI analysis to generate health report data from uploaded reports
// Sample health report data - in a real app, this would come from your backend
const healthReports: Record<string, HealthReportData> = {
  "1": {
    lastUpdated: "May 15, 2023",
    positiveIndicators: [
      {
        name: "Vitamin D",
        value: "38 ng/mL",
        referenceRange: "30-50 ng/mL",
        status: "normal",
        change: "increased",
        changeAmount: "6 ng/mL"
      },
      {
        name: "HDL Cholesterol",
        value: "62 mg/dL",
        referenceRange: ">40 mg/dL",
        status: "normal",
        change: "increased",
        changeAmount: "4 mg/dL"
      }
    ],
    concerningIndicators: [
      {
        name: "Triglycerides",
        value: "180 mg/dL",
        referenceRange: "<150 mg/dL",
        status: "high",
        change: "decreased",
        changeAmount: "15 mg/dL"
      }
    ]
  },
  "2": {
    lastUpdated: "June 2, 2023",
    positiveIndicators: [
      {
        name: "Blood Pressure",
        value: "120/80 mmHg",
        referenceRange: "<130/80 mmHg",
        status: "normal",
        change: "decreased",
        changeAmount: "10/5 mmHg"
      }
    ],
    concerningIndicators: [
      {
        name: "LDL Cholesterol",
        value: "145 mg/dL",
        referenceRange: "<100 mg/dL",
        status: "high",
        change: "increased",
        changeAmount: "12 mg/dL"
      },
      {
        name: "Glucose",
        value: "115 mg/dL",
        referenceRange: "70-99 mg/dL",
        status: "high",
        change: "unchanged",
        changeAmount: "0 mg/dL"
      }
    ]
  }
};

const HealthReports = () => {
  const { familyMembers, syncFamilyProfileData } = useFamily();
  const [activeTab, setActiveTab] = useState(familyMembers.length > 0 ? familyMembers[0].id : "");

  // Force sync with familyProfile storage on component mount
  useEffect(() => {
    syncFamilyProfileData();
    
    // Set the active tab to the first family member if available
    if (familyMembers.length > 0 && !activeTab) {
      setActiveTab(familyMembers[0].id);
    }
  }, [syncFamilyProfileData, familyMembers, activeTab]);

  // TODO: Implement AI analysis function to process health report PDFs
  // TODO: This should connect to an AI service that can extract and analyze health data
  const analyzeHealthReport = (pdfFile: File, memberId: string) => {
    console.log(`Analyzing health report for member ${memberId}`, pdfFile);
    // In a real implementation, this would send the PDF to an AI service
    // and return structured data about the health indicators
  };

  // TODO: Implement function to compare two health reports
  // TODO: This should connect to an AI service that can compare reports and highlight changes
  const compareHealthReports = (oldReportId: string, newReportId: string, memberId: string) => {
    console.log(`Comparing reports ${oldReportId} and ${newReportId} for member ${memberId}`);
    // In a real implementation, this would retrieve both reports and use AI
    // to generate a comparison highlighting improvements and concerns
  };

  // If no family members, show message
  if (familyMembers.length === 0) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium mb-2">Health Reports</h1>
            <p className="text-muted-foreground">
              Upload and view health reports for your family members
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No family members found</p>
            <p className="text-sm text-muted-foreground">
              Add family members in the Family Profile section to upload and analyze health reports
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">Health Reports</h1>
          <p className="text-muted-foreground">
            Upload and view health reports for your family members
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${familyMembers.length}, 1fr)` }}>
            {familyMembers.map((member) => (
              <TabsTrigger 
                key={member.id} 
                value={member.id}
                className="text-sm"
              >
                {member.nickname}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {familyMembers.map((member) => (
            <TabsContent key={member.id} value={member.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HealthReportUploader 
                  familyMemberId={parseInt(member.id)} 
                  memberName={member.nickname} 
                />
                
                {/* For demo purposes, only show historical reports for members with IDs 1 or 2 */}
                {(member.id === "1" || member.id === "2") && healthReports[member.id] ? (
                  <HealthReportSummary 
                    memberId={parseInt(member.id)}
                    memberName={member.nickname}
                    lastUpdated={healthReports[member.id].lastUpdated}
                    positiveIndicators={healthReports[member.id].positiveIndicators}
                    concerningIndicators={healthReports[member.id].concerningIndicators}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      No previous health reports found. Upload a report to see analysis.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HealthReports;
