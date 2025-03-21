
export type HealthStatus = "high" | "low" | "normal";
export type ChangeDirection = "increased" | "decreased" | "unchanged";

export interface HealthIndicator {
  name: string;
  value: string;
  referenceRange: string;
  status: HealthStatus;
  change: ChangeDirection;
  changeAmount: string;
}

export interface HealthReportData {
  lastUpdated: string;
  positiveIndicators: HealthIndicator[];
  concerningIndicators: HealthIndicator[];
}
