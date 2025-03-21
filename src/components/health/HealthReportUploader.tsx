
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileIcon, UploadIcon, FileTextIcon, XIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

interface HealthReportUploaderProps {
  familyMemberId: number;
  memberName: string;
}

const HealthReportUploader: React.FC<HealthReportUploaderProps> = ({
  familyMemberId,
  memberName,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleRemoveFile = () => {
    setSelectedFile(null);
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
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsAnalyzing(false);
    setSelectedFile(null);
    
    toast.success("Health report analyzed successfully", {
      description: "Results saved to your profile"
    });
  };

  return (
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
          <div className="space-y-3">
            <p className="text-sm font-medium">Selected File</p>
            <SelectedFile file={selectedFile} onRemove={handleRemoveFile} />
          </div>
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
        <CardFooter>
          <Button onClick={handleUpload} className="w-full">
            Upload & Analyze
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default HealthReportUploader;
