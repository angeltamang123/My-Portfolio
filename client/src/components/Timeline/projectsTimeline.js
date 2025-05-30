"use client";
import React, { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Bot, Code, ExternalLink, Github, Globe } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ProjectsTimeline = ({ className }) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/projects`);

      const projectsToSort = [...response.data];

      const sortedProjects = projectsToSort.sort((a, b) => {
        const dateA = new Date(a.lastUpdated);
        const dateB = new Date(b.lastUpdated);
        return dateB - dateA;
      });

      setProjects(sortedProjects);
    } catch (err) {
      toast.error("Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const checkProjectType = (projectType) => {
    // Returns left if the project type is AI/ML
    return projectType === "AI/ML" ? "left" : "right";
  };

  // Get icon based on project type
  const getProjectIcon = (projectType) => {
    if (!projectType) return <Code className="h-4 w-4 text-white" />;

    switch (projectType) {
      case "AI/ML":
        return <Bot className="h-4 w-4 text-white" />;
      case "Web Development":
        return <Globe className="h-4 w-4 text-white" />;
      default:
        return <Code className="h-4 w-4 text-white" />;
    }
  };

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.1,
        staggerChildren: 0.1, // Delay between each child animation
        delayChildren: 0.05, // Initial delay before starting animations
      },
    },
  };

  if (isLoading) {
    return (
      <Timeline position="alternate" className={`${className} overflow-hidden`}>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-30 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
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
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.1 }}
      className={`${className}`}
    >
      <Timeline position="right">
        {projects.map((project, index) => (
          <TimelineItem
            key={project._id || index}
            position={checkProjectType(project.projectType)}
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
                {getProjectIcon(project.projectType)}
              </TimelineDot>
              {index < projects.length - 1 && (
                <TimelineConnector className="bg-gradient-to-b from-teal-600 to-teal-600/20" />
              )}
            </TimelineSeparator>
            <TimelineContent className="overflow-x-hidden overflow-y-visible">
              <motion.div
                variants={{
                  hidden: {
                    x:
                      checkProjectType(project.projectType) === "left"
                        ? 20
                        : -20,
                    opacity: 0,
                  },
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
                  router.push(`/projects?highlight=${project._id}`)
                }
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full overflow-x-hidden border border-gray-100 dark:border-gray-700 mb-6"
              >
                <div className="h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
                <div className="p-1 md:p-4">
                  <h3 className="font-bold text-sm md:text-lg antialiased text-gray-900 dark:text-white">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm antialised mt-0.5 md:mt-1">
                    {project.projectDetails}
                  </p>
                  <div
                    className={cn(
                      "flex flex-col justify-between gap-1 md:mt-3",
                      checkProjectType(project.projectType) === "left"
                        ? "items-start"
                        : "items-end"
                    )}
                  >
                    <div
                      className={cn(
                        "flex md:gap-1 w-full ",
                        checkProjectType(project.projectType) === "left"
                          ? "justify-end"
                          : "justify-start"
                      )}
                    >
                      {project.status && (
                        <Badge
                          variant="outline"
                          className={cn(
                            "bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30 scale-50 md:scale-100",
                            checkProjectType(project.projectType) === "left"
                              ? "translate-x-4.5 md:translate-x-0"
                              : "-translate-x-4.5 md:-translate-x-0"
                          )}
                        >
                          {project.status}
                        </Badge>
                      )}
                      {project.status === "In-Progress" && (
                        <Image
                          src="/assets/cook.png"
                          alt="Let Him Cook"
                          height={24}
                          width={24}
                          className={cn(
                            " scale-50 md:scale-100",
                            checkProjectType(project.projectType) === "left"
                              ? ""
                              : "-translate-x-9 md:-translate-x-0"
                          )}
                        />
                      )}
                    </div>
                    {!project.status && !project.projectLinks?.length && (
                      <div></div> // Empty div to maintain flex justify-between
                    )}
                    {project.projectLinks &&
                      project.projectLinks.length > 0 && (
                        <div
                          className={cn(
                            "flex flex-wrap md:flex-nowrap scale-70 md:scale-100 gap-2",
                            checkProjectType(project.projectType) === "left"
                              ? "-translate-x-1 md:-translate-x-0 justify-start"
                              : "translate-x-1 md:translate-x-0 justify-end"
                          )}
                        >
                          {project.projectLinks.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors border border-teal-100 dark:border-teal-800/30"
                            >
                              {link.name.toLowerCase().includes("github") ? (
                                <Github className="h-3 w-3" />
                              ) : (
                                <ExternalLink className="h-3 w-3" />
                              )}
                              <span>{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
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

export default ProjectsTimeline;
