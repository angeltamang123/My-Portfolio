"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const EducationCard = ({
  key,
  educationName,
  educationOrganization,
  educationOrganizationLocation,
  educationDetails,
  startDate,
  endDate,
  action,
}) => {
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
        <div className="flex items-center gap-20 text-emerald-700">
          <span>Starting Date: {new Date(startDate).toLocaleDateString()}</span>
          <span>Ending Date: {new Date(endDate).toLocaleDateString()}</span>
        </div>
      </CardContent>

      {action === "patch" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            Edit
          </Button>
        </CardFooter>
      ) : action === "delete" ? (
        <CardFooter className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 border-t border-emerald-100">
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
            Delete
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};

export default EducationCard;
