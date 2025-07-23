"use client";

import { useMediaQuery } from "@mui/material";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Menu } from "lucide-react";
import NavigationBar from "./navigationBar";
import Footer from "./footer";
import { useEffect, useState } from "react";

export default function MobileAwareLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavigationBar className="hidden md:block" />
        <main className="flex flex-col flex-grow">{children}</main>
        <Footer className="hidden md:block" />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? (
        <SidebarProvider>
          <SidebarTrigger className="fixed top-4 left-4 z-50 rounded-xl bg-white/80 backdrop-blur-md shadow-lg p-2 hover:bg-white transition-all duration-300">
            <Menu className="h-6 w-6 text-gray-800" />
          </SidebarTrigger>
          <AppSidebar />
          <NavigationBar className="hidden md:block" />
          <main className="flex flex-col flex-grow">{children}</main>
          <Footer className="hidden md:block" />
          <Toaster />
        </SidebarProvider>
      ) : (
        <>
          <NavigationBar className="hidden md:block" />
          <main className="flex flex-col flex-grow">{children}</main>
          <Footer className="hidden md:block" />
          <Toaster />
        </>
      )}
    </div>
  );
}
