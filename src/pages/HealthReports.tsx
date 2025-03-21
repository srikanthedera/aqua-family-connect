
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HealthReportUploader from "@/components/health/HealthReportUploader";
import HealthReportSummary from "@/components/health/HealthReportSummary";
import { HealthReportData } from "@/types/health";

// Sample data - in a real app, this would come from your API
const familyMembers = [
  { id: 1, name: "Mom" },
  { id: 2, name: "Dad" },
  { id: 3, name: "Emma" },
  { id: 4, name: "Jake" },
];

// Sample health report data
const healthReports: Record<number, HealthReportData> = {
  1: {
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
  2: {
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
  },
  3: {
    lastUpdated: "April 10, 2023",
    positiveIndicators: [
      {
        name: "Hemoglobin",
        value: "14.2 g/dL",
        referenceRange: "12-15.5 g/dL",
        status: "normal",
        change: "unchanged",
        changeAmount: "0 g/dL"
      },
      {
        name: "Iron",
        value: "95 mcg/dL",
        referenceRange: "60-170 mcg/dL",
        status: "normal",
        change: "increased",
        changeAmount: "15 mcg/dL"
      }
    ],
    concerningIndicators: []
  },
  4: {
    lastUpdated: "March 25, 2023",
    positiveIndicators: [
      {
        name: "Vitamin B12",
        value: "650 pg/mL",
        referenceRange: "200-900 pg/mL",
        status: "normal",
        change: "increased",
        changeAmount: "120 pg/mL"
      }
    ],
    concerningIndicators: [
      {
        name: "Vitamin A",
        value: "0.25 mg/L",
        referenceRange: "0.3-0.7 mg/L",
        status: "low",
        change: "decreased",
        changeAmount: "0.05 mg/L"
      }
    ]
  }
};

const HealthReports = () => {
  const [activeTab, setActiveTab] = useState(familyMembers[0].id.toString());

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
          <TabsList className="grid grid-cols-4 mb-8">
            {familyMembers.map((member) => (
              <TabsTrigger 
                key={member.id} 
                value={member.id.toString()}
                className="text-sm"
              >
                {member.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {familyMembers.map((member) => (
            <TabsContent key={member.id} value={member.id.toString()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HealthReportUploader 
                  familyMemberId={member.id} 
                  memberName={member.name} 
                />
                
                <HealthReportSummary 
                  memberId={member.id}
                  memberName={member.name}
                  lastUpdated={healthReports[member.id].lastUpdated}
                  positiveIndicators={healthReports[member.id].positiveIndicators}
                  concerningIndicators={healthReports[member.id].concerningIndicators}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default HealthReports;
