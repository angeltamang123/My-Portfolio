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

// The Separator for vertical orientation doesn't work and the component itself should be fixed as per https://github.com/shadcn-ui/ui/issues/4818
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Building, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const EducationCard = ({ education, className, id, isHighlighted }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
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
              Education
            </Badge>
            <CardTitle className="text-xl md:text-2xl font-bold text-white">
              {education.educationName}
            </CardTitle>
            {education.educationDetails && (
              <CardDescription className="text-white/80 text-sm md:text-base">
                {education.educationDetails}
              </CardDescription>
            )}
          </div>
        </div>
        <CardContent className="p-0">
          <div className="bg-white dark:bg-gray-900 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {education.educationOrganization}
                </h3>
              </div>
              {education.educationOrganizationLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {education.educationOrganizationLocation}
                  </span>
                </div>
              )}
            </div>
            {education.educationBullets &&
              education.educationBullets.length > 0 && (
                <Accordion
                  type="single"
                  collapsible
                  className="border rounded-lg"
                >
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                      More Details
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-white dark:bg-gray-900">
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        {education.educationBullets.map((item, index) => (
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
          {education.endDate ? (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <span className="font-medium">From:</span>
                <span>{formatDate(education.startDate)}</span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-5"
              />
              <div className="flex items-center gap-1">
                <span className="font-medium">To:</span>
                <span>{formatDate(education.endDate)}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-700 dark:text-gray-300">
              <Badge
                variant="outline"
                className="bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:border-teal-800"
              >
                Currently Attending
              </Badge>
              <Separator
                orientation="vertical"
                className="hidden md:block h-5"
              />
              <div className="flex items-center gap-1">
                <span className="font-medium">Since:</span>
                <span>{formatDate(education.startDate)}</span>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EducationCard;
