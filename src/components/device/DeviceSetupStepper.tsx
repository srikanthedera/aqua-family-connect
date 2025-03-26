
import React from "react";
import { DeviceSetupStep } from "@/pages/DeviceSetup";
import { Check, Wifi, SmartphoneIcon, Home, CheckCircle, Power } from "lucide-react";

type StepInfo = {
  label: string;
  icon: React.ElementType;
};

const STEPS: Record<DeviceSetupStep, StepInfo> = {
  "power-on": {
    label: "Power On",
    icon: Power
  },
  "scan-ionphor": {
    label: "Find Device",
    icon: Wifi
  },
  "connect-device": {
    label: "Connect",
    icon: SmartphoneIcon
  },
  "scan-home-wifi": {
    label: "Home WiFi",
    icon: Home
  },
  "complete": {
    label: "Complete",
    icon: CheckCircle
  }
};

const DeviceSetupStepper = ({ currentStep }: { currentStep: DeviceSetupStep }) => {
  const steps = Object.entries(STEPS) as [DeviceSetupStep, StepInfo][];
  const currentIndex = steps.findIndex(([step]) => step === currentStep);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map(([step, info], index) => {
          const isActive = step === currentStep;
          const isCompleted = index < currentIndex;
          
          return (
            <React.Fragment key={step}>
              {/* Step */}
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive ? 'bg-primary text-primary-foreground' : 
                      isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <info.icon className="h-5 w-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                  {info.label}
                </span>
              </div>
              
              {/* Connector */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    flex-1 h-[2px] mx-2
                    ${index < currentIndex ? 'bg-primary' : 'bg-muted'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSetupStepper;
