
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Bluetooth, Wifi, RefreshCw, CheckCircle, Smartphone } from "lucide-react";
import PCBService from "@/services/PCBService";
import { useFamily } from "@/contexts/FamilyContext";

const ConnectDevice = () => {
  const navigate = useNavigate();
  const { familyMembers } = useFamily();
  const [connectionMethod, setConnectionMethod] = useState<"bluetooth" | "wifi" | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [devices, setDevices] = useState<{id: string, name: string, signal: number}[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>(PCBService.getConnectionStatus());

  // Listen for connection status changes
  useEffect(() => {
    const handleConnectionStatusChange = (status: string) => {
      setConnectionStatus(status);
      if (status === 'connected') {
        setConnectedDevice(devices.find(d => d.id === connectedDevice)?.id || null);
      } else {
        setConnectedDevice(null);
      }
    };

    PCBService.addConnectionListener(handleConnectionStatusChange);
    
    return () => {
      PCBService.removeConnectionListener(handleConnectionStatusChange);
    };
  }, [devices, connectedDevice]);

  const handleStartScan = async () => {
    if (!connectionMethod) {
      toast.error("Please select a connection method first");
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setDevices([]);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          
          // Simulate finding devices
          if (connectionMethod === "bluetooth") {
            setDevices([
              { id: "WF-92A47C3E", name: "AquaWater Filter", signal: 87 },
              { id: "WF-A8B2C1D3", name: "Water Wellness PCB", signal: 92 }
            ]);
          } else {
            setDevices([
              { id: "WF-92A47C3E", name: "AquaWater Filter", signal: 75 },
              { id: "WF-A8B2C1D3", name: "Water Wellness PCB", signal: 88 },
              { id: "WF-E5F6G7H8", name: "Smart Water Device", signal: 62 }
            ]);
          }
          
          return 100;
        }
        return prev + 4;
      });
    }, 100);
  };

  const handleConnect = async (deviceId: string) => {
    setIsConnecting(true);
    
    let connected = false;
    if (connectionMethod === "bluetooth") {
      connected = await PCBService.connectBluetooth(deviceId);
    } else {
      connected = await PCBService.connectWifi(deviceId);
    }
    
    if (connected) {
      setConnectedDevice(deviceId);
      
      // If we have family members, sync them with the PCB
      if (familyMembers.length > 0) {
        await PCBService.sendFamilyProfiles(familyMembers);
      }
    }
    
    setIsConnecting(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">Connect Your Device</h1>
          <p className="text-muted-foreground">
            Link your Water Wellness filter to the application
          </p>
        </div>
        
        <Card className="shadow-md border-none overflow-hidden animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Choose Connection Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant={connectionMethod === "bluetooth" ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setConnectionMethod("bluetooth")}
              >
                <Bluetooth className="h-6 w-6" />
                <span>Bluetooth</span>
              </Button>
              
              <Button
                variant={connectionMethod === "wifi" ? "default" : "outline"}
                className="h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => setConnectionMethod("wifi")}
              >
                <Wifi className="h-6 w-6" />
                <span>WiFi</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {connectionMethod && (
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">
                {isScanning ? "Scanning for Devices..." : "Available Devices"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isScanning ? (
                <div className="space-y-4">
                  <Progress value={scanProgress} className="h-2" />
                  <p className="text-center text-sm text-muted-foreground">
                    Searching for Water Wellness devices nearby...
                  </p>
                </div>
              ) : (
                <>
                  {devices.length > 0 ? (
                    <div className="space-y-3">
                      {devices.map((device) => (
                        <Card 
                          key={device.id} 
                          className={`shadow-sm ${connectedDevice === device.id ? 'border-primary' : 'border-border'}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Smartphone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium">{device.name}</h3>
                                  <p className="text-xs text-muted-foreground">ID: {device.id}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                  <div className={`h-2 w-2 rounded-full ${device.signal > 50 ? 'bg-primary' : 'bg-muted'}`} />
                                  <div className={`h-2 w-2 rounded-full ${device.signal > 75 ? 'bg-primary' : 'bg-muted'}`} />
                                </div>
                                
                                {connectedDevice === device.id ? (
                                  <Button variant="ghost" size="sm" className="text-primary">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Connected
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleConnect(device.id)}
                                    disabled={isConnecting}
                                  >
                                    {isConnecting ? "Connecting..." : "Connect"}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">No devices found</p>
                      <Button onClick={handleStartScan} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Scan Again
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              {!isScanning && (
                <div className="flex justify-center">
                  <Button 
                    onClick={handleStartScan} 
                    disabled={isScanning}
                    variant={devices.length > 0 ? "outline" : "default"}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {devices.length > 0 ? "Scan Again" : "Start Scan"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        {connectedDevice && (
          <Card className="shadow-md border-none overflow-hidden animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium">Device Connected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-md flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Your water filter device is now connected!</p>
                  <p className="text-sm text-muted-foreground">
                    You can now view water consumption data and manage your family profiles.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-3">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
                <Button onClick={() => navigate("/settings")}>
                  Device Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ConnectDevice;
