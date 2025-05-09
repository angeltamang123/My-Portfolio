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

  return (
    <Timeline position="right" className={`${className}`}>
      {projects.map((project, index) =>
        index < projects.length - 1 ? (
          <TimelineItem
            key={project._id}
            position={`${checkProjectType(project.projectType)}`}
          >
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div
                onClick={() =>
                  router.push(`/projects?highlight=${project._id}`)
                }
                className="bg-gray-300 border rounded cursor-pointer"
              >
                <p>{project.projectName}</p>
                <p>{project.projectDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ) : (
          <TimelineItem
            key={project._id}
            position={`${checkProjectType(project.projectType)}`}
          >
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              {" "}
              <div
                onClick={() =>
                  router.push(`/projects?highlight=${project._id}`)
                }
                className="bg-gray-300 border rounded cursor-pointer"
              >
                <p>{project.projectName}</p>
                <p>{project.projectDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        )
      )}
    </Timeline>
  );
};

export default ProjectsTimeline;
