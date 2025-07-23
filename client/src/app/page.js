"use client";
import Background from "@/components/background";
import MyName from "@/components/myName";
import ScrollIndicator from "@/components/scrollIndicator";
import EducationsTimeline from "@/components/Timeline/educationTimeline";
import ExperiencesTimeline from "@/components/Timeline/experiencesTimeline";
import ProjectsTimeline from "@/components/Timeline/projectsTimeline";
import { motion } from "framer-motion";
import { ChevronDown, ChevronsDown } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    // We set the parent div z-10 as Background is at 0
    <div className="flex flex-col items-center w-full z-10">
      {/* GridMotion background  */}
      <Background />

      <ScrollIndicator />

      {/* Contents below the Navbar */}
      <div className="flex flex-col items-center bg-opacity-15 w-full z-10 pointer-events-auto overflow-x-hidden">
        {/* Introducion */}
        <motion.div
          className="w-full flex flex-col grow justify-center items-center h-screen border-[#293431] md:mt-2 p-1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: ["easeIn", "easeOut"],
            type: "tween",
          }}
        >
          <div className="text-white text-left text-lg md:text-base font-black">
            Hello, I am{" "}
            <MyName className="text-white font-black" type="Split Text" />.
          </div>
          <p className=" text-white text-left text-sm font-stretch-ultra-expanded">
            {" "}
            Full-Stack Development and Machine/Deep Learning is what intrigues
            me.
          </p>
        </motion.div>

        {/* Projects 
        The w-full utility class is a must otherwise it won't appear straight.
        This is primarily due to the Timeline being wider than it's parent container
        */}
        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <ProjectsTimeline className=" w-full justify-center overflow-hidden" />
          <ChevronsDown className="relative top-[50%] text-gray-300 opacity-30 w-full" />
        </div>

        {/* Experiences */}

        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <ExperiencesTimeline className="w-full justify-center" />
          <ChevronsDown className="relative top-[50%] text-gray-300 opacity-30  w-full" />
        </div>

        {/* Educations  */}
        <div className="min-h-screen w-full flex flex-col grow justify-center items-center ">
          <EducationsTimeline className=" w-full items-start justify-center" />
        </div>
      </div>
    </div>
  );
};

export default Page;
