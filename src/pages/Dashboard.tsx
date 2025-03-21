
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import FamilyMembersList from "@/components/dashboard/FamilyMembersList";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropletIcon, TrendingUpIcon, CalendarIcon, DropletMeasureIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium mb-2">Welcome back</h1>
          <p className="text-muted-foreground">
            Monitor your family's hydration and wellness
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="shadow-md border-none animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Consumption Today</CardTitle>
              <DropletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.7L</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUpIcon className="h-3 w-3 inline mr-1" />
                <span className="text-green-500 font-medium">12%</span> from yesterday
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none animate-slide-up delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">38.4L</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUpIcon className="h-3 w-3 inline mr-1" />
                <span className="text-green-500 font-medium">5%</span> from last week
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none animate-slide-up delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Active User</CardTitle>
              <DropletIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Dad</div>
              <p className="text-xs text-muted-foreground mt-1">
                2.2L consumed today
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-none animate-slide-up delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filter Status</CardTitle>
              <DropletMeasureIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">Excellent</div>
              <p className="text-xs text-muted-foreground mt-1">
                79% filter life remaining
              </p>
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
