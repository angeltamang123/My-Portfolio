"use client";
import Background from "@/components/background";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import { useScroll, motion } from "framer-motion";
import React from "react";

const page = () => {
  const { scrollYProgress } = useScroll();
  return (
    // We set the parent div z-10 as Background is at 0
    <div className="absolute flex flex-col items-center min-h-screen w-screen z-10">
      {/* GridMotion background  */}
      <Background />

      {/* Navigation Bar   */}
      <NavigationBar />

      <motion.div
        id="scroll-indicator"
        className="z-15 mt-14"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#45AA96",
        }}
      />

      {/* Contents below the Navbar */}
      <div className="flex flex-col items-center grow bg-opacity-15 absolute w-11/12 z-10 pointer-events-auto">
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
      </div>
    </div>
  );
};

export default page;
