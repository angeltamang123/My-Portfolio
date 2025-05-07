"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input"; // Adjust path as needed
import { Textarea } from "../ui/textarea"; // Adjust path as needed
import { CircleX, PlusCircle } from "lucide-react";
import { toast } from "sonner";

// Helper to format date for input type="date"
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

const EducationEditDialog = ({
  educationId,
  initialEducationName,
  initialEducationOrganization,
  initialEducationOrganizationLocation,
  initialEducationDetails,
  initialEducationBullets,
  initialStartDate,
  initialEndDate,
  onUpdateSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentEducationData = useMemo(
    () => ({
      _id: educationId,
      educationName: initialEducationName,
      educationOrganization: initialEducationOrganization,
      educationOrganizationLocation: initialEducationOrganizationLocation,
      educationDetails: initialEducationDetails,
      educationBullets: initialEducationBullets,
      startDate: initialStartDate,
      endDate: initialEndDate,
    }),
    [
      educationId,
      initialEducationName,
      initialEducationOrganization,
      initialEducationOrganizationLocation,
      initialEducationDetails,
      initialEducationBullets,
      initialStartDate,
      initialEndDate,
    ]
  );

  const educationsSchema = Yup.object().shape({
    educationName: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Degree/Certificate name is required"),
    educationOrganization: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Institution name is required"),
    educationOrganizationLocation: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!"),
    educationDetails: Yup.string().min(5, "Too Short!"),
    educationBullets: Yup.array().of(Yup.string().min(3, "Too short")),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End date can't be before start date"),
  });

  const editEducationFormik = useFormik({
    initialValues: {
      educationName: "",
      educationOrganization: "",
      educationOrganizationLocation: "",
      educationDetails: "",
      educationBullets: [],
      startDate: "",
      endDate: "",
    },
    validationSchema: educationsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!educationId) {
        toast.error("Education ID is missing. Cannot update.");
        return;
      }
      try {
        const submissionValues = {
          ...values,
          endDate: values.endDate || null,
          educationBullets: values.educationBullets.filter(
            (bullet) => bullet && bullet.trim() !== ""
          ),
        };
        await updateEducation(educationId, submissionValues);
        toast.success("Updated", {
          description: "Education details have been updated.",
          classNames: {
            description: "!text-black",
          },
        });
        setIsOpen(false);
        if (onUpdateSuccess) onUpdateSuccess();
      } catch (err) {
        console.error("Error updating education:", err);
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Unexpected error occurred.";
        toast("Update Failed", {
          description: errorMessage,
          classNames: { toast: "!bg-red-400", description: "!text-black" },
        });
      }
    },
  });

  useEffect(() => {
    if (isOpen && educationId) {
      editEducationFormik.setValues({
        educationName: currentEducationData.educationName || "",
        educationOrganization: currentEducationData.educationOrganization || "",
        educationOrganizationLocation:
          currentEducationData.educationOrganizationLocation || "",
        educationDetails: currentEducationData.educationDetails || "",
        educationBullets:
          currentEducationData.educationBullets &&
          currentEducationData.educationBullets.length > 0
            ? currentEducationData.educationBullets
            : [""],
        startDate: formatDateForInput(currentEducationData.startDate),
        endDate: formatDateForInput(currentEducationData.endDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentEducationData, educationId]);

  const updateEducation = async (id, values) => {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/educations/${id}`,
      values
    );
    return data;
  };

  const handleDeleteEducationBulletAPI = async (
    bulletText,
    bulletIndex,
    arrayHelpers
  ) => {
    if (!educationId) {
      toast.error("Education ID missing, cannot delete bullet.");
      return;
    }
    const originalBullets = initialEducationBullets || [];
    const isOriginalBullet = originalBullets.includes(bulletText);

    try {
      if (isOriginalBullet && bulletText && bulletText.trim() !== "") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/educations/${educationId}/delete-bullet`,
          { bullet: bulletText }
        );
      }
      arrayHelpers.remove(bulletIndex);
      toast.success("Bullet point removed from form.");
    } catch (error) {
      console.error("Error calling delete bullet API:", error);
      toast.error(
        `API error deleting bullet: ${
          error.response?.data?.message || error.message
        }. Removed from form.`
      );
      arrayHelpers.remove(bulletIndex);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full rounded-md p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#45AA96] to-[#05CEA8] border-[#151616]">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-black py-1.5 text-xl">
            Edit Education
          </DialogTitle>
          <DialogDescription>
            Make changes to the education details below. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={editEducationFormik}>
          <form onSubmit={editEducationFormik.handleSubmit}>
            <div className="grid gap-4 py-4 px-2">
              {/* Education Name */}
              <div>
                <Label
                  htmlFor={`educationNameEdit-${educationId}`}
                  className="font-bold"
                >
                  Degree / Certificate Name
                </Label>
                <Input
                  id={`educationNameEdit-${educationId}`}
                  name="educationName"
                  className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editEducationFormik.handleChange}
                  onBlur={editEducationFormik.handleBlur}
                  value={editEducationFormik.values.educationName}
                />
                {editEducationFormik.touched.educationName &&
                  editEducationFormik.errors.educationName && (
                    <p className="text-sm text-red-600 mt-1">
                      {editEducationFormik.errors.educationName}
                    </p>
                  )}
              </div>

              {/* Education Organization */}
              <div>
                <Label
                  htmlFor={`educationOrganizationEdit-${educationId}`}
                  className="font-bold"
                >
                  Institution Name
                </Label>
                <Input
                  id={`educationOrganizationEdit-${educationId}`}
                  name="educationOrganization"
                  className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editEducationFormik.handleChange}
                  onBlur={editEducationFormik.handleBlur}
                  value={editEducationFormik.values.educationOrganization}
                />
                {editEducationFormik.touched.educationOrganization &&
                  editEducationFormik.errors.educationOrganization && (
                    <p className="text-sm text-red-600 mt-1">
                      {editEducationFormik.errors.educationOrganization}
                    </p>
                  )}
              </div>

              {/* Education Organization Location */}
              <div>
                <Label
                  htmlFor={`educationOrganizationLocationEdit-${educationId}`}
                  className="font-bold"
                >
                  Institution Location (Optional)
                </Label>
                <Input
                  id={`educationOrganizationLocationEdit-${educationId}`}
                  name="educationOrganizationLocation"
                  className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editEducationFormik.handleChange}
                  onBlur={editEducationFormik.handleBlur}
                  value={
                    editEducationFormik.values.educationOrganizationLocation
                  }
                />
                {editEducationFormik.touched.educationOrganizationLocation &&
                  editEducationFormik.errors.educationOrganizationLocation && (
                    <p className="text-sm text-red-600 mt-1">
                      {editEducationFormik.errors.educationOrganizationLocation}
                    </p>
                  )}
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor={`startDateEdit-${educationId}`}
                    className="font-bold"
                  >
                    Start Date
                  </Label>
                  <Input
                    id={`startDateEdit-${educationId}`}
                    name="startDate"
                    type="date"
                    className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    onChange={editEducationFormik.handleChange}
                    onBlur={editEducationFormik.handleBlur}
                    value={editEducationFormik.values.startDate}
                  />
                  {editEducationFormik.touched.startDate &&
                    editEducationFormik.errors.startDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {editEducationFormik.errors.startDate}
                      </p>
                    )}
                </div>
                <div>
                  <Label
                    htmlFor={`endDateEdit-${educationId}`}
                    className="font-bold"
                  >
                    End Date (or Expected)
                  </Label>
                  <Input
                    id={`endDateEdit-${educationId}`}
                    name="endDate"
                    type="date"
                    className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    onChange={editEducationFormik.handleChange}
                    onBlur={editEducationFormik.handleBlur}
                    value={editEducationFormik.values.endDate}
                  />
                  {editEducationFormik.touched.endDate &&
                    editEducationFormik.errors.endDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {editEducationFormik.errors.endDate}
                      </p>
                    )}
                </div>
              </div>

              {/* Education Details */}
              <div>
                <Label
                  htmlFor={`educationDetailsEdit-${educationId}`}
                  className="font-bold"
                >
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id={`educationDetailsEdit-${educationId}`}
                  name="educationDetails"
                  className="mt-1 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editEducationFormik.handleChange}
                  onBlur={editEducationFormik.handleBlur}
                  value={editEducationFormik.values.educationDetails}
                />
                {editEducationFormik.touched.educationDetails &&
                  editEducationFormik.errors.educationDetails && (
                    <p className="text-sm text-red-600 mt-1">
                      {editEducationFormik.errors.educationDetails}
                    </p>
                  )}
              </div>

              {/* Education Bullets */}
              <div className="border-2 rounded-lg border-[#293431] p-3 my-2">
                <Label className="font-bold mb-2 block">
                  Key Learnings / Bullet Points
                </Label>
                <FieldArray
                  name="educationBullets"
                  render={(arrayHelpers) => (
                    <div>
                      {editEducationFormik.values.educationBullets?.map(
                        (bullet, index) => (
                          <div
                            key={`${educationId}-bullet-${index}`}
                            className="flex items-center gap-2 my-2"
                          >
                            <Input
                              name={`educationBullets[${index}]`}
                              placeholder={`Bullet Point ${index + 1}`}
                              className="flex-grow border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              onChange={editEducationFormik.handleChange}
                              onBlur={editEducationFormik.handleBlur}
                              value={bullet}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100 p-1"
                              onClick={() =>
                                handleDeleteEducationBulletAPI(
                                  bullet,
                                  index,
                                  arrayHelpers
                                )
                              }
                              disabled={editEducationFormik.isSubmitting}
                            >
                              <CircleX size={20} />
                            </Button>
                          </div>
                        )
                      )}
                      {editEducationFormik.touched.educationBullets &&
                        Array.isArray(
                          editEducationFormik.errors.educationBullets
                        ) &&
                        editEducationFormik.errors.educationBullets.map(
                          (error, index) =>
                            error && (
                              <p
                                key={`${educationId}-err-${index}`}
                                className="text-sm text-red-600"
                              >
                                {error}
                              </p>
                            )
                        )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => arrayHelpers.push("")}
                        className="mt-2"
                        disabled={editEducationFormik.isSubmitting}
                      >
                        <PlusCircle size={16} className="mr-2" />
                        Add Bullet Point
                      </Button>
                    </div>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-4 px-2 pb-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false);
                    // Optionally reset form on explicit cancel if desired
                    // editEducationFormik.resetForm();
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  editEducationFormik.isSubmitting || !editEducationFormik.dirty
                }
              >
                {editEducationFormik.isSubmitting
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EducationEditDialog;
