import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, RefreshCw, AlertCircle, ShieldCheck, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WiFiNetwork } from "@/services/WifiService";
import { toast } from "sonner";
import { wifiService } from "@/services/WifiService";

interface ScanIonphorNetworksProps {
  onNetworkSelected: (network: WiFiNetwork) => void;
}

const ScanIonphorNetworks: React.FC<ScanIonphorNetworksProps> = ({ onNetworkSelected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [networks, setNetworks] = useState<WiFiNetwork[]>([]);
  const [scanError, setScanError] = useState<string | null>(null);
  
  const scanForNetworks = async () => {
    setIsScanning(true);
    setScanError(null);
    
    try {
      console.log("Scanning for Ionphor WiFi networks...");
      
      // Use our WifiService to scan for Ionphor devices
      const ionphorNetworks = await wifiService.scanForIonphorDevices();
      
      setNetworks(ionphorNetworks);
      
      if (ionphorNetworks.length === 0) {
        setScanError("No Ionphor devices found. Make sure your device is in setup mode.");
        toast.error("No Ionphor devices found", {
          description: "Make sure your device is powered on and in setup mode"
        });
      } else {
        toast.success(`Found ${ionphorNetworks.length} Ionphor device(s)`);
      }
    } catch (error) {
      console.error("Error scanning for networks:", error);
      setScanError("Failed to scan for networks. Please check your device permissions.");
      toast.error("Network scan failed");
    } finally {
      setIsScanning(false);
    }
  };
  
  // Start scanning on component mount
  useEffect(() => {
    scanForNetworks();
  }, []);
  
  // Calculate signal strength indicator
  const getSignalStrengthClass = (strength: number) => {
    if (strength >= 80) return "bg-green-500";
    if (strength >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Wifi className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-medium text-center">Find Your Ionphor Device</h2>
          <p className="text-center text-muted-foreground mt-2">
            Scanning for Ionphor devices in setup mode
          </p>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={scanForNetworks} 
            disabled={isScanning}
            className="space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Rescan'}</span>
          </Button>
        </div>
        
        <div className="space-y-2 mb-6">
          {isScanning ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-muted-foreground">Scanning for Ionphor devices...</p>
            </div>
          ) : networks.length > 0 ? (
            networks.map((network) => (
              <div 
                key={network.ssid}
                className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => onNetworkSelected(network)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Wifi className="h-5 w-5" />
                      <div 
                        className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${getSignalStrengthClass(network.signalStrength)}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{network.ssid}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        {network.secured ? (
                          <>
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            <span>Secured</span>
                          </>
                        ) : (
                          <>
                            <Shield className="h-3 w-3 mr-1" />
                            <span>Open</span>
                          </>
                        )}
                        <span className="mx-1">•</span>
                        <span>Signal: {network.signalStrength}%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">No Ionphor devices found</p>
            </div>
          )}
        </div>
        
        {networks.length === 0 && !isScanning && (
          <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200 mb-6">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              No Ionphor devices found. Make sure your device is powered on and in setup mode.
              The LED should be flashing blue.
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-sm text-muted-foreground mb-4">
          Select your Ionphor device from the list above. The device name will start with "Ionphor-setup-" 
          followed by a unique identifier.
        </p>
      </CardContent>
    </Card>
  );
};

export default ScanIonphorNetworks;
