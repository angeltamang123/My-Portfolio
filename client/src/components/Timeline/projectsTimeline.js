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

const ProjectsTimeline = ({ className }) => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/projects`
      );
      setProjects(response.data);
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
        duration: 0.5,
        staggerChildren: 0.3, // Delay between each child animation
        delayChildren: 0.2, // Initial delay before starting animations
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
            <Skeleton className="h-6 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Skeleton className="h-6 w-full rounded" />
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
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
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
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
            <TimelineContent className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: {
                    x:
                      checkProjectType(project.projectType) === "left"
                        ? 100
                        : -100,
                    opacity: 0,
                  },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      duration: 0.5,
                    },
                  },
                }}
                onClick={() =>
                  router.push(`/projects?highlight=${project._id}`)
                }
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 mb-6"
              >
                <div className="h-1.5 bg-gradient-to-r from-teal-600 to-emerald-600"></div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {project.projectDetails}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    {project.status && (
                      <Badge
                        variant="outline"
                        className="bg-teal-50 text-teal-700 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800/30"
                      >
                        {project.status}
                      </Badge>
                    )}
                    {!project.status && !project.projectLinks?.length && (
                      <div></div> // Empty div to maintain flex justify-between
                    )}
                    {project.projectLinks &&
                      project.projectLinks.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.projectLinks.map((link, idx) => (
                            <a
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
                            </a>
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
