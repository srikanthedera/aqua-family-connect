
import React, { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropletIcon, 
  HomeIcon, 
  FileTextIcon, 
  SettingsIcon, 
  UserIcon,
  MenuIcon,
  XIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: HomeIcon, label: "Dashboard", path: "/dashboard" },
    { icon: DropletIcon, label: "Hydration", path: "/hydration" },
    { icon: FileTextIcon, label: "Health Reports", path: "/health-reports" },
    { icon: UserIcon, label: "Family Profile", path: "/family-profile" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" }
  ];
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  const MobileNavigation = () => (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 border-r border-border/50">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DropletIcon className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Water Wellness</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant={isActivePath(item.path) ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start h-10 px-3 rounded-lg",
                      isActivePath(item.path) 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    )}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center space-x-3 p-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <UserIcon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  const DesktopNavigation = () => (
    <div className="hidden md:flex flex-col h-full w-64 border-r border-border/50 fixed">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <DropletIcon className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">Water Wellness</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Button
                variant={isActivePath(item.path) ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3 rounded-lg",
                  isActivePath(item.path) 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center space-x-3 p-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <UserIcon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-muted-foreground">john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {isMobile ? <MobileNavigation /> : <DesktopNavigation />}
      
      <main className={cn(
        "flex-1 overflow-y-auto transition-all",
        isMobile ? "w-full" : "md:pl-64"
      )}>
        <div className="min-h-screen p-4 md:p-8">
          {/* Add additional padding to create space for the mobile menu button */}
          {isMobile && <div className="h-14" />}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
