import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverTrigger } from "./ui/popover";
import MyName from "./myName";
import {
  Building,
  Building2,
  ChevronsUpDown,
  Github,
  House,
  Linkedin,
  Mail,
  Menu,
  Presentation,
  WineOff,
} from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppSidebar() {
  const pathName = usePathname();

  const activeClassName = "text-[#45AA96]";
  const inactiveClassName = "text-white";
  return (
    <Sidebar className=" dark ">
      <SidebarHeader className="bg-[#293431]">
        <SidebarTrigger className="ml-auto p-1 rounded-md text-white hover:bg-muted">
          <Menu className="w-5 h-5 " />
        </SidebarTrigger>
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-between gap-2 w-full rounded-md px-2 py-1 ">
              <Avatar className="h-14 w-14 ml-1.5">
                <AvatarImage src="/assets/me.jpeg" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <MyName type="Split Text" className="text-white" />
              <ChevronsUpDown className="ml-0 h-4 w-4 text-white" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="ml-65 w-30 p-2 space-y-2 border rounded text-white border-white bg-[#141616] active:delay-1000">
            <div
              className="flex items-center border-b-1 active:scale-95 active:text-teal-400 gap-2 cursor-pointer hover:opacity-75"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/angel-tamang-28438027a/",
                  "_blank"
                )
              }
            >
              <Linkedin className="w-4 h-4" /> Linkedin
            </div>
            <div
              className="flex items-center border-b-1 active:scale-95 active:text-teal-400 gap-2  cursor-pointer hover:opacity-75"
              onClick={() =>
                window.open("https://github.com/angeltamang123", "_blank")
              }
            >
              <Github className="w-4 h-4" /> Github
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-75"
              onClick={() =>
                window.open(
                  "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=cm&to=tamangangel2057@gmail.com",
                  "_blank"
                )
              }
            >
              <Mail className="w-4 h-4" /> E-mail
            </div>
          </PopoverContent>
        </Popover>
      </SidebarHeader>
      <SidebarContent className="bg-[#293431] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 font-black">
            Navigate
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton
                    className={cn(
                      inactiveClassName,
                      pathName === "/" && activeClassName,
                      "active:scale-105"
                    )}
                  >
                    <House />
                    <span>Home</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/projects">
                  <SidebarMenuButton
                    className={cn(
                      inactiveClassName,
                      pathName === "/projects" && activeClassName,
                      "active:scale-105"
                    )}
                  >
                    <Presentation />
                    <span>Projects</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/experiences">
                  <SidebarMenuButton
                    className={cn(
                      inactiveClassName,
                      pathName === "/experiences" && activeClassName,
                      "active:scale-105"
                    )}
                  >
                    <Building2 />
                    <span>Experiences</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/educations">
                  <SidebarMenuButton
                    className={cn(
                      inactiveClassName,
                      pathName === "/educations" && activeClassName,
                      "active:scale-105"
                    )}
                  >
                    <Building />
                    <span>Educations</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
