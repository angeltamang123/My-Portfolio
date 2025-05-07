// "use client";
import EducationCard from "@/components/cards/educationCard";
import ExperienceCard from "@/components/cards/experienceCard";
import ProjectCard from "@/components/cards/projectCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import axios from "axios";

import React from "react";

const Edit = async () => {
  const education = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/educations`)
  ).data;
  const experience = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/experiences`)
  ).data;
  const project = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
  ).data;

  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <Tabs defaultValue="Projects" className="w-[500px] md:w-[1000px] my-10">
        <TabsList className="grid w-full grow grid-cols-3 bg-[#293431]">
          <TabsTrigger value="Projects">Projects</TabsTrigger>
          <TabsTrigger value="Experiences">Experiences</TabsTrigger>
          <TabsTrigger value="Educations">Educations</TabsTrigger>
        </TabsList>
        <TabsContent value="Projects">
          {project.map((item) => (
            <ProjectCard
              key={item._id}
              id={item._id}
              projectName={item.projectName}
              projectDetails={item.projectDetails}
              projectBullets={item.projectBullets}
              status={item.status}
              projectType={item.projectType}
              projectLinks={item.projectLinks}
              action="patch"
            />
          ))}
        </TabsContent>
        <TabsContent value="Experiences">
          {experience.map((item) => (
            <ExperienceCard
              key={item._id}
              id={item._id}
              experienceName={item.experienceName}
              experienceOrganization={item.experienceOrganization}
              experienceDetails={item.experienceDetails}
              experienceBullets={item.experienceBullets}
              startDate={item.startDate}
              endDate={item.endDate}
              action="patch"
            />
          ))}
        </TabsContent>
        <TabsContent value="Educations">
          {education.map((item) => (
            <EducationCard
              key={item._id}
              id={item._id}
              educationName={item.educationName}
              educationOrganization={item.educationOrganization}
              educationOrganizationLocation={item.educationOrganizationLocation}
              educationDetails={item.educationDetails}
              educationBullets={item.educationBullets}
              startDate={item.startDate}
              endDate={item.endDate}
              action="patch"
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Edit;
