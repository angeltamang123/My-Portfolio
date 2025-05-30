"use client";
import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { MapPin, School } from "lucide-react";
import { Badge } from "../ui/badge";

const EducationsTimeline = ({ className }) => {
  const router = useRouter();
  const [educations, setEducations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEducations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/educations`);
      // Sort educations to show most recent (null endDate) at the top
      const sortedEducations = [...response.data].sort((a, b) => {
        // If a has null endDate, it should come first
        if (!a.endDate && b.endDate) return -1;
        // If b has null endDate, it should come first
        if (a.endDate && !b.endDate) return 1;
        // Otherwise sort by startDate (most recent first)
        return new Date(b.startDate) - new Date(a.startDate);
      });
      setEducations(sortedEducations);
    } catch (err) {
      toast.error("Failed to load educations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.1,
        staggerChildren: 0.1, // Delay between each child animation
        delayChildren: 0.05, // Initial delay before starting animations
      },
    },
  };

  if (isLoading) {
    return (
      <Timeline position="right" className={`${className} overflow-hidden`}>
        <TimelineItem className="w-full absolute -translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="w-full absolute -translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="w-full absolute -translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  }

  return (
    <motion.div
      className={`${className} overflow-visible md:overflow-hidden `}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <Timeline position="right">
        {educations.map((education, index) => (
          <TimelineItem
            key={education._id}
            className="w-full absolute -translate-x-[50%]"
          >
            <TimelineSeparator>
              <TimelineDot
                className="bg-gradient-to-r from-teal-600 to-emerald-600 shadow-md"
                sx={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <School className="h-4 w-4 text-white" />
              </TimelineDot>
              {index < educations.length - 1 && (
                <TimelineConnector className="bg-gradient-to-b from-teal-600 to-teal-600/20" />
              )}
            </TimelineSeparator>
            <TimelineContent className="overflow-hidden translate-x-[50%] md:translate-x-0 scale-x-200 md:scale-x-100">
              <motion.div
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      duration: 0.1,
                    },
                  },
                }}
                onClick={() =>
                  router.push(`/educations?highlight=${education._id}`)
                }
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 mb-6"
              >
                <div className="h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
                <div className="p-4 scale-x-50 -translate-x-12 normal-phones:scale-x-60 normal-phones:-translate-x-10 lg-phones:-translate-x-0 lg-phones:scale-x-100 w-50 lg-phones:w-full">
                  <h3 className="font-bold text-gray-900 text-xs md:text-lg dark:text-white antialiased">
                    {education.educationName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm  mt-1 antialiased">
                    {education.educationDetails}
                  </p>
                  <div className="flex fkex-nowrap md:flex-wrap gap-3 mt-3">
                    {education.educationOrganization && (
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 antialiased">
                        <MapPin className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{education.educationOrganization}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-3  translate-x-8 lg-phones:translate-x-0">
                    <Badge
                      variant="outline"
                      className="bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30 scale-70 md:scale-100"
                    >
                      {education.endDate ? "Completed" : "Current"}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </motion.div>
  );
};

export default EducationsTimeline;
