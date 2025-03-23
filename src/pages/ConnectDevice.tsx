
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WifiIcon, SmartphoneIcon, CheckIcon, XIcon, RefreshCwIcon, SendIcon, TrendingUpIcon } from "lucide-react";
import PCBService from "@/services/PCBService";
import { useFamily } from "@/contexts/FamilyContext";

const ConnectDevice = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { familyMembers } = useFamily();

  useEffect(() => {
    // Check initial connection status
    setIsConnected(PCBService.isConnected());
    
    // Add connection status listener
    const removeListener = PCBService.addConnectionListener((connected) => {
      setIsConnected(connected);
    });
    
    // Clean up listener on unmount
    return () => {
      removeListener();
    };
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await PCBService.connect();
    } catch (error) {
      console.error("Error connecting to device:", error);
      toast.error("Failed to connect to water filter");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await PCBService.disconnect();
    } catch (error) {
      console.error("Error disconnecting from device:", error);
      toast.error("Failed to disconnect from water filter");
    }
  };

  const handleSyncProfiles = async () => {
    if (familyMembers.length === 0) {
      toast.error("No family members to sync");
      return;
    }
    
    setIsSyncing(true);
    try {
      await PCBService.syncFamilyProfiles(familyMembers);
    } catch (error) {
      console.error("Error syncing profiles:", error);
      toast.error("Failed to sync family profiles");
    } finally {
      setIsSyncing(false);
    }
  };

  // TODO: In a real app, this information would come from the PCB device
  const deviceInfo = {
    firmwareVersion: "v2.1.3",
    serialNumber: "WF4872-X2",
    lastMaintenance: "2023-08-15",
    filterHealth: 87, // percentage
    connectionsCount: 3,
    uptime: "6 days, 4 hours"
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-medium mb-2">Connect Device</h1>
          <p className="text-muted-foreground">
            Connect and manage your smart water filter
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Device Connection</CardTitle>
              <CardDescription>
                Connect your app to the water filter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-full ${isConnected ? 'bg-green-100' : 'bg-muted'} flex items-center justify-center`}>
                    {isConnected ? (
                      <CheckIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <WifiIcon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{isConnected ? 'Connected' : 'Not Connected'}</p>
                    <p className="text-sm text-muted-foreground">
                      {isConnected ? 'Water filter is online and ready' : 'Connect to your water filter'}
                    </p>
                  </div>
                </div>
                <div>
                  {isConnected ? (
                    <Button 
                      variant="outline" 
                      onClick={handleDisconnect}
                      className="space-x-2"
                    >
                      <XIcon className="h-4 w-4" />
                      <span>Disconnect</span>
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className="space-x-2"
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCwIcon className="h-4 w-4 animate-spin" />
                          <span>Connecting...</span>
                        </>
                      ) : (
                        <>
                          <WifiIcon className="h-4 w-4" />
                          <span>Connect</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
              
              {isConnected && (
                <div className="rounded-md bg-muted/50 p-4">
                  <h3 className="text-sm font-medium mb-3">Device Information</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div className="text-muted-foreground">Firmware Version</div>
                    <div className="font-medium">{deviceInfo.firmwareVersion}</div>
                    
                    <div className="text-muted-foreground">Serial Number</div>
                    <div className="font-medium">{deviceInfo.serialNumber}</div>
                    
                    <div className="text-muted-foreground">Last Maintenance</div>
                    <div className="font-medium">{deviceInfo.lastMaintenance}</div>
                    
                    <div className="text-muted-foreground">Filter Health</div>
                    <div className="font-medium">{deviceInfo.filterHealth}%</div>
                    
                    <div className="text-muted-foreground">Connections</div>
                    <div className="font-medium">{deviceInfo.connectionsCount}</div>
                    
                    <div className="text-muted-foreground">Uptime</div>
                    <div className="font-medium">{deviceInfo.uptime}</div>
                  </div>
                </div>
              )}
            </CardContent>
            {isConnected && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full space-x-2"
                  onClick={handleSyncProfiles}
                  disabled={isSyncing || familyMembers.length === 0}
                >
                  {isSyncing ? (
                    <>
                      <RefreshCwIcon className="h-4 w-4 animate-spin" />
                      <span>Syncing Family Profiles...</span>
                    </>
                  ) : (
                    <>
                      <SendIcon className="h-4 w-4" />
                      <span>Sync Family Profiles</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Connection Guide</CardTitle>
              <CardDescription>
                How to connect your water filter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Power on your water filter</p>
                    <p className="text-sm text-muted-foreground">
                      Ensure your smart water filter is plugged in and powered on
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Put device in pairing mode</p>
                    <p className="text-sm text-muted-foreground">
                      Press and hold the Bluetooth button on your filter for 5 seconds until it blinks blue
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Connect in this app</p>
                    <p className="text-sm text-muted-foreground">
                      Click the Connect button above and wait for the connection to establish
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary">4</span>
                  </div>
                  <div>
                    <p className="font-medium">Sync your family profiles</p>
                    <p className="text-sm text-muted-foreground">
                      After connecting, sync your family profiles to personalize water for each member
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium mb-3">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're having trouble connecting your device, try these steps:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  <li>Ensure Bluetooth is enabled on your phone</li>
                  <li>Restart your water filter device</li>
                  <li>Make sure you're within 30 feet of the device</li>
                  <li>Check if firmware updates are available</li>
                </ul>
              </div>
            </CardContent>
            {isConnected && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full space-x-2"
                  onClick={() => {
                    // TODO: In a real app, this would fetch and show real diagnostics data
                    toast.info("Running diagnostics...");
                    setTimeout(() => {
                      toast.success("Diagnostics complete", {
                        description: "All systems are working normally"
                      });
                    }, 2000);
                  }}
                >
                  <TrendingUpIcon className="h-4 w-4 mr-2" />
                  Run Diagnostics
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ConnectDevice;
