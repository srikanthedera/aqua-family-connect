
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Power, ArrowRight, AlertCircle } from "lucide-react";

interface PowerOnDeviceProps {
  onContinue: () => void;
}

const PowerOnDevice: React.FC<PowerOnDeviceProps> = ({ onContinue }) => {
  const [userConfirmed, setUserConfirmed] = useState(false);
  
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Power className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-medium text-center">Power On Your Ionphor Device</h2>
          <p className="text-center text-muted-foreground mt-2">
            Before we begin, make sure your Ionphor device is powered on and ready for setup
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">How to get started:</h3>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground pl-2">
              <li>Ensure your Ionphor device is plugged into a power outlet</li>
              <li>Press and hold the power button for 3 seconds</li>
              <li>Wait for the LED indicator to flash blue</li>
              <li>The blue flashing light indicates the device is in setup mode</li>
            </ol>
          </div>
          
          <div className="pt-4">
            <label className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                className="mt-1"
                checked={userConfirmed}
                onChange={() => setUserConfirmed(!userConfirmed)}
              />
              <span className="text-sm">
                I've powered on my Ionphor device and the LED is flashing blue
              </span>
            </label>
          </div>
          
          <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              If the LED is not flashing blue, try turning the device off and on again. 
              If problems persist, please check the user manual or contact support.
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="pt-6 flex justify-end">
          <Button 
            onClick={onContinue} 
            disabled={!userConfirmed}
            className="space-x-2"
          >
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerOnDevice;
