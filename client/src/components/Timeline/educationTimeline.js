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
    <Timeline position="right" className={`${className} items-start`}>
      {educations.map((education, index) =>
        index < educations.length - 1 ? (
          <TimelineItem key={education._id}>
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
          <TimelineItem key={education._id}>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              {" "}
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
        )
      )}
    </Timeline>
  );
};

export default EducationsTimeline;
