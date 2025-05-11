"use client";
import React from "react";
import { useScroll, motion, useSpring } from "framer-motion";
import { useMediaQuery } from "@mui/material";

// The target prop is the ref to the container that contains the items to show scroll progress

const ScrollIndicator = ({ target }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ["start start", "end end"],
    layoutEffect: false, //  This makes useScroll use useEffect instead of useLayoutEffect internally, which runs after the browser has painted, ensuring the ref is hydrated.
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      id="scroll-indicator"
      className={`z-15 ${!isMobile && "mt-14"}`}
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        originX: 0,
        backgroundColor: "#45AA96",
      }}
    />
  );
};

export default ScrollIndicator;
