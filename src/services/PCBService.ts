
/**
 * PCBService - Handles communication with the water filter PCB board
 * 
 * This service provides methods to:
 * - Connect to the PCB
 * - Listen for water consumption data
 * - Listen for water quality data
 * - Send family profiles to the PCB
 * - Trigger water dispensing
 */

import { FamilyMember } from "@/contexts/FamilyContext";
import { toast } from "sonner";

// Event types for PCB data
export type ConsumptionData = {
  memberId: string;
  amount: number;
  timestamp: number;
  ph: number;
};

export type QualityData = {
  waterQuality: number;
  averagePh: number;
  timestamp: number;
};

// Listener types
type ConsumptionListener = (data: ConsumptionData) => void;
type QualityListener = (data: QualityData) => void;
type ConnectionListener = (connected: boolean) => void;

class PCBService {
  private static instance: PCBService;
  private consumptionListeners: ConsumptionListener[] = [];
  private qualityListeners: QualityListener[] = [];
  private connectionListeners: ConnectionListener[] = [];
  private connected: boolean = false;
  private connectionInterval: NodeJS.Timeout | null = null;

  private constructor() {
    // Private constructor to force singleton usage
  }

  public static getInstance(): PCBService {
    if (!PCBService.instance) {
      PCBService.instance = new PCBService();
    }
    return PCBService.instance;
  }

  /**
   * TODO: Implement real PCB connection logic
   * In a real app, this would use WebSockets, Bluetooth, or another 
   * communication protocol to connect to the physical device
   */
  public connect(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate connection process
      setTimeout(() => {
        this.connected = true;
        this.notifyConnectionListeners(true);
        toast.success("Connected to water filter");
        
        // Start simulating data for demo purposes
        this.startDataSimulation();
        
        resolve(true);
      }, 2000);
    });
  }

  /**
   * TODO: Implement real PCB disconnection logic
   */
  public disconnect(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate disconnection process
      setTimeout(() => {
        this.connected = false;
        this.notifyConnectionListeners(false);
        
        // Stop simulating data
        if (this.connectionInterval) {
          clearInterval(this.connectionInterval);
          this.connectionInterval = null;
        }
        
        toast.info("Disconnected from water filter");
        resolve(true);
      }, 1000);
    });
  }

  /**
   * TODO: Replace this with actual data from PCB
   * This is just for demo purposes
   */
  private startDataSimulation() {
    // Clear any existing interval
    if (this.connectionInterval) {
      clearInterval(this.connectionInterval);
    }
    
    // Simulate data every 10 seconds
    this.connectionInterval = setInterval(() => {
      if (!this.connected) return;
      
      // Simulate quality data once per minute
      if (Math.random() > 0.8) {
        const qualityData: QualityData = {
          waterQuality: 90 + Math.random() * 8,
          averagePh: 7.2 + Math.random() * 0.6,
          timestamp: Date.now()
        };
        this.notifyQualityListeners(qualityData);
      }
      
      // Simulate consumption data randomly
      if (Math.random() > 0.7) {
        // Random family member ID (would come from PCB in real app)
        const consumptionData: ConsumptionData = {
          memberId: Math.random().toString(36).substring(2, 9),
          amount: 0.1 + Math.random() * 0.3,
          timestamp: Date.now(),
          ph: 7.0 + Math.random() * 1.0
        };
        this.notifyConsumptionListeners(consumptionData);
      }
    }, 10000);
  }

  /**
   * TODO: Implement real family profile synchronization with PCB
   * Send family profiles to the PCB for user identification
   */
  public syncFamilyProfiles(members: FamilyMember[]): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.connected) {
        toast.error("Not connected to water filter");
        resolve(false);
        return;
      }
      
      // Simulate sending profiles to PCB
      setTimeout(() => {
        console.log("Sending family profiles to PCB:", members);
        toast.success("Family profiles synced with water filter");
        resolve(true);
      }, 1500);
    });
  }

  /**
   * TODO: Implement real water dispensing command to PCB
   * Trigger water dispensing for a specific family member
   */
  public dispenseWater(memberId: string, amount: number, ph: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.connected) {
        toast.error("Not connected to water filter");
        resolve(false);
        return;
      }
      
      // Simulate sending command to PCB
      setTimeout(() => {
        console.log(`Dispensing ${amount}L of water with pH ${ph} for member ${memberId}`);
        
        // Simulate data coming back from PCB after dispensing
        const consumptionData: ConsumptionData = {
          memberId,
          amount,
          timestamp: Date.now(),
          ph
        };
        
        this.notifyConsumptionListeners(consumptionData);
        resolve(true);
      }, 1000);
    });
  }

  // Connection status listeners
  public addConnectionListener(listener: ConnectionListener) {
    this.connectionListeners.push(listener);
    // Immediately notify with current status
    listener(this.connected);
    return () => this.removeConnectionListener(listener);
  }
  
  public removeConnectionListener(listener: ConnectionListener) {
    this.connectionListeners = this.connectionListeners.filter(l => l !== listener);
  }
  
  private notifyConnectionListeners(connected: boolean) {
    this.connectionListeners.forEach(listener => listener(connected));
  }

  // Consumption data listeners
  public addConsumptionListener(listener: ConsumptionListener) {
    this.consumptionListeners.push(listener);
    return () => this.removeConsumptionListener(listener);
  }
  
  public removeConsumptionListener(listener: ConsumptionListener) {
    this.consumptionListeners = this.consumptionListeners.filter(l => l !== listener);
  }
  
  private notifyConsumptionListeners(data: ConsumptionData) {
    this.consumptionListeners.forEach(listener => listener(data));
  }

  // Water quality data listeners
  public addQualityListener(listener: QualityListener) {
    this.qualityListeners.push(listener);
    return () => this.removeQualityListener(listener);
  }
  
  public removeQualityListener(listener: QualityListener) {
    this.qualityListeners = this.qualityListeners.filter(l => l !== listener);
  }
  
  private notifyQualityListeners(data: QualityData) {
    this.qualityListeners.forEach(listener => listener(data));
  }

  // Check if connected to PCB
  public isConnected(): boolean {
    return this.connected;
  }
}

export default PCBService.getInstance();
