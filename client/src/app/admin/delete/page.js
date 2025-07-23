"use client";
import EducationCard from "@/components/cards/adminEducationCard";
import ExperienceCard from "@/components/cards/adminExperienceCard";
import AdminProjectCard from "@/components/cards/adminProjectCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const Delete = () => {
  const router = useRouter();
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth check
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin"); // Redirect to login if not authenticated
      sessionStorage.setItem("redirectReason", "authRequired");
    }
  }, [router]);

  // useCallback to memoize the function
  const fetchEducations = useCallback(async () => {
    if (!sessionStorage.getItem("adminToken")) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/educations`);
      setEducations(response.data);
    } catch (err) {
      console.error("Failed to fetch educations:", err);
      setError(err.message || "Failed to load educations.");
      toast.error("Failed to load educations.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEducations();
  }, [fetchEducations]);

  const handleEducationUpdated = () => {
    fetchEducations(); // Re-fetch the entire list
  };

  const fetchExperiences = useCallback(async () => {
    if (!sessionStorage.getItem("adminToken")) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/experiences`);
      setExperiences(response.data);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
      setError(err.message || "Failed to load experiences.");
      toast.error("Failed to load experiences.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleExperiencesUpdated = () => {
    fetchExperiences(); // Re-fetch the entire list
  };

  const fetchProjects = useCallback(async () => {
    if (!sessionStorage.getItem("adminToken")) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/projects`);
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setError(err.message || "Failed to load projects.");
      toast.error("Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectsUpdated = () => {
    fetchProjects(); // Re-fetch the entire list
  };

  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <Tabs defaultValue="Projects" className="w-[500px] md:w-[1000px] mt-25">
        <TabsList className="grid w-full grow grid-cols-3 bg-[#293431]">
          <TabsTrigger value="Projects">Projects</TabsTrigger>
          <TabsTrigger value="Experiences">Experiences</TabsTrigger>
          <TabsTrigger value="Educations">Educations</TabsTrigger>
        </TabsList>
        <TabsContent value="Projects">
          {isLoading && <p>Loading projects...</p>}
          {error && <p>Error: {error}</p>}
          {projects.length === 0 && <p>No project entries found.</p>};
          {projects.map((item) => (
            <AdminProjectCard
              key={item._id}
              id={item._id}
              projectName={item.projectName}
              projectDetails={item.projectDetails}
              projectBullets={item.projectBullets}
              status={item.status}
              projectType={item.projectType}
              projectLinks={item.projectLinks}
              action="delete"
              updateAction={handleProjectsUpdated}
            />
          ))}
        </TabsContent>
        <TabsContent value="Experiences">
          {isLoading && <p>Loading experiences...</p>}
          {error && <p>Error: {error}</p>}
          {experiences.length === 0 && <p>No experience entries found.</p>};
          {experiences.map((item) => (
            <ExperienceCard
              key={item._id}
              id={item._id}
              experienceName={item.experienceName}
              experienceOrganization={item.experienceOrganization}
              experienceDetails={item.experienceDetails}
              experienceBullets={item.experienceBullets}
              startDate={item.startDate}
              endDate={item.endDate}
              action="delete"
              updateAction={handleExperiencesUpdated}
            />
          ))}
        </TabsContent>
        <TabsContent value="Educations">
          {isLoading && <p>Loading educations...</p>}
          {error && <p>Error: {error}</p>}
          {educations.length === 0 && <p>No education entries found.</p>};
          {educations.map((item) => (
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
              updateAction={handleEducationUpdated}
              action="delete"
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Delete;
