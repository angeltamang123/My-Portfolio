"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import { Button } from "../ui/button";
import ProjectEditDialog from "./projectEditDialog";
import { DeleteDialog } from "./deleteAlert";

const AdminProjectCard = ({
  id,
  projectName,
  status,
  projectDetails,
  projectBullets,
  projectType,
  projectLinks,
  action,
  updateAction,
}) => {
  const handleProjectUpdateSuccess = () => {
    if (updateAction) {
      updateAction();
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] border-2 border-emerald-100 bg-gradient-to-b from-white to-emerald-50 relative">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl text-emerald-800">
              {projectName}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-15 text-emerald-700">
          <span>{status}</span>
          <span>{projectType}</span>
        </div>

        <div className="flex items-center text-emerald-700">
          <span>{projectDetails}</span>
        </div>

        <ul className="list-disc list-inside text-emerald-700">
          {projectBullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex items-center gap-20 text-emerald-700">
          {projectLinks.map((project, index) => (
            <span
              key={index}
              onClick={() => window.open(project.url, "_blank")}
            >
              {project.name}
            </span>
          ))}
        </div>
      </CardContent>

      {action === "patch" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <ProjectEditDialog
            projectId={id}
            initialProjectName={projectName}
            initialProjectDetails={projectDetails}
            initialProjectBullets={projectBullets}
            initialStatus={status}
            initialProjectType={projectType}
            initialProjectLinks={projectLinks}
            onUpdateSuccess={handleProjectUpdateSuccess}
          />
        </CardFooter>
      ) : action === "delete" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <DeleteDialog
            id={id}
            apiEndPoint="projects"
            updateAction={handleProjectUpdateSuccess}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default AdminProjectCard;
