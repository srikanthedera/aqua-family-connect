
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react";

interface HealthIndicator {
  name: string;
  value: string;
  referenceRange: string;
  status: "normal" | "high" | "low";
  change?: "increased" | "decreased" | "unchanged";
  changeAmount?: string;
}

interface HealthReportSummaryProps {
  memberId: number;
  memberName: string;
  lastUpdated: string;
  positiveIndicators: HealthIndicator[];
  concerningIndicators: HealthIndicator[];
}

const HealthReportSummary: React.FC<HealthReportSummaryProps> = ({
  memberId,
  memberName,
  lastUpdated,
  positiveIndicators,
  concerningIndicators,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "high":
        return "text-amber-500";
      case "low":
        return "text-blue-500";
      default:
        return "";
    }
  };
  
  const getChangeIcon = (change?: string) => {
    if (!change) return null;
    
    switch (change) {
      case "increased":
        return <ArrowUpIcon className="h-3 w-3 text-red-500" />;
      case "decreased":
        return <ArrowDownIcon className="h-3 w-3 text-green-500" />;
      case "unchanged":
        return null;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md border-none animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Health Report Summary</CardTitle>
        <CardDescription>
          AI analysis of {memberName}'s latest health report
          <span className="block text-xs mt-1">Last updated: {lastUpdated}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
            <h3 className="text-sm font-medium">Positive Indicators</h3>
          </div>
          
          <div className="space-y-2">
            {positiveIndicators.map((indicator, index) => (
              <div 
                key={index} 
                className="p-3 bg-green-50 rounded-lg animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{indicator.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Reference range: {indicator.referenceRange}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(indicator.status)}`}
                  >
                    {indicator.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="font-medium">{indicator.value}</span>
                  {indicator.change && (
                    <div className="ml-2 flex items-center text-xs">
                      {getChangeIcon(indicator.change)}
                      <span className="ml-1">{indicator.changeAmount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
            <h3 className="text-sm font-medium">Indicators to Monitor</h3>
          </div>
          
          <div className="space-y-2">
            {concerningIndicators.map((indicator, index) => (
              <div 
                key={index} 
                className="p-3 bg-amber-50 rounded-lg animate-slide-in-right"
                style={{ animationDelay: `${(index + positiveIndicators.length) * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{indicator.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      Reference range: {indicator.referenceRange}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(indicator.status)}`}
                  >
                    {indicator.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="font-medium">{indicator.value}</span>
                  {indicator.change && (
                    <div className="ml-2 flex items-center text-xs">
                      {getChangeIcon(indicator.change)}
                      <span className="ml-1">{indicator.changeAmount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Full Analysis
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HealthReportSummary;
