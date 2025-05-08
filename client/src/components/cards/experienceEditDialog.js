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
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input"; // Adjust path
import { Textarea } from "../ui/textarea"; // Adjust path
import { CircleX, PlusCircle } from "lucide-react";
import { toast } from "sonner";

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

const ExperienceEditDialog = ({
  experienceId,
  initialExperienceName, // This is an array of strings
  initialExperienceOrganization,
  initialExperienceDetails,
  initialExperienceBullets,
  initialStartDate,
  initialEndDate,
  onUpdateSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentExperienceData = useMemo(
    () => ({
      _id: experienceId,
      experienceName: initialExperienceName,
      experienceOrganization: initialExperienceOrganization,
      experienceDetails: initialExperienceDetails,
      experienceBullets: initialExperienceBullets,
      startDate: initialStartDate,
      endDate: initialEndDate,
    }),
    [
      experienceId,
      initialExperienceName,
      initialExperienceOrganization,
      initialExperienceDetails,
      initialExperienceBullets,
      initialStartDate,
      initialEndDate,
    ]
  );

  const experiencesSchema = Yup.object().shape({
    experienceName: Yup.array()
      .of(
        Yup.string()
          .min(2, "Too Short!")
          .max(100, "Too Long!")
          .required("Role/Title is required")
      )
      .min(1, "At least one role/title is required"),
    experienceOrganization: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Organization is required"),
    experienceDetails: Yup.string().min(5, "Too Short!"),
    experienceBullets: Yup.array().of(Yup.string().min(3, "Too short")),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End date can't be before start date"),
  });

  const editExperienceFormik = useFormik({
    initialValues: {
      experienceName: [],
      experienceOrganization: "",
      experienceDetails: "",
      experienceBullets: [],
      startDate: "",
      endDate: "",
    },
    validationSchema: experiencesSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!experienceId) {
        toast.error("Experience ID is missing. Cannot update.");
        return;
      }
      try {
        const submissionValues = {
          ...values,
          endDate: values.endDate || null,
          experienceName: values.experienceName.filter(
            (name) => name && name.trim() !== ""
          ),
          experienceBullets: values.experienceBullets.filter(
            (bullet) => bullet && bullet.trim() !== ""
          ),
        };
        await updateExperience(experienceId, submissionValues);
        toast.success("Updated", {
          description: "Experience details have been updated.",
          classNames: { description: "!text-black" },
        });
        setIsOpen(false);
        if (onUpdateSuccess) onUpdateSuccess();
      } catch (err) {
        console.error("Error updating experience:", err);
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
    if (isOpen && experienceId) {
      editExperienceFormik.setValues({
        experienceName: currentExperienceData.experienceName?.length
          ? currentExperienceData.experienceName
          : [""],
        experienceOrganization:
          currentExperienceData.experienceOrganization || "",
        experienceDetails: currentExperienceData.experienceDetails || "",
        experienceBullets: currentExperienceData.experienceBullets?.length
          ? currentExperienceData.experienceBullets
          : [""],
        startDate: formatDateForInput(currentExperienceData.startDate),
        endDate: formatDateForInput(currentExperienceData.endDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentExperienceData, experienceId]);

  const updateExperience = async (id, values) => {
    const { data } = await api.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/experiences/${id}`,
      values
    );
    return data;
  };

  const handleDeleteFromArray = (index, fieldName, arrayHelpers) => {
    arrayHelpers.remove(index);
    toast.info(`Item removed from ${fieldName} form. Save to persist.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full rounded-md p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#45AA96] to-[#05CEA8] border-[#151616]">
        <DialogHeader>
          <DialogTitle className="border-b-2 border-black py-1.5 text-xl">
            Edit Experience
          </DialogTitle>
          <DialogDescription>
            Make changes to the experience details below.
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={editExperienceFormik}>
          <form onSubmit={editExperienceFormik.handleSubmit}>
            <div className="grid gap-4 py-4 px-2">
              {/* Experience Name (Roles/Titles) - FieldArray */}
              <div className="border-2 rounded-lg border-[#293431] p-3 my-2">
                <Label className="font-bold mb-2 block">
                  Role(s) / Title(s)
                </Label>
                <FieldArray
                  name="experienceName"
                  render={(arrayHelpers) => (
                    <div>
                      {editExperienceFormik.values.experienceName?.map(
                        (name, index) => (
                          <div
                            key={`${experienceId}-expName-${index}`}
                            className="flex items-center gap-2 my-2"
                          >
                            <Input
                              name={`experienceName[${index}]`}
                              placeholder={`Role/Title ${index + 1}`}
                              className="flex-grow border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              onChange={editExperienceFormik.handleChange}
                              onBlur={editExperienceFormik.handleBlur}
                              value={name}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100 p-1"
                              onClick={() =>
                                handleDeleteFromArray(
                                  index,
                                  "experienceName",
                                  arrayHelpers
                                )
                              }
                              disabled={
                                editExperienceFormik.isSubmitting ||
                                editExperienceFormik.values.experienceName
                                  .length <= 1
                              }
                            >
                              <CircleX size={20} />
                            </Button>
                          </div>
                        )
                      )}
                      {/* Error for individual role/title */}
                      {editExperienceFormik.touched.experienceName &&
                        Array.isArray(
                          editExperienceFormik.errors.experienceName
                        ) &&
                        editExperienceFormik.errors.experienceName.map(
                          (error, index) =>
                            error && (
                              <p
                                key={`${experienceId}-expName-err-${index}`}
                                className="text-sm text-red-600"
                              >
                                {error}
                              </p>
                            )
                        )}
                      {/* Error if the whole array is invalid (e.g. min length) */}
                      {editExperienceFormik.touched.experienceName &&
                        typeof editExperienceFormik.errors.experienceName ===
                          "string" && (
                          <p className="text-sm text-red-600">
                            {editExperienceFormik.errors.experienceName}
                          </p>
                        )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => arrayHelpers.push("")}
                        className="mt-2"
                        disabled={editExperienceFormik.isSubmitting}
                      >
                        <PlusCircle size={16} className="mr-2" /> Add Role/Title
                      </Button>
                    </div>
                  )}
                />
              </div>

              {/* Experience Organization */}
              <div>
                <Label
                  htmlFor={`experienceOrganizationEdit-${experienceId}`}
                  className="font-bold"
                >
                  Organization
                </Label>
                <Input
                  id={`experienceOrganizationEdit-${experienceId}`}
                  name="experienceOrganization"
                  className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editExperienceFormik.handleChange}
                  onBlur={editExperienceFormik.handleBlur}
                  value={editExperienceFormik.values.experienceOrganization}
                />
                {editExperienceFormik.touched.experienceOrganization &&
                  editExperienceFormik.errors.experienceOrganization && (
                    <p className="text-sm text-red-600 mt-1">
                      {editExperienceFormik.errors.experienceOrganization}
                    </p>
                  )}
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor={`expStartDateEdit-${experienceId}`}
                    className="font-bold"
                  >
                    Start Date
                  </Label>
                  <Input
                    id={`expStartDateEdit-${experienceId}`}
                    name="startDate"
                    type="date"
                    className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    onChange={editExperienceFormik.handleChange}
                    onBlur={editExperienceFormik.handleBlur}
                    value={editExperienceFormik.values.startDate}
                  />
                  {editExperienceFormik.touched.startDate &&
                    editExperienceFormik.errors.startDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {editExperienceFormik.errors.startDate}
                      </p>
                    )}
                </div>
                <div>
                  <Label
                    htmlFor={`expEndDateEdit-${experienceId}`}
                    className="font-bold"
                  >
                    End Date (Optional)
                  </Label>
                  <Input
                    id={`expEndDateEdit-${experienceId}`}
                    name="endDate"
                    type="date"
                    className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    onChange={editExperienceFormik.handleChange}
                    onBlur={editExperienceFormik.handleBlur}
                    value={editExperienceFormik.values.endDate}
                  />
                  {editExperienceFormik.touched.endDate &&
                    editExperienceFormik.errors.endDate && (
                      <p className="text-sm text-red-600 mt-1">
                        {editExperienceFormik.errors.endDate}
                      </p>
                    )}
                </div>
              </div>

              {/* Experience Details */}
              <div>
                <Label
                  htmlFor={`experienceDetailsEdit-${experienceId}`}
                  className="font-bold"
                >
                  Details (Optional)
                </Label>
                <Textarea
                  id={`experienceDetailsEdit-${experienceId}`}
                  name="experienceDetails"
                  className="mt-1 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editExperienceFormik.handleChange}
                  onBlur={editExperienceFormik.handleBlur}
                  value={editExperienceFormik.values.experienceDetails}
                />
                {editExperienceFormik.touched.experienceDetails &&
                  editExperienceFormik.errors.experienceDetails && (
                    <p className="text-sm text-red-600 mt-1">
                      {editExperienceFormik.errors.experienceDetails}
                    </p>
                  )}
              </div>

              {/* Experience Bullets */}
              <div className="border-2 rounded-lg border-[#293431] p-3 my-2">
                <Label className="font-bold mb-2 block">
                  Key Achievements / Bullet Points
                </Label>
                <FieldArray
                  name="experienceBullets"
                  render={(arrayHelpers) => (
                    <div>
                      {editExperienceFormik.values.experienceBullets?.map(
                        (bullet, index) => (
                          <div
                            key={`${experienceId}-expBullet-${index}`}
                            className="flex items-center gap-2 my-2"
                          >
                            <Input
                              name={`experienceBullets[${index}]`}
                              placeholder={`Bullet ${index + 1}`}
                              className="flex-grow border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              onChange={editExperienceFormik.handleChange}
                              onBlur={editExperienceFormik.handleBlur}
                              value={bullet}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100 p-1"
                              onClick={() =>
                                handleDeleteFromArray(
                                  index,
                                  "experienceBullets",
                                  arrayHelpers
                                )
                              }
                              disabled={
                                editExperienceFormik.isSubmitting ||
                                editExperienceFormik.values.experienceBullets
                                  .length <= 1
                              }
                            >
                              <CircleX size={20} />
                            </Button>
                          </div>
                        )
                      )}
                      {/* Error for individual bullet */}
                      {editExperienceFormik.touched.experienceBullets &&
                        Array.isArray(
                          editExperienceFormik.errors.experienceBullets
                        ) &&
                        editExperienceFormik.errors.experienceBullets.map(
                          (error, index) =>
                            error && (
                              <p
                                key={`${experienceId}-expBullet-err-${index}`}
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
                        disabled={editExperienceFormik.isSubmitting}
                      >
                        <PlusCircle size={16} className="mr-2" /> Add Bullet
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
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={
                  editExperienceFormik.isSubmitting ||
                  !editExperienceFormik.dirty
                }
              >
                {editExperienceFormik.isSubmitting
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

export default ExperienceEditDialog;
