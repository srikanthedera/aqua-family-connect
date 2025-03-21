
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HealthIndicator } from "@/types/health";

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
  concerningIndicators
}) => {
  if (!lastUpdated) {
    return (
      <Card className="shadow-md border-none h-full flex items-center justify-center animate-fade-in">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No health reports available for {memberName} yet.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Upload a health report to see AI analysis here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md border-none animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          Health Report Analysis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-green-600 mb-3">
            Positive Indicators
          </h3>
          {positiveIndicators.length > 0 ? (
            <ScrollArea className="max-h-48 pr-4">
              <div className="space-y-4">
                {positiveIndicators.map((indicator, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{indicator.name}</span>
                      <span className="text-green-600 font-medium">{indicator.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Reference range: {indicator.referenceRange}
                    </p>
                    <div className="flex items-center text-xs">
                      <span
                        className={`inline-flex items-center ${
                          indicator.change === "increased"
                            ? "text-green-600"
                            : indicator.change === "decreased"
                            ? "text-amber-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {indicator.change === "increased" ? "↑" : indicator.change === "decreased" ? "↓" : "→"}
                        {" "}
                        {indicator.change !== "unchanged" && indicator.changeAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">No positive indicators found.</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-orange-600 mb-3">
            Concerning Indicators
          </h3>
          {concerningIndicators.length > 0 ? (
            <ScrollArea className="max-h-48 pr-4">
              <div className="space-y-4">
                {concerningIndicators.map((indicator, index) => (
                  <div key={index} className="bg-orange-50 p-3 rounded-md">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{indicator.name}</span>
                      <span className={`font-medium ${
                        indicator.status === "high" ? "text-orange-600" : 
                        indicator.status === "low" ? "text-purple-600" : ""
                      }`}>
                        {indicator.value}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Reference range: {indicator.referenceRange}
                    </p>
                    <div className="flex items-center text-xs">
                      <span
                        className={`inline-flex items-center ${
                          indicator.change === "increased" && indicator.status === "high" ||
                          indicator.change === "decreased" && indicator.status === "low"
                            ? "text-orange-600"
                            : indicator.change === "decreased" && indicator.status === "high" ||
                              indicator.change === "increased" && indicator.status === "low"
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }`}
                      >
                        {indicator.change === "increased" ? "↑" : indicator.change === "decreased" ? "↓" : "→"}
                        {" "}
                        {indicator.change !== "unchanged" && indicator.changeAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-sm text-muted-foreground">No concerning indicators found.</p>
          )}
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground italic">
            Note: This AI analysis is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthReportSummary;
