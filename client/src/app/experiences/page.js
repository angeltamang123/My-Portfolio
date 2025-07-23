"use client";
import Background from "@/components/background";
import ExperienceCard from "@/components/cards/experienceCard";
import ScrollIndicator from "@/components/scrollIndicator";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Experiences = () => {
  // scrollRef is used to ref the container that contains items to track scrolling,
  // and passed to ScrollIndicator as prop target
  const scrollRef = useRef(null);
  const [experiences, setExperiences] = useState([]);

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
  }, [searchParams, experiences]);

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
      setError(err.message || "Failed to load experiences.");
      toast.error("Failed to load experiences.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="flex flex-col items-center w-full z-10">
      <Background />
      {!isLoading && experiences.length > 0 && (
        <ScrollIndicator target={scrollRef} />
      )}
      {isLoading ? (
        <p className="mt-60 text-white z-20">Loading experiences...</p>
      ) : experiences.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex flex-col items-center bg-opacity-15 relative mt-16 gap-1.5 w-full z-10 pointer-events-auto"
        >
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              className="w-[90%] mb-6"
              isHighlighted={experience._id === highlightedProjectId}
              id={experience._id}
            />
          ))}
        </div>
      ) : (
        <p className="mt-60 text-white z-20">No Experience to show</p>
      )}
    </div>
  );
};

export default function ExperiencesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-xl">Loading Educations...</p>
        </div>
      }
    >
      <Experiences />
    </Suspense>
  );
}
