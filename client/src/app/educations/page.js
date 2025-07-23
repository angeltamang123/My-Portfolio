"use client";
import Background from "@/components/background";
import EducationCard from "@/components/cards/educationCard";
import ScrollIndicator from "@/components/scrollIndicator";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Educations = () => {
  const scrollRef = useRef(null);
  const [educations, setEducations] = useState([]);
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
  }, [searchParams, educations]);

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
      setError(err.message || "Failed to load educations.");
      toast.error("Failed to load educations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <div className=" flex flex-col items-center w-full z-10">
      <Background />
      {!isLoading && educations.length > 0 && (
        <ScrollIndicator target={scrollRef} />
      )}
      {isLoading ? (
        <p className="mt-60 text-white z-20">Loading educations...</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex flex-col items-center bg-opacity-15 relative mt-16 min-h-screen w-full z-10 pointer-events-auto"
        >
          {educations.map((education) => (
            <EducationCard
              key={education._id}
              education={education}
              className="w-[90%] mb-6 "
              isHighlighted={education._id === highlightedProjectId}
              id={education._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* In Next.js App Router, client components that use hooks like useSearchParams() 
(which rely on client-side rendering and data) during the initial server render can cause issues.
 Next.js tries to prerender as much as possible.
  When it encounters useSearchParams() without a <Suspense> boundary, 
  it can't fully prerender that part of the component tree, leading to  error
  Wrap the component that uses useSearchParams() with <React.Suspense>
  */
export default function EducationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-xl">Loading Educations...</p>
        </div>
      }
    >
      <Educations />
    </Suspense>
  );
}
