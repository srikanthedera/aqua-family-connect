
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellIcon, DeviceIcon, UserIcon, ShieldIcon, LogOutIcon } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    waterConsumption: true,
    healthReports: true,
    filterMaintenance: true,
  });
  
  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully");
  };
  
  const handleSaveDevice = () => {
    toast.success("Device settings saved successfully");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully");
  };
  
  const handleSavePrivacy = () => {
    toast.success("Privacy settings saved successfully");
  };
  
  const handleLogout = () => {
    toast.info("Logging out...");
    // In a real app, this would handle the logout logic
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, device, and app preferences
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="profile" className="flex items-center">
              <UserIcon className="h-4 w-4 mr-2" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="device" className="flex items-center">
              <DeviceIcon className="h-4 w-4 mr-2" />
              <span>Device</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <BellIcon className="h-4 w-4 mr-2" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center">
              <ShieldIcon className="h-4 w-4 mr-2" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="animate-fade-in">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="device" className="animate-fade-in">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Device Settings</CardTitle>
                <CardDescription>
                  Configure your Water Filter device
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="device-name">Device Name</Label>
                  <Input id="device-name" defaultValue="Kitchen Filter" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="connection-type">Connection Type</Label>
                  <Select defaultValue="wifi">
                    <SelectTrigger id="connection-type">
                      <SelectValue placeholder="Select connection type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wifi">Wi-Fi</SelectItem>
                      <SelectItem value="bluetooth">Bluetooth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="filter-maintenance">Filter Replacement Reminder</Label>
                  <Select defaultValue="1month">
                    <SelectTrigger id="filter-maintenance">
                      <SelectValue placeholder="Select reminder frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2weeks">2 Weeks Before</SelectItem>
                      <SelectItem value="1month">1 Month Before</SelectItem>
                      <SelectItem value="2months">2 Months Before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveDevice}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="animate-fade-in">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control which notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="water-consumption">Water Consumption</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about family water consumption
                    </p>
                  </div>
                  <Switch
                    id="water-consumption"
                    checked={notifications.waterConsumption}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, waterConsumption: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="health-reports">Health Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new health report analysis is available
                    </p>
                  </div>
                  <Switch
                    id="health-reports"
                    checked={notifications.healthReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, healthReports: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="filter-maintenance">Filter Maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about filter status and maintenance
                    </p>
                  </div>
                  <Switch
                    id="filter-maintenance"
                    checked={notifications.filterMaintenance}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, filterMaintenance: checked })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="animate-fade-in">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve the app
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label>Health Report Storage</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Your health reports are stored locally on your device and are never uploaded to our servers.
                    Only the AI analysis results are saved to your account.
                  </p>
                  <Button variant="outline" className="w-full">
                    Clear Local Health Reports
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Account Data</Label>
                  <Button variant="outline" className="w-full">
                    Export My Data
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSavePrivacy}>
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
            onClick={handleLogout}
          >
            <LogOutIcon className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
