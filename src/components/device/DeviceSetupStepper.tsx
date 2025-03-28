
import React, { useEffect, useRef } from "react";
import { DeviceSetupStep } from "@/pages/DeviceSetup";
import { Check, Wifi, SmartphoneIcon, Home, CheckCircle, Power, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Auto-scroll to the current step when it changes
  useEffect(() => {
    if (carouselRef.current) {
      const stepElements = carouselRef.current.querySelectorAll('[role="group"]');
      const currentStepElement = stepElements[currentIndex];
      
      if (currentStepElement) {
        currentStepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);
  
  return (
    <div className="w-full">
      <Carousel opts={{ align: "start", loop: false }}>
        <CarouselContent ref={carouselRef} className="p-1">
          {steps.map(([step, info], index) => {
            const isActive = step === currentStep;
            const isCompleted = index < currentIndex;
            const isLast = index === steps.length - 1;
            
            return (
              <CarouselItem key={step} className={`pl-2 ${isLast && isMobile ? 'basis-1/2' : 'basis-1/3 md:basis-1/5'} min-w-0`}>
                <div className="flex flex-col items-center space-y-2">
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-primary text-primary-foreground' : 
                        isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      <info.icon className="h-6 w-6" />
                    )}
                  </div>
                  <span className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {info.label}
                  </span>
                  
                  {!isLast && (
                    <div className="flex justify-center w-full mt-1">
                      <ArrowRight className={`h-5 w-5 ${index < currentIndex ? 'text-primary' : 'text-muted'}`} />
                    </div>
                  )}
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default DeviceSetupStepper;
