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
    <Timeline position="left" className={`${className} overflow-hidden`}>
      {experiences.map((experience, index) =>
        index < experiences.length - 1 ? (
          <TimelineItem
            key={experience._id}
            className="w-full absolute translate-x-[50%]"
          >
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
                <div className="flex w-full justify-end ">
                  {experience.experienceName.map((name, index) => (
                    <div
                      key={index}
                      className="flex w-max justify-end flex-grow-0 items-end "
                    >
                      <p>{name}</p>
                      {index != experience.experienceName.length - 1 && (
                        <Separator
                          orientation="vertical"
                          className="bg-black hidden mx-1.5 md:block"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p>{experience.experienceDetails}</p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ) : (
          <TimelineItem
            key={experience._id}
            className="w-full absolute translate-x-[50%]"
          >
            <TimelineSeparator className="w-full">
              <TimelineDot className="w-full" />
            </TimelineSeparator>
            <TimelineContent className="w-full">
              {" "}
              <div
                onClick={() =>
                  router.push(`/experiences?highlight=${experience._id}`)
                }
                className="bg-gray-300 border rounded w-full cursor-pointer"
              >
                <div className="flex w-full justify-end ">
                  {experience.experienceName.map((name, index) => (
                    <div
                      key={index}
                      className="flex w-max justify-end flex-grow-0 items-end "
                    >
                      <p>{name}</p>
                      {index != experience.experienceName.length - 1 && (
                        <Separator
                          orientation="vertical"
                          className="bg-black hidden mx-1.5 md:block"
                        />
                      )}
                    </div>
                  ))}
                </div>
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
