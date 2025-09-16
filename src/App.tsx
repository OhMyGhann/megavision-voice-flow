import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CrmLayout } from "@/components/layout/crm-layout";

// Pages
import AgentDesktop from "./pages/AgentDesktop";
import CDRExplorer from "./pages/CDRExplorer";
import Recordings from "./pages/Recordings";
import SupervisorWallboard from "./pages/SupervisorWallboard";
import NumbersPool from "./pages/NumbersPool";
import Campaigns from "./pages/Campaigns";
import LeadDetail from "./pages/LeadDetail";
import RolesPermissions from "./pages/RolesPermissions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CrmLayout>
          <Routes>
            <Route path="/" element={<AgentDesktop />} />
            <Route path="/agent" element={<AgentDesktop />} />
            <Route path="/cdr" element={<CDRExplorer />} />
            <Route path="/recordings" element={<Recordings />} />
            <Route path="/spv" element={<SupervisorWallboard />} />
            <Route path="/numbers-pool" element={<NumbersPool />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/settings/roles" element={<RolesPermissions />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CrmLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
