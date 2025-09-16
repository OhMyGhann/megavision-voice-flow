import { 
  Phone, 
  Database, 
  Mic, 
  Monitor, 
  Hash, 
  Target, 
  User, 
  Settings,
  ChevronRight,
  Building
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAgentStore } from "@/lib/stores/agent-store";
import { StatusChip } from "@/components/ui/status-chip";

const mainNavItems = [
  { 
    title: "Desktop Agent", 
    url: "/agent", 
    icon: Phone,
    description: "Panel telepon & workbench lead" 
  },
  { 
    title: "CDR Explorer", 
    url: "/cdr", 
    icon: Database,
    description: "Riwayat panggilan & laporan" 
  },
  { 
    title: "Rekaman", 
    url: "/recordings", 
    icon: Mic,
    description: "Review & playback rekaman" 
  },
  { 
    title: "Wallboard SPV", 
    url: "/spv", 
    icon: Monitor,
    description: "Dashboard supervisor" 
  },
];

const managementNavItems = [
  { 
    title: "Numbers Pool", 
    url: "/numbers-pool", 
    icon: Hash,
    description: "Kelola pool Caller ID" 
  },
  { 
    title: "Campaign", 
    url: "/campaigns", 
    icon: Target,
    description: "Manajemen kampanye" 
  },
];

const settingsNavItems = [
  { 
    title: "Roles & Permissions", 
    url: "/settings/roles", 
    icon: Settings,
    description: "Pengaturan akses pengguna" 
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentAgent } = useAgentStore();
  
  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => currentPath === path;
  
  const getNavClasses = (active: boolean) => 
    `flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-accent/50 ${
      active 
        ? "bg-primary/10 text-primary font-medium border border-primary/20" 
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} border-r bg-card`} collapsible="icon">
      <SidebarContent className="px-3 py-4">
        {/* Header with Logo */}
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="flex-shrink-0">
            <Building className="h-8 w-8 text-primary" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-h3 text-foreground">Megavision CRM</h1>
              <p className="text-caption text-muted-foreground">Outbound Calling</p>
            </div>
          )}
        </div>

        {/* Agent Status */}
        {currentAgent && (
          <div className={`mb-4 px-2 ${isCollapsed ? "flex justify-center" : ""}`}>
            {isCollapsed ? (
              <div className="w-2 h-2 rounded-full bg-green-500" title={currentAgent.status} />
            ) : (
              <div className="card-agent-desktop p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-caption font-medium text-muted-foreground">Status</span>
                  <StatusChip status={currentAgent.status} />
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {currentAgent.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentAgent.email}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                      title={isCollapsed ? `${item.title} - ${item.description}` : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span>{item.title}</span>
                        </div>
                      )}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Manajemen
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                      title={isCollapsed ? `${item.title} - ${item.description}` : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span>{item.title}</span>
                        </div>
                      )}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Pengaturan
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavClasses(isActive(item.url))}
                      title={isCollapsed ? `${item.title} - ${item.description}` : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <span>{item.title}</span>
                        </div>
                      )}
                      {!isCollapsed && isActive(item.url) && (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      {/* Sidebar Toggle at bottom */}
      <div className="mt-auto p-3">
        <SidebarTrigger className="w-full justify-center" />
      </div>
    </Sidebar>
  );
}