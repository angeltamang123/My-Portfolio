// "use client";

import EducationsForm from "@/components/forms/educationForm";
import ExperiencesForm from "@/components/forms/experienceForm";
import ProjectsForm from "@/components/forms/projectForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

import React from "react";

const Add = async () => {
  const router = useRouter();

  // Auth check
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin");
      toast.error("Please log in to access this page.");
    }
  }, [router]);

  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <Tabs defaultValue="Projects" className="w-[500px] md:w-[1000px] my-10">
        <TabsList className="grid w-full grow grid-cols-3 bg-[#293431]">
          <TabsTrigger value="Projects">Projects</TabsTrigger>
          <TabsTrigger value="Experiences">Experiences</TabsTrigger>
          <TabsTrigger value="Educations">Educations</TabsTrigger>
        </TabsList>
        <TabsContent value="Projects">
          <ProjectsForm />
        </TabsContent>
        <TabsContent value="Experiences">
          <ExperiencesForm />
        </TabsContent>
        <TabsContent value="Educations">
          <EducationsForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Add;
