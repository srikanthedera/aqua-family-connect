
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConsumptionChart from "@/components/dashboard/ConsumptionChart";
import FamilyMembersList from "@/components/dashboard/FamilyMembersList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropletIcon } from "lucide-react";

// Sample data - in a real app, this would come from your API
const trendData = [
  { date: "Jan 1", waterQuality: 95, averagePh: 7.4 },
  { date: "Jan 8", waterQuality: 96, averagePh: 7.5 },
  { date: "Jan 15", waterQuality: 94, averagePh: 7.3 },
  { date: "Jan 22", waterQuality: 97, averagePh: 7.6 },
  { date: "Jan 29", waterQuality: 95, averagePh: 7.4 },
  { date: "Feb 5", waterQuality: 93, averagePh: 7.2 },
  { date: "Feb 12", waterQuality: 94, averagePh: 7.3 },
  { date: "Feb 19", waterQuality: 96, averagePh: 7.5 },
  { date: "Feb 26", waterQuality: 97, averagePh: 7.6 },
  { date: "Mar 5", waterQuality: 98, averagePh: 7.7 },
];

// Sample recommendation data
const recommendations = [
  {
    id: 1,
    title: "Increase morning hydration",
    description: "The data shows that your family drinks less water in the mornings. Try to drink a glass of water right after waking up.",
    impact: "This can boost metabolism and improve energy levels for the day ahead."
  },
  {
    id: 2,
    title: "Adjust pH for Emma",
    description: "Emma's current pH setting (7.2) could be slightly increased based on her recent health report.",
    impact: "A more alkaline pH of 7.5 may help with her vitamin absorption based on trends in her health data."
  },
  {
    id: 3,
    title: "Monitor Jake's hydration",
    description: "Jake is consistently drinking less than the recommended amount for his age.",
    impact: "Consider setting hydration reminders or creating a fun water drinking game to encourage consumption."
  }
];

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
              {entry.name}: {entry.value}{entry.name === "Average pH" ? "" : "%"}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const Hydration = () => {
  const [timeRange, setTimeRange] = useState("3months");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium mb-2">Hydration Insights</h1>
          <p className="text-muted-foreground">
            Track water consumption and get personalized recommendations
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Select Family Member</h2>
          <FamilyMembersList />
        </div>
        
        <div>
          <ConsumptionChart />
        </div>
        
        <div>
          <Card className="shadow-lg border-none animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">Water Quality Trends</CardTitle>
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" domain={[6.5, 9.5]} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="waterQuality"
                    name="Water Quality"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="averagePh"
                    name="Average pH"
                    stroke="#7dd3fc"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <Card 
                key={rec.id} 
                className="shadow-md border-none animate-slide-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <DropletIcon className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-base font-medium">{rec.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm mb-3">{rec.description}</p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Impact:</strong> {rec.impact}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hydration;
