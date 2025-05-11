"use client";
import React from "react";
import SplitText from "./supportingComponents/splitText";
import FuzzyText from "./supportingComponents/fuzzyText";

const MyName = ({ className, type }) => {
  if (type === "Split Text") {
    return (
      <SplitText
        text="Angel Tamang"
        className={`${className} text-lg font-semibold text-center`}
        delay={150}
        animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
        animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        easing="easeOutCubic"
        threshold={0.2}
        rootMargin="-50px"
      />
    );
  }

  return (
    <FuzzyText baseIntensity={0.01} hoverIntensity={20} fontSize="1rem">
      Angel Tamang
    </FuzzyText>
  );
};

export default MyName;
