
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Sample data - in a real app, this would come from your API
const dailyData = [
  { name: "12 AM", Mom: 0.1, Dad: 0.0, Emma: 0.0, Jake: 0.0 },
  { name: "6 AM", Mom: 0.3, Dad: 0.4, Emma: 0.2, Jake: 0.1 },
  { name: "12 PM", Mom: 0.6, Dad: 0.8, Emma: 0.4, Jake: 0.3 },
  { name: "6 PM", Mom: 0.5, Dad: 0.6, Emma: 0.4, Jake: 0.3 },
  { name: "11 PM", Mom: 0.3, Dad: 0.4, Emma: 0.2, Jake: 0.2 },
];

const weeklyData = [
  { name: "Mon", Mom: 1.8, Dad: 2.1, Emma: 1.3, Jake: 0.9 },
  { name: "Tue", Mom: 1.7, Dad: 2.0, Emma: 1.2, Jake: 0.8 },
  { name: "Wed", Mom: 1.9, Dad: 2.2, Emma: 1.1, Jake: 1.0 },
  { name: "Thu", Mom: 1.8, Dad: 2.3, Emma: 1.2, Jake: 0.9 },
  { name: "Fri", Mom: 1.6, Dad: 2.0, Emma: 1.0, Jake: 0.8 },
  { name: "Sat", Mom: 1.9, Dad: 2.4, Emma: 1.5, Jake: 1.1 },
  { name: "Sun", Mom: 1.5, Dad: 1.5, Emma: 0.8, Jake: 1.0 },
];

const monthlyData = [
  { name: "Week 1", Mom: 12.2, Dad: 14.5, Emma: 8.1, Jake: 6.5 },
  { name: "Week 2", Mom: 11.8, Dad: 13.9, Emma: 7.8, Jake: 6.2 },
  { name: "Week 3", Mom: 12.5, Dad: 14.3, Emma: 8.3, Jake: 6.0 },
  { name: "Week 4", Mom: 12.0, Dad: 13.6, Emma: 8.3, Jake: 5.6 },
];

const ConsumptionChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
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
  };

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
                <Bar dataKey="Mom" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Dad" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Emma" fill="#7dd3fc" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Jake" fill="#bae6fd" radius={[4, 4, 0, 0]} barSize={20} />
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
                <Bar dataKey="Mom" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Dad" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Emma" fill="#7dd3fc" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Jake" fill="#bae6fd" radius={[4, 4, 0, 0]} barSize={20} />
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
                <Bar dataKey="Mom" fill="#38bdf8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Dad" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Emma" fill="#7dd3fc" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Jake" fill="#bae6fd" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;
