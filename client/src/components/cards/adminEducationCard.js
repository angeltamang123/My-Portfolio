"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import EducationEditDialog from "./educationEditDialog";
import { toast } from "sonner";
import { DeleteDialog } from "./deleteAlert";

const AdminEducationCard = ({
  id,
  educationName,
  educationOrganization,
  educationOrganizationLocation,
  educationDetails,
  educationBullets,
  startDate,
  endDate,
  action,
  updateAction,
}) => {
  const handleEducationUpdateSuccess = () => {
    toast.success("Education details updated successfully!", {
      description: `Changes to "${educationName}" have been saved.`,
      classNames: {
        description: "!text-black",
      },
    });
    if (updateAction) updateAction();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02] border-2 border-emerald-100 bg-gradient-to-b from-white to-emerald-50 relative">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-xl text-emerald-800">
              {educationName}
            </h3>

            <div className="flex items-center text-emerald-600">
              <span>{educationOrganization}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-emerald-700">
          <MapPin className="mr-1 h-4 w-4 text-emerald-500" />
          <span>{educationOrganizationLocation}</span>
        </div>
        <div className="flex items-center text-emerald-700">
          <span>{educationDetails}</span>
        </div>
        <ul className="list-disc list-inside text-emerald-700">
          {educationBullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="flex items-center gap-20 text-emerald-700">
          <span>
            Starting Date: {new Date(startDate).toLocaleDateString("en-CA")}
          </span>
          <span>
            Ending Date: {new Date(endDate).toLocaleDateString("en-CA")}
          </span>
        </div>
      </CardContent>

      {action === "patch" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <EducationEditDialog
            educationId={id}
            initialEducationName={educationName}
            initialEducationOrganization={educationOrganization}
            initialEducationOrganizationLocation={educationOrganizationLocation}
            initialEducationDetails={educationDetails}
            initialEducationBullets={educationBullets}
            initialStartDate={startDate}
            initialEndDate={endDate}
            onUpdateSuccess={handleEducationUpdateSuccess}
          />
        </CardFooter>
      ) : action === "delete" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <DeleteDialog
            id={id}
            apiEndPoint="educations"
            updateAction={handleEducationUpdateSuccess}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default AdminEducationCard;
