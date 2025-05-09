"use client";
import React, { useEffect, useState } from "react";
import Timeline from "@chakra-ui/react";
import TimelineItem from "@chakra-ui/react";
import TimelineSeparator from "@chakra-ui/react";
import TimelineConnector from "@chakra-ui/react";
import TimelineContent from "@chakra-ui/react";
import TimelineDot from "@chakra-ui/react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const ExperiencesTimeline = ({ className }) => {
  const router = useRouter();
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExperiences = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/experiences`
      );
      setExperiences(response.data);
    } catch (err) {
      toast.error("Failed to load experiences.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <Timeline
      position="left"
      className={`${className}`}
      sx={{ width: "fit-content", maxWidth: "320px" }}
    >
      {experiences.map((experience, index) =>
        index < experiences.length - 1 ? (
          <TimelineItem key={experience._id}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div
                onClick={() =>
                  router.push(`/experiences?highlight=${experience._id}`)
                }
                className="bg-gray-300 border rounded cursor-pointer"
              >
                <p>{experience.experienceName}</p>
                <p>{experience.experienceDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ) : (
          <TimelineItem key={experience._id}>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>
              {" "}
              <div
                onClick={() =>
                  router.push(`/experiences?highlight=${experience._id}`)
                }
                className="bg-gray-300 border rounded cursor-pointer"
              >
                <p>{experience.experienceName}</p>
                <p>{experience.experienceDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        )
      )}
    </Timeline>
  );
};

export default ExperiencesTimeline;
