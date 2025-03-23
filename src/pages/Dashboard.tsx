
import React, { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import FamilyMembersList from "@/components/dashboard/FamilyMembersList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Droplets, Users, FileText, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFamily } from "@/contexts/FamilyContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { syncFamilyProfileData } = useFamily();
  
  // Force sync with familyProfile storage on component mount
  useEffect(() => {
    syncFamilyProfileData();
  }, [syncFamilyProfileData]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your Water Wellness dashboard
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card 
            className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 shadow-md border-none animate-fade-in"
            onClick={() => navigate("/hydration")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                <Droplets className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-medium text-lg text-center mb-1">Hydration</h3>
              <p className="text-sm text-center text-muted-foreground">Track water consumption</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 shadow-md border-none animate-fade-in"
            onClick={() => navigate("/family-profile")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-medium text-lg text-center mb-1">Family</h3>
              <p className="text-sm text-center text-muted-foreground">Manage profiles</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 shadow-md border-none animate-fade-in"
            onClick={() => navigate("/health-reports")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="font-medium text-lg text-center mb-1">Health</h3>
              <p className="text-sm text-center text-muted-foreground">Upload health reports</p>
            </CardContent>
          </Card>
          
          <Card 
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 shadow-md border-none animate-fade-in"
            onClick={() => navigate("/connect-device")}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                <Smartphone className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-medium text-lg text-center mb-1">Device</h3>
              <p className="text-sm text-center text-muted-foreground">Manage your filter</p>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Family Members</h2>
          <FamilyMembersList />
        </div>
        
        <div>
          <ConsumptionChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
