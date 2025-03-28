
import React, { useEffect, useState } from "react";
import { DeviceSetupStep } from "@/pages/DeviceSetup";
import { Check, Wifi, SmartphoneIcon, Home, CheckCircle, Power } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselApi
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [api, setApi] = useState<CarouselApi>();
  const isMobile = useIsMobile();
  
  // Auto-scroll to the current step when it changes
  useEffect(() => {
    if (api) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          containScroll: "trimSnaps",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className={`${isMobile ? '-ml-1' : '-ml-4'}`}>
          {steps.map(([step, info], index) => {
            const isActive = step === currentStep;
            const isCompleted = index < currentIndex;
            
            return (
              <CarouselItem 
                key={step} 
                className={`${isMobile ? 'pl-1' : 'pl-4'} flex flex-col items-center`}
              >
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
                
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      w-6 h-[2px] mt-5 mx-2 absolute right-0 top-5 translate-x-1/2
                      ${index < currentIndex ? 'bg-primary' : 'bg-muted'}
                    `}
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DeviceSetupStepper;
