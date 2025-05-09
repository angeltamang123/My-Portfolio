"use client";
import Background from "@/components/background";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import ScrollIndicator from "@/components/scrollIndicator";
import EducationsTimeline from "@/components/Timeline/educationTimeline";
import ExperiencesTimeline from "@/components/Timeline/experiencesTimeline";
import ProjectsTimeline from "@/components/Timeline/projectsTimeline";
import { motion } from "framer-motion";
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
        <div className="w-full flex flex-col justify-center items-center h-screen border-[#293431] mt-2 p-1">
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
        <ProjectsTimeline className="h-screen w-full" />

        {/* Experiences */}
        <div className="w-full flex justify-end items-center bg-white">
          <ExperiencesTimeline className="h-screen w-full items-end max-w-sm" />
        </div>

        {/* Educations  */}
        <EducationsTimeline className="h-screen w-full" />
      </div>
    </div>
  );
};

export default page;
