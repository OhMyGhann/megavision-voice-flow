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
        <Routes>
          <Route path="/" element={
            <CrmLayout>
              <AgentDesktop />
            </CrmLayout>
          } />
          <Route path="/agent" element={
            <CrmLayout>
              <AgentDesktop />
            </CrmLayout>
          } />
          <Route path="/cdr" element={
            <CrmLayout>
              <CDRExplorer />
            </CrmLayout>
          } />
          <Route path="/recordings" element={
            <CrmLayout>
              <Recordings />
            </CrmLayout>
          } />
          <Route path="/spv" element={
            <CrmLayout>
              <SupervisorWallboard />
            </CrmLayout>
          } />
          <Route path="/numbers-pool" element={
            <CrmLayout>
              <NumbersPool />
            </CrmLayout>
          } />
          <Route path="/campaigns" element={
            <CrmLayout>
              <Campaigns />
            </CrmLayout>
          } />
          <Route path="/leads/:id" element={
            <CrmLayout>
              <LeadDetail />
            </CrmLayout>
          } />
          <Route path="/settings/roles" element={
            <CrmLayout>
              <RolesPermissions />
            </CrmLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
