"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/supportingComponents/navigation-menu";
import { House } from "lucide-react";
import Link from "next/link";

import React from "react";
import PixelTransition from "./pixelTransition";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NavigationBar = () => {
  const pathName = usePathname();

  const activeClassName = "text-[#45AA96]";
  const inactiveClassName = "text-white";

  return (
    <div className="fixed h-14 w-full z-20">
      <NavigationMenu className="relative border-b-1 flex border-[#293431] z-20 bg-[#151616] flex-row flex-nowrap md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 items-center justify-between h-14 w-screen">
        <NavigationMenuList className="justify-self-start px-10 space-x-12 large-tablets:px-16 large-tablets:space-x-16 lg:px-20 lg:space-x-24 xl:px-30 xl:space-x-36 ">
          <NavigationMenuItem className=" hover:scale-110 active:scale-95 ">
            <Link href="/">
              <House
                className={cn(
                  inactiveClassName,
                  pathName === "/" && activeClassName
                )}
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/projects">
              <h1
                className={cn(
                  inactiveClassName,
                  "text-white antialiased ml-10 transition-all duration-150 shadow-none font-black hover:scale-110 hover:shadow-white active:scale-95",
                  pathName === "/projects" && activeClassName
                )}
              >
                Projects
              </h1>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="justify-self-center absolute left-1/2 -translate-x-1/2 -top-16">
          {/* The picture Item in Navbar */}
          <NavigationMenuItem>
            <PixelTransition
              firstContent={
                <Image
                  src="/assets/me.jpeg"
                  alt="Me!"
                  width={128}
                  height={128}
                  loading="eager"
                  priority
                  className="object-cover rounded-full"
                />
              }
              secondContent={
                <div className="w-32 h-32 bg-[#151616] rounded-full grid place-items-center">
                  <p className="font-black text-[1.5rem] text-white">Hello!</p>
                </div>
              }
              gridSize={12}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              className="custom-pixel-card rounded-full w-32 h-32 hover:shadow-lg hover:shadow-[#45AA96]"
            />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="justify-self-end px-10 space-x-12 large-tablets:px-16 large-tablets:space-x-16 lg:px-20 lg:space-x-24 xl:px-30 xl:space-x-36 ">
          <NavigationMenuItem>
            <Link href="/experiences">
              <h1
                className={cn(
                  inactiveClassName,
                  "text-white antialiased transition-all duration-150 shadow-none font-black hover:scale-110 hover:shadow-white active:scale-95",
                  pathName === "/experiences" && activeClassName
                )}
              >
                Experiences
              </h1>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/educations">
              <h1
                className={cn(
                  inactiveClassName,
                  "text-white antialiased transition-all duration-150 shadow-none font-black hover:scale-110 hover:shadow-white active:scale-95",
                  pathName === "/educations" && activeClassName
                )}
              >
                Educations
              </h1>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
