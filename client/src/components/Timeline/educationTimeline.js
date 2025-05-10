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

const EducationsTimeline = ({ className }) => {
  const router = useRouter();
  const [educations, setEducations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEducations = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/educations`
      );
      setEducations(response.data);
    } catch (err) {
      toast.error("Failed to load educations.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <Timeline position="right" className={`${className} overflow-hidden`}>
      {educations.map((education, index) =>
        index < educations.length - 1 ? (
          <TimelineItem
            key={education._id}
            className="w-full absolute -translate-x-[50%]"
          >
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div
                onClick={() =>
                  router.push(`/educations?highlight=${education._id}`)
                }
                className="bg-gray-300 border rounded cursor-pointer"
              >
                <p>{education.educationName}</p>
                <p>{education.educationDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ) : (
          <TimelineItem
            key={education._id}
            className="w-full absolute -translate-x-[50%]"
          >
            <TimelineSeparator className="w-full">
              <TimelineDot className="w-full" />
            </TimelineSeparator>
            <TimelineContent className="w-full">
              {" "}
              <div
                onClick={() =>
                  router.push(`/educations?highlight=${education._id}`)
                }
                className="bg-gray-300 border rounded w-full cursor-pointer"
              >
                <p>{education.educationName}</p>
                <p>{education.educationDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        )
      )}
    </Timeline>
  );
};

export default EducationsTimeline;
