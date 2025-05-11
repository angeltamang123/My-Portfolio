"use client";
import Background from "@/components/background";
import Footer from "@/components/footer";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import ScrollIndicator from "@/components/scrollIndicator";
import { AppSidebar } from "@/components/sidebar";
import EducationsTimeline from "@/components/Timeline/educationTimeline";
import ExperiencesTimeline from "@/components/Timeline/experiencesTimeline";
import ProjectsTimeline from "@/components/Timeline/projectsTimeline";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { ChevronDown, ChevronsDown } from "lucide-react";
import React from "react";

const page = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    // We set the parent div z-10 as Background is at 0
    <div className="absolute flex flex-col grow items-center min-h-screen w-full z-10">
      {/* GridMotion background  */}
      <Background />

      {/* Navigation Bar or sidebar  */}
      {!isMobile && <NavigationBar />}

      <ScrollIndicator />

      {/* Contents below the Navbar */}
      <div className="flex flex-col items-center bg-opacity-15 relative w-full z-10 scale-95 md:scale-100 pointer-events-auto overflow-x-hidden">
        {/* Introducion */}
        <motion.div
          className="w-full flex flex-col grow justify-center items-center h-screen border-[#293431] mt-2 p-1"
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
      {!isMobile && <Footer />}
    </div>
  );
};

export default page;
