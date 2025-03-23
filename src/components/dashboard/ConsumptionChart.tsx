
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFamily } from "@/contexts/FamilyContext";

// Memoized tooltip component to prevent re-renders
const CustomTooltip = React.memo(({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="frost p-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <p className="text-sm">
              {entry.name}: {entry.value}L
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = "CustomTooltip";

const ConsumptionChart = () => {
  const { familyMembers } = useFamily();
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  // Generate chart data only when family members change
  useEffect(() => {
    if (familyMembers.length === 0) return;

    // Generate daily data
    const daily = [
      { name: "12 AM" },
      { name: "6 AM" },
      { name: "12 PM" },
      { name: "6 PM" },
      { name: "11 PM" },
    ];

    // Generate weekly data
    const weekly = [
      { name: "Mon" },
      { name: "Tue" },
      { name: "Wed" },
      { name: "Thu" },
      { name: "Fri" },
      { name: "Sat" },
      { name: "Sun" },
    ];

    // Generate monthly data
    const monthly = [
      { name: "Week 1" },
      { name: "Week 2" },
      { name: "Week 3" },
      { name: "Week 4" },
    ];

    // Populate with family member data - use the same random seed for consistent data
    const randomSeed = JSON.stringify(familyMembers.map(m => m.id));
    const getRandom = (base: number, variance: number, index: number) => {
      // Create deterministic random value based on member id and index
      const seed = familyMembers.length * index;
      return base + (variance * ((seed % 10) / 10));
    };

    // Populate with family member data
    familyMembers.forEach((member, memberIndex) => {
      // Create consistent data for visualization
      daily.forEach((item, index) => {
        if (item.name === "12 AM") item[member.nickname] = 0.1;
        else if (item.name === "6 AM") item[member.nickname] = 0.2 + getRandom(0.1, 0.1, index + memberIndex);
        else if (item.name === "12 PM") item[member.nickname] = 0.4 + getRandom(0.3, 0.1, index + memberIndex);
        else if (item.name === "6 PM") item[member.nickname] = 0.3 + getRandom(0.2, 0.1, index + memberIndex);
        else if (item.name === "11 PM") item[member.nickname] = 0.2 + getRandom(0.1, 0.1, index + memberIndex);
      });

      weekly.forEach((item, index) => {
        item[member.nickname] = 0.8 + getRandom(1.0, 0.5, index + memberIndex);
      });

      monthly.forEach((item, index) => {
        item[member.nickname] = 5 + getRandom(5.0, 3.0, index + memberIndex);
      });
    });

    setDailyData(daily);
    setWeeklyData(weekly);
    setMonthlyData(monthly);
  }, [familyMembers]);

  // Memoize colors to ensure they're stable
  const memberColors = useMemo(() => {
    // Generate colors based on index
    const colors = ["#38bdf8", "#0ea5e9", "#7dd3fc", "#bae6fd", "#0284c7", "#0369a1"];
    
    return familyMembers.map((_, index) => colors[index % colors.length]);
  }, [familyMembers]);

  // If no family members, show a placeholder
  if (familyMembers.length === 0 || dailyData.length === 0) {
    return (
      <Card className="shadow-lg border-none animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Water Consumption</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">
            Add family members to view consumption data
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-none animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Water Consumption</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}L`} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {familyMembers.map((member, index) => (
                  <Bar 
                    key={member.id}
                    dataKey={member.nickname} 
                    fill={memberColors[index]} 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="weekly" className="pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}L`} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {familyMembers.map((member, index) => (
                  <Bar 
                    key={member.id}
                    dataKey={member.nickname} 
                    fill={memberColors[index]} 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="monthly" className="pt-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}L`} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                {familyMembers.map((member, index) => (
                  <Bar 
                    key={member.id}
                    dataKey={member.nickname} 
                    fill={memberColors[index]} 
                    radius={[4, 4, 0, 0]} 
                    barSize={20} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default React.memo(ConsumptionChart);
