import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Separator } from "../ui/separator";

import { Badge } from "@/components/ui/badge";
import { CalendarDays, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ExperienceCard = ({ experience, className, id, isHighlighted }) => {
  const displayExperienceName = Array.isArray(experience.experienceName)
    ? experience.experienceName.join(" / ")
    : experience.experienceName;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      id={id}
      className={cn(
        `overflow-hidden relative border-0 shadow-lg ${className}`,
        isHighlighted && `border-blue-700 rounded-2xl border-4`
      )}
      animate={{ scale: isHighlighted ? 1.05 : 1 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      <Card>
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6">
          <div className="flex flex-col gap-2">
            <Badge
              variant="outline"
              className="self-start bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              Experience
            </Badge>
            <CardTitle className="text-xl md:text-2xl font-bold text-white">
              {displayExperienceName}
            </CardTitle>
            {experience.experienceDetails && (
              <CardDescription className="text-white/80 text-sm md:text-base">
                {experience.experienceDetails}
              </CardDescription>
            )}
          </div>
        </div>
        <CardContent className="p-0">
          <div className="bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <h3 className="font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Organization:
                </span>{" "}
                <span className="text-gray-900 dark:text-white">
                  {experience.experienceOrganization}
                </span>
              </h3>
            </div>
            {experience.experienceBullets &&
              experience.experienceBullets.length > 0 && (
                <Accordion
                  type="single"
                  collapsible
                  className="border rounded-lg"
                >
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                      Key Responsibilities & Achievements
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-white dark:bg-gray-900">
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {experience.experienceBullets.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ChevronRight className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Duration
            </span>
          </div>
          {experience.endDate ? (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span className="font-medium">From:</span>
                <span>{formatDate(experience.startDate)}</span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-5"
              />
              <div className="flex items-center gap-1">
                <span className="font-medium">To:</span>
                <span>{formatDate(experience.endDate)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-700 dark:text-gray-300">
              <Badge
                variant="outline"
                className="bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800"
              >
                Currently Active
              </Badge>
              <Separator
                orientation="vertical"
                className="hidden md:block h-5"
              />
              <div className="flex items-center gap-1">
                <span className="font-medium">Since:</span>
                <span>{formatDate(experience.startDate)}</span>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExperienceCard;
