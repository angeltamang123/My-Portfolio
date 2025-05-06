// "use client";

import ProjectsForm from "@/components/forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const Edit = async () => {
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
        <TabsContent value="Experiences"></TabsContent>
        <TabsContent value="Educations"></TabsContent>
      </Tabs>
    </div>
  );
};

export default Edit;
