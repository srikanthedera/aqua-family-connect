
import React, { useEffect, useState } from "react";
import { DeviceSetupStep } from "@/pages/DeviceSetup";
import { Check, Wifi, SmartphoneIcon, Home, CheckCircle, Power } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

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
  
  useEffect(() => {
    if (api) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex]);
  
  return (
    <div className="w-full">
      <Carousel 
        setApi={setApi}
        className="w-full max-w-4xl mx-auto"
        opts={{
          align: "center",
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {steps.map(([step, info], index) => {
            const isActive = step === currentStep;
            const isCompleted = index < currentIndex;
            
            return (
              <CarouselItem key={step} className="pl-2 md:pl-4 basis-1/3 md:basis-1/5">
                <div className="flex flex-col items-center space-y-2 relative">
                  <div 
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-primary text-primary-foreground shadow-lg scale-110' : 
                        isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                      <info.icon className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </div>
                  <span className={`text-xs md:text-sm whitespace-nowrap text-center transition-all duration-300 ${
                    isActive ? 'font-semibold text-primary' : 'text-muted-foreground'
                  }`}>
                    {info.label}
                  </span>
                  
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div 
                      className={`
                        absolute top-6 md:top-7 left-[calc(100%_-_8px)] w-[calc(100vw_/_3_-_32px)] md:w-[calc(100vw_/_5_-_40px)] h-[2px] transition-all duration-500
                        ${index < currentIndex ? 'bg-primary' : 'bg-muted'}
                      `}
                    />
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
