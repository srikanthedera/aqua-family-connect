
import React from "react";
import { DeviceSetupStep } from "@/pages/DeviceSetup";
import { Check, Wifi, SmartphoneIcon, Home, CheckCircle, Power, ArrowRight } from "lucide-react";

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
      {/* Mobile view - flow layout (stacked with 2 items per row) */}
      <div className="md:hidden grid grid-cols-2 gap-4">
        {steps.map(([step, info], index) => {
          const isActive = step === currentStep;
          const isCompleted = index < currentIndex;
          const isLast = index === steps.length - 1;
          const isOdd = index % 2 === 0;
          
          return (
            <React.Fragment key={step}>
              {/* Step */}
              <div className={`flex flex-col ${isOdd && !isLast ? 'col-span-1' : isLast ? 'col-span-2 justify-center mx-auto' : 'col-span-1'}`}>
                <div className="flex items-center">
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
                  <span className={`ml-2 ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                    {info.label}
                  </span>
                </div>
                
                {/* Connector arrows */}
                {!isLast && (
                  <div className={`flex justify-center ${isOdd ? 'rotate-90 mt-4' : '-rotate-90 -mt-4'}`}>
                    <ArrowRight className={`h-5 w-5 ${index < currentIndex ? 'text-primary' : 'text-muted'}`} />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Desktop view - horizontal layout */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between">
          {steps.map(([step, info], index) => {
            const isActive = step === currentStep;
            const isCompleted = index < currentIndex;
            
            return (
              <React.Fragment key={step}>
                {/* Step */}
                <div className="flex flex-col items-center space-y-2">
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
                  <span className={`text-xs whitespace-nowrap ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                    {info.label}
                  </span>
                </div>
                
                {/* Connector */}
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      flex-1 h-[2px] mt-5 mx-2
                      ${index < currentIndex ? 'bg-primary' : 'bg-muted'}
                    `}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DeviceSetupStepper;
