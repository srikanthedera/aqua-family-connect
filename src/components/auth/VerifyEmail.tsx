
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { CheckCircle2Icon, MailIcon } from "lucide-react";

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      toast.error("Please enter the verification code");
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Simulating API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsVerified(true);
      toast.success("Email successfully verified!");
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      // Simulating API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("A new verification code has been sent to your email");
    } catch (error) {
      console.error("Resend code error:", error);
      toast.error("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle2Icon className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="text-2xl font-medium text-center mb-2">Email Verified</h1>
        <p className="text-muted-foreground text-center mb-6">
          Your email has been successfully verified!
        </p>
        <p className="text-center text-muted-foreground mb-6">
          You'll be redirected to login shortly...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <MailIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-medium text-center mb-2">Verify your email</h1>
        <p className="text-muted-foreground text-center">
          We've sent a verification code to <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-2">
            Verification Code
          </label>
          <Input
            id="code"
            type="text"
            placeholder="Enter 6-digit code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl text-base"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </Button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-muted-foreground">
          Didn't receive the code?{" "}
          <Button 
            variant="link" 
            className="p-0" 
            onClick={handleResendCode}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend code"}
          </Button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
