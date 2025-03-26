
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WiFiNetwork } from "@/pages/DeviceSetup";
import { Progress } from "@/components/ui/progress";
import { Check, RefreshCw, AlertCircle, Wifi } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface ConnectToDeviceProps {
  network: WiFiNetwork | null;
  onConnected: () => void;
}

const ConnectToDevice: React.FC<ConnectToDeviceProps> = ({ network, onConnected }) => {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "failed">("idle");
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  
  const connectToNetwork = () => {
    if (!network) return;
    
    setStatus("connecting");
    setProgress(0);
    
    // Simulate connection progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Determine if connection succeeds (90% success rate, but retry increases chances)
          const success = Math.random() < (0.9 + (retryCount * 0.05));
          
          if (success) {
            setStatus("connected");
            toast.success(`Connected to ${network.ssid}`);
            // Wait a moment before proceeding
            setTimeout(onConnected, 1500);
          } else {
            setStatus("failed");
            toast.error("Connection failed", {
              description: "Could not connect to Ionphor device"
            });
          }
        }
        
        return newProgress;
      });
    }, 400);
    
    return () => clearInterval(interval);
  };
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    connectToNetwork();
  };
  
  // Start connecting on component mount
  useEffect(() => {
    if (network) {
      connectToNetwork();
    }
  }, [network]);
  
  if (!network) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>
          No network selected. Please go back and select a network.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Wifi className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-medium text-center">Connecting to Ionphor Device</h2>
          <p className="text-center text-muted-foreground mt-2">
            Establishing connection to {network.ssid}
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Connection Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
            {status === "connecting" && (
              <>
                <RefreshCw className="h-8 w-8 animate-spin text-primary mb-3" />
                <p className="font-medium">Connecting to {network.ssid}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Please wait while we establish a connection...
                </p>
              </>
            )}
            
            {status === "connected" && (
              <>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium">Successfully Connected!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Communication with your Ionphor device has been established
                </p>
              </>
            )}
            
            {status === "failed" && (
              <>
                <AlertCircle className="h-8 w-8 text-destructive mb-3" />
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  We couldn't establish a connection to your Ionphor device
                </p>
                <Button onClick={handleRetry} variant="outline" size="sm">
                  Try Again
                </Button>
              </>
            )}
          </div>
          
          {status !== "connected" && (
            <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertDescription>
                Make sure your device is still in setup mode with the LED flashing blue.
                If you're having trouble connecting, try moving closer to the device.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectToDevice;
