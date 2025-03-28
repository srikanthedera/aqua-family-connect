
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropletIcon, UserIcon, AreaChartIcon, FileTextIcon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-24">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 md:mb-16">
          <div className="flex items-center">
            <DropletIcon className="h-8 w-8 text-primary mr-2" />
            <span className="font-semibold text-xl">Water Wellness</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={() => navigate("/login")} className="w-24">
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")} className="w-24">
              Sign Up
            </Button>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
                Smart Water Technology
              </div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Personalized Hydration for Your Entire Family
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Connect your smart water filter to track consumption, analyze health reports, and optimize hydration for each family member.
              </p>
              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="h-12 px-6 rounded-xl text-base"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </div>
            </div>

            <div className="relative h-[350px] md:h-[500px] animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-3xl backdrop-blur-sm z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/30 rounded-full filter blur-2xl animate-pulse z-0"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <DropletIcon className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Water Wellness</h3>
                    <p className="text-center text-muted-foreground text-sm">
                      Connect your device, set up your family profile, and start optimizing your hydration today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-32">
            <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-slide-up">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Family Profiles</h3>
                <p className="text-muted-foreground">
                  Create personalized profiles for up to 6 family members, each with their own pH preferences and tracking.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-slide-up delay-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <AreaChartIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hydration Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor water consumption with beautiful visualizations and get insights to improve hydration habits.
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] animate-slide-up delay-200">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileTextIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
                <p className="text-muted-foreground">
                  Upload health reports for AI analysis to optimize your water settings based on your health needs.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-24 py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <DropletIcon className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">Water Wellness</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 Water Wellness. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
