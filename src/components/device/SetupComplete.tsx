
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

interface SetupCompleteProps {
  onFinish: () => void;
}

const SetupComplete: React.FC<SetupCompleteProps> = ({ onFinish }) => {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-medium text-center">Setup Complete!</h2>
          <p className="text-center text-muted-foreground mt-2">
            Your Ionphor device has been successfully connected to your home WiFi network
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-primary/5">
            <h3 className="font-medium mb-3">What happens next?</h3>
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>Your Ionphor device will restart and connect to your home WiFi</li>
              <li>The LED will turn solid blue when the connection is successful</li>
              <li>You'll be able to monitor and control your device from the app</li>
              <li>System updates will be automatically downloaded and installed</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-medium mb-3">Tips for optimal performance</h3>
            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
              <li>Place your Ionphor device in an open area for better connectivity</li>
              <li>Keep the device away from large metal objects and appliances</li>
              <li>Ensure your WiFi router is working properly for continuous connectivity</li>
              <li>Check for firmware updates regularly in the Connect Device section</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 flex justify-end">
          <Button 
            onClick={onFinish} 
            className="space-x-2"
          >
            <span>Continue to Device Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SetupComplete;
