
import { toast } from "sonner";

// Define the types of data we expect from the PCB
export interface PCBWaterConsumptionData {
  memberId: string;
  amount: number;
  timestamp: number;
  phLevel: number;
}

export interface PCBWaterQualityData {
  waterQuality: number;
  averagePh: number;
  timestamp: number;
}

class PCBService {
  private static instance: PCBService;
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
  private listeners: {
    consumption: ((data: PCBWaterConsumptionData) => void)[];
    quality: ((data: PCBWaterQualityData) => void)[];
    connection: ((status: string) => void)[];
  };

  private constructor() {
    this.listeners = {
      consumption: [],
      quality: [],
      connection: []
    };
  }

  public static getInstance(): PCBService {
    if (!PCBService.instance) {
      PCBService.instance = new PCBService();
    }
    return PCBService.instance;
  }

  // Connect to PCB device via Bluetooth
  public async connectBluetooth(deviceId: string): Promise<boolean> {
    try {
      this.connectionStatus = 'connecting';
      this.notifyConnectionListeners('connecting');
      
      // In a real implementation, this would use Web Bluetooth API
      // For now, we'll simulate successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Connected to PCB device via Bluetooth: ${deviceId}`);
      this.connectionStatus = 'connected';
      this.notifyConnectionListeners('connected');
      
      // Start listening for data from the PCB
      this.startListening();
      
      return true;
    } catch (error) {
      console.error('Failed to connect to PCB device via Bluetooth:', error);
      this.connectionStatus = 'disconnected';
      this.notifyConnectionListeners('disconnected');
      toast.error("Failed to connect to water filter device");
      return false;
    }
  }

  // Connect to PCB device via WiFi
  public async connectWifi(deviceId: string): Promise<boolean> {
    try {
      this.connectionStatus = 'connecting';
      this.notifyConnectionListeners('connecting');
      
      // In a real implementation, this would use Web Sockets or WebRTC
      // For now, we'll simulate successful connection after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Connected to PCB device via WiFi: ${deviceId}`);
      this.connectionStatus = 'connected';
      this.notifyConnectionListeners('connected');
      
      // Start listening for data from the PCB
      this.startListening();
      
      return true;
    } catch (error) {
      console.error('Failed to connect to PCB device via WiFi:', error);
      this.connectionStatus = 'disconnected';
      this.notifyConnectionListeners('disconnected');
      toast.error("Failed to connect to water filter device");
      return false;
    }
  }

  // Disconnect from PCB device
  public disconnect(): void {
    // Implementation would depend on the connection method used
    console.log('Disconnected from PCB device');
    this.connectionStatus = 'disconnected';
    this.notifyConnectionListeners('disconnected');
    toast.info("Disconnected from water filter device");
  }

  // Send family member profiles to PCB
  public async sendFamilyProfiles(familyMembers: any[]): Promise<boolean> {
    if (this.connectionStatus !== 'connected') {
      toast.error("Not connected to water filter device");
      return false;
    }

    try {
      // Format data for PCB
      const pcbFamilyData = familyMembers.map(member => ({
        id: member.id,
        nickname: member.nickname,
        phValue: member.phValue
      }));

      console.log('Sending family profiles to PCB:', pcbFamilyData);
      
      // In a real implementation, this would send data to the PCB
      // For now, we'll simulate successful sending after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Family profiles synced with water filter");
      return true;
    } catch (error) {
      console.error('Failed to send family profiles to PCB:', error);
      toast.error("Failed to sync profiles with water filter");
      return false;
    }
  }

  // Add a consumption data listener
  public addConsumptionListener(callback: (data: PCBWaterConsumptionData) => void): void {
    this.listeners.consumption.push(callback);
  }

  // Remove a consumption data listener
  public removeConsumptionListener(callback: (data: PCBWaterConsumptionData) => void): void {
    this.listeners.consumption = this.listeners.consumption.filter(cb => cb !== callback);
  }

  // Add a water quality data listener
  public addQualityListener(callback: (data: PCBWaterQualityData) => void): void {
    this.listeners.quality.push(callback);
  }

  // Remove a water quality data listener
  public removeQualityListener(callback: (data: PCBWaterQualityData) => void): void {
    this.listeners.quality = this.listeners.quality.filter(cb => cb !== callback);
  }

  // Add a connection status listener
  public addConnectionListener(callback: (status: string) => void): void {
    this.listeners.connection.push(callback);
  }

  // Remove a connection status listener
  public removeConnectionListener(callback: (status: string) => void): void {
    this.listeners.connection = this.listeners.connection.filter(cb => cb !== callback);
  }

  // Notify all consumption data listeners
  private notifyConsumptionListeners(data: PCBWaterConsumptionData): void {
    this.listeners.consumption.forEach(callback => callback(data));
  }

  // Notify all water quality data listeners
  private notifyQualityListeners(data: PCBWaterQualityData): void {
    this.listeners.quality.forEach(callback => callback(data));
  }

  // Notify all connection status listeners
  private notifyConnectionListeners(status: string): void {
    this.listeners.connection.forEach(callback => callback(status));
  }

  // Start listening for data from the PCB
  private startListening(): void {
    // In a real implementation, this would set up event listeners for data from the PCB
    // For now, we'll simulate receiving data at random intervals
    
    // Simulate water consumption data
    setInterval(() => {
      // Only send simulated data if connected
      if (this.connectionStatus === 'connected') {
        const simulatedData: PCBWaterConsumptionData = {
          memberId: Math.random().toString(36).substring(2, 9), // Random ID
          amount: 0.1 + Math.random() * 0.2, // Random amount between 0.1 and 0.3 liters
          timestamp: Date.now(),
          phLevel: 7.0 + Math.random() * 1.5 // Random pH between 7.0 and 8.5
        };
        
        this.notifyConsumptionListeners(simulatedData);
      }
    }, 30000); // Every 30 seconds
    
    // Simulate water quality data
    setInterval(() => {
      // Only send simulated data if connected
      if (this.connectionStatus === 'connected') {
        const simulatedData: PCBWaterQualityData = {
          waterQuality: 90 + Math.random() * 10, // Random quality between 90 and 100
          averagePh: 7.0 + Math.random() * 1.5, // Random pH between 7.0 and 8.5
          timestamp: Date.now()
        };
        
        this.notifyQualityListeners(simulatedData);
      }
    }, 60000); // Every minute
  }

  // Get current connection status
  public getConnectionStatus(): string {
    return this.connectionStatus;
  }
}

export default PCBService.getInstance();
