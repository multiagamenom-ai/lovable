import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Download,
  User,
  BarChart3,
  LogIn,
  Zap,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const nav = [
  { title: "Início", url: "/", icon: Home },
  { title: "Downloads", url: "/downloads", icon: Download },
  { title: "Login", url: "/login", icon: LogIn },
  { title: "Área do Cliente", url: "/dashboard", icon: User },
  { title: "Painel Revenda", url: "/reseller", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-red shadow-red">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-bold tracking-tight">
              ROTEIRO
            </span>
            <span className="truncate text-[10px] font-medium uppercase tracking-widest text-primary">
              Infinito
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={item.url} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3 text-[11px] text-muted-foreground group-data-[collapsible=icon]:hidden">
        © 2026 Roteiro Infinito
      </SidebarFooter>
    </Sidebar>
  );
}
