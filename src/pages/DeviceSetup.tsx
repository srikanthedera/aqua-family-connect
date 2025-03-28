
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeviceSetupStepper from "@/components/device/DeviceSetupStepper";
import PowerOnDevice from "@/components/device/PowerOnDevice";
import ScanIonphorNetworks from "@/components/device/ScanIonphorNetworks";
import ConnectToDevice from "@/components/device/ConnectToDevice";
import ScanHomeNetworks from "@/components/device/ScanHomeNetworks";
import SetupComplete from "@/components/device/SetupComplete";

export type WiFiNetwork = {
  ssid: string;
  signalStrength: number; // 0-100
  secured: boolean;
};

export type DeviceSetupStep = 
  | "power-on" 
  | "scan-ionphor" 
  | "connect-device" 
  | "scan-home-wifi" 
  | "complete";

const DeviceSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<DeviceSetupStep>("power-on");
  const [selectedIonphorNetwork, setSelectedIonphorNetwork] = useState<WiFiNetwork | null>(null);
  const [selectedHomeNetwork, setSelectedHomeNetwork] = useState<WiFiNetwork | null>(null);
  const [homeNetworkPassword, setHomeNetworkPassword] = useState("");
  
  const handleStepComplete = (step: DeviceSetupStep, nextStep: DeviceSetupStep) => {
    setCurrentStep(nextStep);
  };
  
  const handleComplete = () => {
    navigate("/create-family-profile");
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "power-on":
        return (
          <PowerOnDevice 
            onContinue={() => handleStepComplete("power-on", "scan-ionphor")} 
          />
        );
      case "scan-ionphor":
        return (
          <ScanIonphorNetworks 
            onNetworkSelected={(network) => {
              setSelectedIonphorNetwork(network);
              handleStepComplete("scan-ionphor", "connect-device");
            }}
          />
        );
      case "connect-device":
        return (
          <ConnectToDevice 
            network={selectedIonphorNetwork}
            onConnected={() => handleStepComplete("connect-device", "scan-home-wifi")}
          />
        );
      case "scan-home-wifi":
        return (
          <ScanHomeNetworks 
            onNetworkSelected={setSelectedHomeNetwork}
            onPasswordEntered={setHomeNetworkPassword}
            onContinue={() => handleStepComplete("scan-home-wifi", "complete")}
            selectedNetwork={selectedHomeNetwork}
            password={homeNetworkPassword}
          />
        );
      case "complete":
        return (
          <SetupComplete onFinish={handleComplete} />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto pt-6 pb-16 px-4 md:px-6">
        <div className="space-y-6 md:space-y-8">
          <div>
            <h1 className="text-2xl font-medium mb-2 mt-2 md:mt-0">Ionphor Device Setup</h1>
            <p className="text-muted-foreground">
              Connect your Ionphor device to your home WiFi network
            </p>
          </div>
          
          <div className="py-4 overflow-hidden">
            <DeviceSetupStepper currentStep={currentStep} />
          </div>
          
          <div className="mt-4 md:mt-8">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceSetup;
