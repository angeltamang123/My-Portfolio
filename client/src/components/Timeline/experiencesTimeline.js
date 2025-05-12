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
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Briefcase, Building } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const ExperiencesTimeline = ({ className }) => {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/experiences`);
      // Sort experiences to show most recent (null endDate) at the top
      const sortedExperiences = [...response.data].sort((a, b) => {
        // If a has null endDate, it should come first
        if (!a.endDate && b.endDate) return -1;
        // If b has null endDate, it should come first
        if (a.endDate && !b.endDate) return 1;
        // Otherwise sort by startDate (most recent first)
        return new Date(b.startDate) - new Date(a.startDate);
      });
      setExperiences(sortedExperiences);
    } catch (err) {
      toast.error("Failed to load experiences.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.3, // Delay between each child animation
        delayChildren: 0.2, // Initial delay before starting animations
      },
    },
  };

  if (isLoading) {
    return (
      <Timeline position="left" className={`${className} overflow-hidden`}>
        <TimelineItem className="w-full absolute translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-6 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="w-full absolute translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-6 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem className="w-full absolute translate-x-[50%]">
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-6 w-full rounded" />
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
    >
      <Timeline position="left">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={index}
            className="w-full absolute translate-x-[50%]"
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
                <Briefcase className="h-4 w-4 text-white" />
              </TimelineDot>
              {index < experiences.length - 1 && (
                <TimelineConnector className="bg-gradient-to-b from-teal-600 to-teal-600/20" />
              )}
            </TimelineSeparator>
            <TimelineContent className="overflow-hidden translate-x-[-50%] md:translate-x-0 scale-x-200 md:scale-x-100">
              <motion.div
                variants={{
                  hidden: { x: 20, opacity: 0 },
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
                  router.push(`/experiences?highlight=${experience._id}`)
                }
                className=" bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 mb-6 "
              >
                <div className="h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
                <div className="p-2 md:p-4 scale-x-60 -translate-x-6 md:-translate-x-0 md:scale-x-100 w-50 md:w-full ">
                  <div className="flex flex-nowrap md:flex-wrap justify-end gap-2 mb-2">
                    {Array.isArray(experience.experienceName) ? (
                      experience.experienceName.map((name, idx) => (
                        <div key={idx} className="flex items-center">
                          {idx > 0 && (
                            <Separator
                              orientation="vertical"
                              className="mx-2 h-4 bg-gray-900"
                            />
                          )}
                          <span className="font-bold text-gray-900 text-xs md:text-lg antialiased dark:text-white">
                            {name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="font-bold text-gray-900 text-xs antialiased dark:text-white">
                        {experience.experienceName}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs antialiased md:text-sm mt-1">
                    {experience.experienceDetails}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {experience.experienceOrganization && (
                      <div className="flex items-center gap-1 text-xs antialiased text-gray-500 dark:text-gray-400">
                        <Building className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                        <span>{experience.experienceOrganization}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-3">
                    <Badge
                      variant="outline"
                      className="bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30 scale-70 md:scale-100"
                    >
                      {experience.endDate ? "Past" : "Current"}
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

export default ExperiencesTimeline;
