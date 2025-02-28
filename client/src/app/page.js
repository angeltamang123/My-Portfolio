"use client";
import Background from "@/components/background";
import NavigationBar from "@/components/navigationBar";
import React from "react";

const page = () => {
  return (
    // We set the parent div z-10 as Backgroud is at 0
    <div className="relative flex flex-col min-h-screen w-screen z-10 overflow-hidden">
      {/* GridMotion background  */}
      <Background />

      {/* Navigation Bar   */}
      <NavigationBar />
      <div className="flex justify-center items-center relative z-10 p-8 pointer-events-auto">
        <h1 className="text-white text-4xl font-bold mb-8 pointer-events-auto">
          Main Content
        </h1>
      </div>
    </div>
  );
};

export default page;
