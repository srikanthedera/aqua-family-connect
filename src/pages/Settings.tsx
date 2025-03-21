
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { SettingsIcon, BellIcon, Smartphone, LogOutIcon, CloudIcon } from "lucide-react";

const Settings = () => {
  const handleSavePCB = () => {
    toast.success("PCB settings updated successfully");
  };

  const handleResetPCB = () => {
    toast.info("PCB settings reset to default values");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated");
  };

  const handleLogout = () => {
    toast.info("Logged out successfully");
    // In a real app, you would handle logout logic here
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and device preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Device Settings */}
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">Device Settings</CardTitle>
              </div>
              <CardDescription>
                Configure your PCB water filter device
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Device ID</Label>
                <Input value="WF-92A47C3E" readOnly className="bg-muted/50" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Connection Type</Label>
                <Select defaultValue="bluetooth">
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bluetooth">Bluetooth</SelectItem>
                    <SelectItem value="wifi">WiFi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sensor Sensitivity</Label>
                <Slider defaultValue={[75]} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Auto-Calibration</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" onClick={handleResetPCB}>Reset to Default</Button>
              <Button onClick={handleSavePCB}>Save Changes</Button>
            </CardFooter>
          </Card>
          
          {/* Notification Settings */}
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <BellIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">Notification Settings</CardTitle>
              </div>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Daily Hydration Reminders</Label>
                  <p className="text-xs text-muted-foreground">Receive reminders to stay hydrated</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Water Quality Alerts</Label>
                  <p className="text-xs text-muted-foreground">Get alerts about water quality issues</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Filter Replacement Notifications</Label>
                  <p className="text-xs text-muted-foreground">Be notified when filter needs replacing</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Health Report Analysis</Label>
                  <p className="text-xs text-muted-foreground">Notifications when reports are analyzed</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button onClick={handleSaveNotifications} className="w-full">Save Preferences</Button>
            </CardFooter>
          </Card>
          
          {/* Account Settings */}
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
              </div>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium">Email</Label>
                <Input value="user@example.com" readOnly className="bg-muted/50" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">First Name</Label>
                  <Input defaultValue="John" />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Last Name</Label>
                  <Input defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium">Password</Label>
                <Input type="password" value="********" readOnly className="bg-muted/50" />
              </div>
              
              <Button variant="outline" className="w-full">Change Password</Button>
            </CardContent>
          </Card>
          
          {/* Storage Settings */}
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <CloudIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">Storage Settings</CardTitle>
              </div>
              <CardDescription>
                Manage local storage for health reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Store Reports Locally Only</Label>
                  <p className="text-xs text-muted-foreground">Health reports will not be uploaded to cloud</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="pt-2 pb-2 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Local Storage Used</span>
                  <span className="font-medium">48.2 MB</span>
                </div>
                <div className="w-full h-2 bg-muted rounded overflow-hidden">
                  <div className="bg-primary h-full w-1/3" />
                </div>
                <div className="text-xs text-muted-foreground">
                  48.2 MB / 150 MB
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Clear Cached Data</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="destructive" 
            className="w-full md:w-auto"
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
