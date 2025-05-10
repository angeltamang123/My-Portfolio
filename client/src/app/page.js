"use client";
import Background from "@/components/background";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import ScrollIndicator from "@/components/scrollIndicator";
import EducationsTimeline from "@/components/Timeline/educationTimeline";
import ExperiencesTimeline from "@/components/Timeline/experiencesTimeline";
import ProjectsTimeline from "@/components/Timeline/projectsTimeline";
import { motion } from "framer-motion";
import { ChevronDown, ChevronsDown } from "lucide-react";
import React from "react";

const page = () => {
  return (
    // We set the parent div z-10 as Background is at 0
    <div className="absolute flex flex-col items-center min-h-screen w-full z-10">
      {/* GridMotion background  */}
      <Background />

      {/* Navigation Bar   */}
      <NavigationBar />

      <ScrollIndicator />

      {/* Contents below the Navbar */}
      <div className="flex flex-col items-center bg-opacity-15 absolute w-full z-10 pointer-events-auto">
        {/* Introducion */}
        <div className="w-full flex flex-col grow justify-center items-center h-screen border-[#293431] mt-2 p-1">
          <div className="text-white text-left text-lg md:text-base font-black">
            Hello, I am <MyName className="text-white font-black" />.
          </div>
          <p className=" text-white text-left text-sm font-stretch-ultra-expanded">
            {" "}
            Full-Stack Development and Machine/Deep Learning is what intrigues
            me.
          </p>
        </div>

        {/* Projects 
        The w-full utility class is a must otherwise it won't appear straight.
        This is primarily due to the Timeline being wider than it's parent container
        */}
        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <ProjectsTimeline className=" w-full justify-center" />
          <ChevronsDown className="relative top-[50%] text-gray-300 opacity-30 " />
        </div>

        {/* Experiences */}

        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <ExperiencesTimeline className="w-full justify-center" />
          <ChevronsDown className="relative top-[50%] text-gray-300 opacity-30 " />
        </div>

        {/* Educations  */}
        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <EducationsTimeline className=" w-full items-start justify-center" />
        </div>
      </div>
    </div>
  );
};

export default page;
