"use client";

import { useMediaQuery } from "@mui/material";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Menu } from "lucide-react";

export default function MobileAwareLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <SidebarProvider>
        <SidebarTrigger className="fixed top-4 left-4 z-50 rounded-xl bg-white/80 backdrop-blur-md shadow-lg p-2 hover:bg-white transition-all duration-300">
          <Menu className="h-6 w-6 text-gray-800" />
        </SidebarTrigger>
        <AppSidebar />
        <main>{children}</main>
        <Toaster />
      </SidebarProvider>
    );
  }

  return (
    <div>
      <main>{children}</main>
      <Toaster />
    </div>
  );
}
