import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FamilyProvider } from "./contexts/FamilyContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import CreateFamilyProfilePage from "./pages/CreateFamilyProfilePage";
import Dashboard from "./pages/Dashboard";
import Hydration from "./pages/Hydration";
import HealthReports from "./pages/HealthReports";
import FamilyProfile from "./pages/FamilyProfile";
import Settings from "./pages/Settings";
import ConnectDevice from "./pages/ConnectDevice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FamilyProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/create-family-profile" element={<CreateFamilyProfilePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hydration" element={<Hydration />} />
            <Route path="/health-reports" element={<HealthReports />} />
            <Route path="/family-profile" element={<FamilyProfile />} />
            <Route path="/connect-device" element={<ConnectDevice />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FamilyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
