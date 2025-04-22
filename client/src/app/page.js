"use client";
import Background from "@/components/background";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import React from "react";

const page = () => {
  return (
    // We set the parent div z-10 as Background is at 0
    <div className="absolute flex flex-col items-center min-h-screen w-screen z-10">
      {/* GridMotion background  */}
      <Background />

      {/* Navigation Bar   */}
      <NavigationBar />

      {/* Contents below the Navbar */}
      <div className="flex flex-col items-center border border-[#293431] border-t-0 grow bg-[#151616] opacity-99 relative w-11/12 z-10 p-10 pointer-events-auto">
        <MyName className="mt-2 text-white font-black" />
        <div className="w-full border border-l-0 border-r-0 border-[#293431] mt-2 p-1">
          <p className="text-white text-left text-sm md:text-base mt-2 font-black">
            Hello, I am Angel.
          </p>
          <p className=" text-white text-left text-sm md:text-base font-black">
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
