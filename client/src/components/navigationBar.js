"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { House } from "lucide-react";
import Link from "next/link";

import React from "react";
import PixelTransition from "./pixelTransition";

const NavigationBar = () => {
  return (
    <div className="flex border-1 border-[#293431] z-10 bg-[#151616] w-full h-14 relative">
      <NavigationMenu>
        <NavigationMenuList className="flex relative items-center justify-between w-full">
          <NavigationMenuItem className=" px-16 py-2 hover:scale-110">
            <Link href="/">
              <House />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" px-26 py-2 hover:scale-110">
            <Link href="/projects">
              <p className="text-white font-black">Projects</p>
            </Link>
          </NavigationMenuItem>

          {/* The picture Item in Navbar */}
          <NavigationMenuItem className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
            <PixelTransition
              firstContent={
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
                  alt="default pixel transition content, a cat!"
                  className="w-32 h-32 object-cover rounded-full"
                />
              }
              secondContent={
                <div className="w-32 h-32 bg-[#151616] rounded-full grid place-items-center">
                  <p className="font-black text-[1.5rem] text-white">Meow!</p>
                </div>
              }
              gridSize={12}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              className="custom-pixel-card rounded-full hover:shadow-lg hover:shadow-[#45AA96]"
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
