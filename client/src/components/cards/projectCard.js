import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  Newspaper,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ProjectCard = ({ project, className, id, isHighlighted }) => {
  // Function to determine which icon to use based on link name
  const getLinkIcon = (linkName) => {
    const name = linkName.toLowerCase();
    if (name.includes("github") || name.includes("repo"))
      return <Github className="h-4 w-4" />;
    if (
      name.includes("demo") ||
      name.includes("live") ||
      name.includes("site") ||
      name.includes("experiment")
    )
      return <Globe className="h-4 w-4" />;
    if (
      name.includes("paper") ||
      name.includes("research") ||
      name.includes("report")
    )
      return <Newspaper className="h-4 w-4" />;
    return <ExternalLink className="h-4 w-4" />;
  };

  // Function to get status badge color
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();

    if (statusLower.includes("complete") || statusLower.includes("finished")) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
          {status}
        </Badge>
      );
    } else if (
      statusLower.includes("progress") ||
      statusLower.includes("ongoing")
    ) {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
          {status}
        </Badge>
      );
    } else if (statusLower.includes("plan") || statusLower.includes("future")) {
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">
          {status}
        </Badge>
      );
    }
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
              Project
            </Badge>
            <CardTitle className="text-xl md:text-2xl font-bold text-white">
              {project.projectName}
            </CardTitle>
            {project.projectDetails && (
              <CardDescription className="text-white/80 text-sm md:text-base">
                {project.projectDetails}
              </CardDescription>
            )}
          </div>
        </div>
        <CardContent className="p-0">
          <div className="bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              <h3 className="font-medium">
                <span className="text-gray-500 dark:text-gray-400">
                  Status:
                </span>{" "}
                {getStatusBadge(project.status)}
              </h3>
              <img
                src="/assets/cook.png"
                alt="Let Him Cook"
                className="h-6 w-6"
              />
            </div>
            {project.projectBullets && project.projectBullets.length > 0 && (
              <Accordion
                type="single"
                collapsible
                className="border rounded-lg"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="px-4 py-3 text-md font-medium hover:no-underline bg-gray-50 dark:bg-gray-800 rounded-t-lg">
                    Key Features & Details
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-3 bg-white dark:bg-gray-900">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      {project.projectBullets.map((item, index) => (
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
        {project.projectLinks && project.projectLinks.length > 0 ? (
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-wrap gap-4">
            <div className="w-full mb-1">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                Project Links
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.projectLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 transition-colors"
                >
                  {getLinkIcon(link.name)}
                  <span>{link.name || "Link"}</span>
                </a>
              ))}
            </div>
          </CardFooter>
        ) : (
          <CardFooter className="bg-gray-50 dark:bg-gray-800 p-6 text-gray-500 dark:text-gray-400 text-sm italic">
            No external links provided for this project.
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
