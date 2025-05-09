"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import ExperienceEditDialog from "./experienceEditDialog";
import { DeleteDialog } from "./deleteAlert";

const AdminExperienceCard = ({
  id,
  experienceName,
  experienceOrganization,
  experienceDetails,
  experienceBullets,
  startDate,
  endDate,
  action,
  updateAction,
}) => {
  const handleExperienceUpdateSuccess = () => {
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
              {experienceName}
            </h3>
            <div className="flex items-center text-emerald-600">
              <span>{experienceOrganization}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-emerald-700">
          <span>{experienceDetails}</span>
        </div>
        <ul className="list-disc list-inside text-emerald-700">
          {experienceBullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="flex items-center gap-20 text-emerald-700">
          <span>Starting Date: {new Date(startDate).toLocaleDateString()}</span>
          <span>Ending Date: {new Date(endDate).toLocaleDateString()}</span>
        </div>
      </CardContent>

      {action === "patch" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <ExperienceEditDialog
            experienceId={id}
            initialExperienceName={experienceName}
            initialExperienceOrganization={experienceOrganization}
            initialExperienceDetails={experienceDetails}
            initialExperienceBullets={experienceBullets}
            initialStartDate={startDate}
            initialEndDate={endDate}
            onUpdateSuccess={handleExperienceUpdateSuccess}
          />
        </CardFooter>
      ) : action === "delete" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <DeleteDialog
            id={id}
            apiEndPoint="experiences"
            updateAction={handleExperienceUpdateSuccess}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default AdminExperienceCard;
