
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileIcon, UploadIcon, FileTextIcon, XIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SelectedFileProps {
  file: File;
  onRemove: () => void;
}

const SelectedFile: React.FC<SelectedFileProps> = ({ file, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md animate-slide-in-right">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
          <FileTextIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium truncate max-w-[150px] md:max-w-xs">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 w-8 p-0">
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface AIAnalysisResult {
  positiveIndicators: {
    name: string;
    value: string;
    referenceRange: string;
    status: "normal" | "high" | "low";
    change?: "increased" | "decreased" | "unchanged";
    changeAmount?: string;
  }[];
  concerningIndicators: {
    name: string;
    value: string;
    referenceRange: string;
    status: "normal" | "high" | "low";
    change?: "increased" | "decreased" | "unchanged";
    changeAmount?: string;
  }[];
  recommendations: string[];
}

interface ComparisonResult {
  indicatorName: string;
  oldValue: string;
  newValue: string;
  change: "improved" | "worsened" | "unchanged";
  changePercentage: string;
}

interface HealthReportUploaderProps {
  familyMemberId: number;
  memberName: string;
}

const HealthReportUploader: React.FC<HealthReportUploaderProps> = ({
  familyMemberId,
  memberName,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compareFile, setCompareFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysisResults, setShowAnalysisResults] = useState(false);
  const [showComparisonResults, setShowComparisonResults] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is a PDF
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit");
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleCompareFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is a PDF
      if (file.type !== "application/pdf") {
        toast.error("Please select a PDF file");
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB limit");
        return;
      }
      
      setCompareFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleRemoveCompareFile = () => {
    setCompareFile(null);
  };

  // TODO: This function should be connected to a real AI service that analyzes health reports
  const analyzeHealthReport = async (file: File): Promise<AIAnalysisResult> => {
    // Simulated AI analysis
    // In a real app, this would send the PDF to an AI service for analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis result
    return {
      positiveIndicators: [
        {
          name: "Vitamin D",
          value: "42 ng/mL",
          referenceRange: "30-50 ng/mL",
          status: "normal",
          change: "increased",
          changeAmount: "6 ng/mL"
        },
        {
          name: "HDL Cholesterol",
          value: "58 mg/dL",
          referenceRange: ">40 mg/dL",
          status: "normal",
          change: "unchanged",
          changeAmount: "0 mg/dL"
        },
        {
          name: "Blood Pressure",
          value: "118/78 mmHg",
          referenceRange: "<130/80 mmHg",
          status: "normal",
          change: "decreased",
          changeAmount: "5/3 mmHg"
        }
      ],
      concerningIndicators: [
        {
          name: "LDL Cholesterol",
          value: "145 mg/dL",
          referenceRange: "<100 mg/dL",
          status: "high",
          change: "increased",
          changeAmount: "10 mg/dL"
        },
        {
          name: "Glucose",
          value: "112 mg/dL",
          referenceRange: "70-99 mg/dL",
          status: "high",
          change: "decreased",
          changeAmount: "3 mg/dL"
        }
      ],
      recommendations: [
        "Consider increasing physical activity to help lower LDL cholesterol levels",
        "Monitor glucose levels more frequently, consider reducing refined carbohydrate intake",
        "Continue current vitamin D supplementation as levels are optimal",
        "Maintain current healthy habits that are keeping blood pressure in ideal range"
      ]
    };
  };

  // TODO: This function should be connected to a real AI service that compares two health reports
  const compareHealthReports = async (oldFile: File, newFile: File): Promise<ComparisonResult[]> => {
    // Simulated comparison analysis
    // In a real app, this would send both PDFs to an AI service for comparison
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock comparison results
    return [
      {
        indicatorName: "Vitamin D",
        oldValue: "36 ng/mL",
        newValue: "42 ng/mL",
        change: "improved",
        changePercentage: "+16.7%"
      },
      {
        indicatorName: "HDL Cholesterol",
        oldValue: "58 mg/dL",
        newValue: "58 mg/dL",
        change: "unchanged",
        changePercentage: "0%"
      },
      {
        indicatorName: "LDL Cholesterol",
        oldValue: "135 mg/dL",
        newValue: "145 mg/dL",
        change: "worsened",
        changePercentage: "+7.4%"
      },
      {
        indicatorName: "Glucose",
        oldValue: "115 mg/dL",
        newValue: "112 mg/dL",
        change: "improved",
        changePercentage: "-2.6%"
      },
      {
        indicatorName: "Blood Pressure",
        oldValue: "123/81 mmHg",
        newValue: "118/78 mmHg",
        change: "improved",
        changePercentage: "-4.1%/-3.7%"
      }
    ];
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadProgress(i * (100 / totalSteps));
    }
    
    setIsUploading(false);
    setIsAnalyzing(true);
    
    try {
      // Analyze the health report
      const result = await analyzeHealthReport(selectedFile);
      setAiAnalysisResult(result);
      
      // Show the analysis results
      setIsAnalyzing(false);
      setShowAnalysisResults(true);
      
      toast.success("Health report analyzed successfully", {
        description: "AI analysis complete"
      });
      
    } catch (error) {
      console.error("Error analyzing health report:", error);
      setIsAnalyzing(false);
      toast.error("Failed to analyze health report");
    }
  };

  const handleCompare = async () => {
    if (!selectedFile || !compareFile) {
      toast.error("Please select both files for comparison");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload with progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i * (100 / totalSteps));
    }
    
    setIsUploading(false);
    setIsAnalyzing(true);
    
    try {
      // Compare the health reports
      const result = await compareHealthReports(compareFile, selectedFile);
      setComparisonResults(result);
      
      // Show the comparison results
      setIsAnalyzing(false);
      setShowComparisonResults(true);
      
      toast.success("Health reports compared successfully", {
        description: "AI comparison complete"
      });
      
    } catch (error) {
      console.error("Error comparing health reports:", error);
      setIsAnalyzing(false);
      toast.error("Failed to compare health reports");
    }
  };

  return (
    <>
      <Card className="shadow-md border-none animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Upload Health Report</CardTitle>
          <CardDescription>
            Upload {memberName}'s latest health report for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!selectedFile && !isUploading && !isAnalyzing && (
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UploadIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Drag & drop your file here or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF files up to 10MB
                  </p>
                </div>
                <label htmlFor={`file-upload-${familyMemberId}`}>
                  <Button 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => document.getElementById(`file-upload-${familyMemberId}`)?.click()}
                  >
                    Browse Files
                  </Button>
                  <input
                    id={`file-upload-${familyMemberId}`}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
          
          {selectedFile && !isUploading && !isAnalyzing && (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium">Selected File</p>
                <SelectedFile file={selectedFile} onRemove={handleRemoveFile} />
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Compare with previous report (optional)</p>
                {!compareFile ? (
                  <div className="border border-dashed border-muted rounded-lg p-4 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="h-8 w-8 rounded-full bg-muted/80 flex items-center justify-center">
                        <PlusIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                          Add a previous report to compare results
                        </p>
                      </div>
                      <label htmlFor={`file-compare-${familyMemberId}`}>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="cursor-pointer text-xs h-8"
                          onClick={() => document.getElementById(`file-compare-${familyMemberId}`)?.click()}
                        >
                          Select Previous Report
                        </Button>
                        <input
                          id={`file-compare-${familyMemberId}`}
                          type="file"
                          accept=".pdf"
                          onChange={handleCompareFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <SelectedFile file={compareFile} onRemove={handleRemoveCompareFile} />
                )}
              </div>
            </>
          )}
          
          {isUploading && (
            <div className="space-y-4">
              <p className="text-sm font-medium">Uploading file...</p>
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                {uploadProgress.toFixed(0)}% uploaded
              </p>
            </div>
          )}
          
          {isAnalyzing && (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <FileTextIcon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-medium">Analyzing health report...</p>
              <p className="text-xs text-muted-foreground">
                AI is reviewing the document and extracting key health indicators
              </p>
            </div>
          )}
        </CardContent>
        {selectedFile && !isUploading && !isAnalyzing && (
          <CardFooter className="flex flex-col space-y-3">
            <Button onClick={handleUpload} className="w-full">
              Upload & Analyze
            </Button>
            
            {compareFile && (
              <Button onClick={handleCompare} variant="outline" className="w-full">
                Compare Reports
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* AI Analysis Results Dialog */}
      <Dialog open={showAnalysisResults} onOpenChange={setShowAnalysisResults}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Health Report Analysis</DialogTitle>
            <DialogDescription>
              AI analysis of {memberName}'s health report
            </DialogDescription>
          </DialogHeader>
          
          {aiAnalysisResult && (
            <div className="space-y-6 mt-4">
              <Tabs defaultValue="positive">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="positive">Positive Indicators</TabsTrigger>
                  <TabsTrigger value="concerning">Areas of Concern</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="positive" className="space-y-4">
                  {aiAnalysisResult.positiveIndicators.map((indicator, index) => (
                    <Card key={index} className="border-none shadow-sm bg-green-50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-base">{indicator.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">Reference range: {indicator.referenceRange}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-lg text-green-600">{indicator.value}</p>
                            {indicator.change && (
                              <div className="flex items-center mt-1 justify-end">
                                <span className={`text-xs ${indicator.change === 'increased' ? 'text-green-600' : indicator.change === 'decreased' ? 'text-amber-600' : 'text-gray-500'}`}>
                                  {indicator.changeAmount}
                                </span>
                                <span className="ml-1">
                                  {indicator.change === 'increased' && <ArrowRightIcon className="h-3 w-3 rotate-45 text-green-600" />}
                                  {indicator.change === 'decreased' && <ArrowRightIcon className="h-3 w-3 -rotate-45 text-amber-600" />}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="concerning" className="space-y-4">
                  {aiAnalysisResult.concerningIndicators.length === 0 ? (
                    <p className="text-center py-8 text-muted-foreground">No concerning indicators found</p>
                  ) : (
                    aiAnalysisResult.concerningIndicators.map((indicator, index) => (
                      <Card key={index} className="border-none shadow-sm bg-amber-50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-base">{indicator.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">Reference range: {indicator.referenceRange}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-lg text-amber-600">{indicator.value}</p>
                              {indicator.change && (
                                <div className="flex items-center mt-1 justify-end">
                                  <span className={`text-xs ${indicator.change === 'increased' ? 'text-amber-600' : indicator.change === 'decreased' ? 'text-green-600' : 'text-gray-500'}`}>
                                    {indicator.changeAmount}
                                  </span>
                                  <span className="ml-1">
                                    {indicator.change === 'increased' && <ArrowRightIcon className="h-3 w-3 rotate-45 text-amber-600" />}
                                    {indicator.change === 'decreased' && <ArrowRightIcon className="h-3 w-3 -rotate-45 text-green-600" />}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <Card className="border-none shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-3">Personalized Recommendations</h3>
                      <ul className="space-y-2">
                        {aiAnalysisResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start">
                            <span className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-xs mr-2 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-sm">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end">
                <Button onClick={() => setShowAnalysisResults(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Comparison Results Dialog */}
      <Dialog open={showComparisonResults} onOpenChange={setShowComparisonResults}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Health Reports Comparison</DialogTitle>
            <DialogDescription>
              Comparing {memberName}'s current and previous health reports
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-4">
            <div className="grid gap-4">
              {comparisonResults.map((result, index) => (
                <Card 
                  key={index} 
                  className={`border-none shadow-sm ${
                    result.change === 'improved' ? 'bg-green-50' : 
                    result.change === 'worsened' ? 'bg-amber-50' : 'bg-gray-50'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-base">{result.indicatorName}</h3>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Previous</p>
                          <p className="font-medium">{result.oldValue}</p>
                        </div>
                        <div className="flex items-center">
                          <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="font-medium">{result.newValue}</p>
                        </div>
                        <div className="text-right min-w-20">
                          <p className={`text-sm font-medium ${
                            result.change === 'improved' ? 'text-green-600' : 
                            result.change === 'worsened' ? 'text-amber-600' : 'text-gray-500'
                          }`}>
                            {result.changePercentage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setShowComparisonResults(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HealthReportUploader;
