"use client";
import Background from "@/components/background";
import ProjectCard from "@/components/cards/projectCard";

import NavigationBar from "@/components/navigationBar";
import ScrollIndicator from "@/components/scrollIndicator";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";

import { toast } from "sonner";

const Projects = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const scrollRef = useRef();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Highlight if clicked from landing page
  const [highlightedProjectId, setHighlightedProjectId] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const highlightIdFromQuery = searchParams.get("highlight");
    if (highlightIdFromQuery) {
      setHighlightedProjectId(highlightIdFromQuery);

      // Scroll to the element after a short delay to ensure it's rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(highlightIdFromQuery);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          // Reset highlight after animation
          setTimeout(() => {
            setHighlightedProjectId(null);
          }, 1000);
        } else {
          console.warn(
            `Element with ID ${highlightIdFromQuery} not found for scrolling.`
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [searchParams, projects]);

  // Getting the projects
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/projects`);

      // Sort projects by lastUpdated in descending order (most recent first)
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

  return (
    <div className="absolute flex flex-col items-center min-h-screen w-full z-10">
      <Background />
      {!isMobile && <NavigationBar />}
      {!isLoading && projects.length > 0 && (
        <ScrollIndicator target={scrollRef} />
      )}
      {isLoading ? (
        <p className="mt-60 text-white z-20">Loading projects...</p>
      ) : projects.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex flex-col items-center bg-opacity-15 relative mt-16 min-h-screen w-full z-10 pointer-events-auto gap-1.5"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              isHighlighted={project._id === highlightedProjectId}
              project={project}
              className="w-[90%] mb-6 "
            />
          ))}
        </div>
      ) : (
        <p className="mt-60 text-white z-20">No Project to show</p>
      )}
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-xl">Loading Educations...</p>
        </div>
      }
    >
      <Projects />
    </Suspense>
  );
}
