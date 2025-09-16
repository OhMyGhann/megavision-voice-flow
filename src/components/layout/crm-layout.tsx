import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useAgentStore } from "@/lib/stores/agent-store";
import { useEffect } from "react";
import { StatusChip } from "@/components/ui/status-chip";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

interface CrmLayoutProps {
  children: React.ReactNode;
}

export function CrmLayout({ children }: CrmLayoutProps) {
  const { currentAgent, setCurrentAgent } = useAgentStore();

  // Initialize with mock agent for demo
  useEffect(() => {
    if (!currentAgent) {
      setCurrentAgent({
        id: 'agent-001',
        name: 'Agent Demo',
        email: 'agent@megavision.id',
        status: 'Available',
        role: 'Agent',
        loginTime: new Date()
      });
    }
  }, [currentAgent, setCurrentAgent]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Top Header Bar */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-border" />
            
            {/* Current Agent Info */}
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-h3 font-semibold text-foreground">
                  Megavision Outbound CRM
                </h2>
              </div>
              
              {currentAgent && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <StatusChip status={currentAgent.status} />
                    <span className="text-sm font-medium text-foreground">
                      {currentAgent.name}
                    </span>
                  </div>
                  
                  <ThemeToggle />
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <LogOut className="h-4 w-4" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </div>
              )}
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 space-y-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}