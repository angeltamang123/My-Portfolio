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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming path for Select
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input"; // Adjust path
import { Textarea } from "../ui/textarea"; // Adjust path
import { CircleX, PlusCircle } from "lucide-react";
import { toast } from "sonner";

const ProjectEditDialog = ({
  projectId,
  initialProjectName,
  initialProjectDetails,
  initialProjectBullets,
  initialStatus,
  initialProjectType,
  initialProjectLinks,
  onUpdateSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentProjectData = useMemo(
    () => ({
      _id: projectId,
      projectName: initialProjectName,
      projectDetails: initialProjectDetails,
      projectBullets: initialProjectBullets,
      status: initialStatus,
      projectType: initialProjectType,
      projectLinks: initialProjectLinks,
    }),
    [
      projectId,
      initialProjectName,
      initialProjectDetails,
      initialProjectBullets,
      initialStatus,
      initialProjectType,
      initialProjectLinks,
    ]
  );

  const projectsSchema = Yup.object().shape({
    projectName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    projectDetails: Yup.string().min(5, "Too Short!"),
    projectBullets: Yup.array().of(Yup.string().min(3, "Too short")),
    status: Yup.string()
      .oneOf(["In-Progress", "Completed"], "Invalid Status!")
      .required("Status required!"),
    projectType: Yup.string()
      .oneOf(["AI/ML", "Web Development", "Others"], "Invalid Project Type!!")
      .required("Must enter the Project Type!"),
    projectLinks: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").required("Link name required"),
        url: Yup.string()
          .url("Must be a valid URL!")
          .required("Link URL required"),
      })
    ),
  });

  const editProjectFormik = useFormik({
    initialValues: {
      projectName: "",
      projectDetails: "",
      projectBullets: [],
      status: "",
      projectType: "",
      projectLinks: [],
    },
    validationSchema: projectsSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (!projectId) {
        toast.error("Project ID is missing. Cannot update.");
        return;
      }
      try {
        const submissionValues = {
          ...values,
          projectBullets: values.projectBullets.filter(
            (bullet) => bullet && bullet.trim() !== ""
          ),
          projectLinks: values.projectLinks.filter(
            (link) => link.name && link.url
          ), // Filter out incomplete links
          lastUpdated: Date.now,
        };
        await updateProject(projectId, submissionValues);
        toast.success("Updated", {
          description: "Project details have been updated.",
          classNames: { description: "!text-black" },
        });
        setIsOpen(false);
        if (onUpdateSuccess) onUpdateSuccess();
      } catch (err) {
        console.error("Error updating project:", err);
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
    if (isOpen && projectId) {
      editProjectFormik.setValues({
        projectName: currentProjectData.projectName || "",
        projectDetails: currentProjectData.projectDetails || "",
        projectBullets: currentProjectData.projectBullets?.length
          ? currentProjectData.projectBullets
          : [""],
        status: currentProjectData.status || "In-Progress",
        projectType: currentProjectData.projectType || "Web Development",
        projectLinks: currentProjectData.projectLinks?.length
          ? currentProjectData.projectLinks
          : [{ name: "", url: "" }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentProjectData, projectId]);

  const updateProject = async (id, values) => {
    const { data } = await api.patch(`/api/projects/${id}`, values);
    return data;
  };

  // Simplified: Assume main patch updates arrays. If specific API endpoints for bullets/links exist, implement them like in EducationEditDialog
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
            Edit Project
          </DialogTitle>
          <DialogDescription>
            Make changes to the project details below.
          </DialogDescription>
        </DialogHeader>
        <FormikProvider value={editProjectFormik}>
          <form onSubmit={editProjectFormik.handleSubmit}>
            <div className="grid gap-4 py-4 px-2">
              {/* Project Name */}
              <div>
                <Label
                  htmlFor={`projectNameEdit-${projectId}`}
                  className="font-bold"
                >
                  Project Name
                </Label>
                <Input
                  id={`projectNameEdit-${projectId}`}
                  name="projectName"
                  className="mt-1 border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editProjectFormik.handleChange}
                  onBlur={editProjectFormik.handleBlur}
                  value={editProjectFormik.values.projectName}
                />
                {editProjectFormik.touched.projectName &&
                  editProjectFormik.errors.projectName && (
                    <p className="text-sm text-red-600 mt-1">
                      {editProjectFormik.errors.projectName}
                    </p>
                  )}
              </div>

              {/* Status and Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor={`statusEdit-${projectId}`}
                    className="font-bold"
                  >
                    Status
                  </Label>
                  <Select
                    value={editProjectFormik.values.status}
                    onValueChange={(value) =>
                      editProjectFormik.setFieldValue("status", value)
                    }
                  >
                    <SelectTrigger
                      id={`statusEdit-${projectId}`}
                      className="mt-1 w-full border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="In-Progress">In-Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {editProjectFormik.touched.status &&
                    editProjectFormik.errors.status && (
                      <p className="text-sm text-red-600 mt-1">
                        {editProjectFormik.errors.status}
                      </p>
                    )}
                </div>
                <div>
                  <Label
                    htmlFor={`projectTypeEdit-${projectId}`}
                    className="font-bold"
                  >
                    Project Type
                  </Label>
                  <Select
                    value={editProjectFormik.values.projectType}
                    onValueChange={(value) =>
                      editProjectFormik.setFieldValue("projectType", value)
                    }
                  >
                    <SelectTrigger
                      id={`projectTypeEdit-${projectId}`}
                      className="mt-1 w-full border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    >
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Project Type</SelectLabel>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="Web Development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {editProjectFormik.touched.projectType &&
                    editProjectFormik.errors.projectType && (
                      <p className="text-sm text-red-600 mt-1">
                        {editProjectFormik.errors.projectType}
                      </p>
                    )}
                </div>
              </div>

              {/* Project Details */}
              <div>
                <Label
                  htmlFor={`projectDetailsEdit-${projectId}`}
                  className="font-bold"
                >
                  Project Details
                </Label>
                <Textarea
                  id={`projectDetailsEdit-${projectId}`}
                  name="projectDetails"
                  className="mt-1 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={editProjectFormik.handleChange}
                  onBlur={editProjectFormik.handleBlur}
                  value={editProjectFormik.values.projectDetails}
                />
                {editProjectFormik.touched.projectDetails &&
                  editProjectFormik.errors.projectDetails && (
                    <p className="text-sm text-red-600 mt-1">
                      {editProjectFormik.errors.projectDetails}
                    </p>
                  )}
              </div>

              {/* Project Bullets */}
              <div className="border-2 rounded-lg border-[#293431] p-3 my-2">
                <Label className="font-bold mb-2 block">
                  Project Bullet Points
                </Label>
                <FieldArray
                  name="projectBullets"
                  render={(arrayHelpers) => (
                    <div>
                      {editProjectFormik.values.projectBullets?.map(
                        (bullet, index) => (
                          <div
                            key={`${projectId}-bullet-${index}`}
                            className="flex items-center gap-2 my-2"
                          >
                            <Input
                              name={`projectBullets[${index}]`}
                              placeholder={`Bullet ${index + 1}`}
                              className="flex-grow border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              onChange={editProjectFormik.handleChange}
                              onBlur={editProjectFormik.handleBlur}
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
                                  "projectBullets",
                                  arrayHelpers
                                )
                              }
                              disabled={
                                editProjectFormik.isSubmitting ||
                                editProjectFormik.values.projectBullets
                                  .length <= 1
                              }
                            >
                              <CircleX size={20} />
                            </Button>
                          </div>
                        )
                      )}
                      {/* Error for individual bullet */}
                      {editProjectFormik.touched.projectBullets &&
                        Array.isArray(
                          editProjectFormik.errors.projectBullets
                        ) &&
                        editProjectFormik.errors.projectBullets.map(
                          (error, index) =>
                            error &&
                            typeof error === "string" && (
                              <p
                                key={`${projectId}-bullet-err-${index}`}
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
                        disabled={editProjectFormik.isSubmitting}
                      >
                        <PlusCircle size={16} className="mr-2" /> Add Bullet
                      </Button>
                    </div>
                  )}
                />
              </div>

              {/* Project Links */}
              <div className="border-2 rounded-lg border-[#293431] p-3 my-2">
                <Label className="font-bold mb-2 block">Project Links</Label>
                <FieldArray
                  name="projectLinks"
                  render={(arrayHelpers) => (
                    <div>
                      {editProjectFormik.values.projectLinks?.map(
                        (link, index) => (
                          <div
                            key={`${projectId}-link-${index}`}
                            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 items-start my-2 p-2 border border-dashed border-gray-400 rounded"
                          >
                            <div>
                              <Label
                                htmlFor={`projectLinks[${index}].name`}
                                className="text-sm"
                              >
                                Name
                              </Label>
                              <Input
                                id={`projectLinks[${index}].name`}
                                name={`projectLinks[${index}].name`}
                                placeholder="e.g., GitHub Repo"
                                className="mt-1 w-full border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                                onChange={editProjectFormik.handleChange}
                                onBlur={editProjectFormik.handleBlur}
                                value={link.name}
                              />
                              {editProjectFormik.touched.projectLinks?.[index]
                                ?.name &&
                                editProjectFormik.errors.projectLinks?.[index]
                                  ?.name && (
                                  <p className="text-sm text-red-600 mt-1">
                                    {
                                      editProjectFormik.errors.projectLinks[
                                        index
                                      ].name
                                    }
                                  </p>
                                )}
                            </div>
                            <div>
                              <Label
                                htmlFor={`projectLinks[${index}].url`}
                                className="text-sm"
                              >
                                URL
                              </Label>
                              <Input
                                id={`projectLinks[${index}].url`}
                                name={`projectLinks[${index}].url`}
                                placeholder="https://github.com/..."
                                className="mt-1 w-full border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                                onChange={editProjectFormik.handleChange}
                                onBlur={editProjectFormik.handleBlur}
                                value={link.url}
                              />
                              {editProjectFormik.touched.projectLinks?.[index]
                                ?.url &&
                                editProjectFormik.errors.projectLinks?.[index]
                                  ?.url && (
                                  <p className="text-sm text-red-600 mt-1">
                                    {
                                      editProjectFormik.errors.projectLinks[
                                        index
                                      ].url
                                    }
                                  </p>
                                )}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100 p-1 mt-auto self-center md:mt-6" // Align button
                              onClick={() =>
                                handleDeleteFromArray(
                                  index,
                                  "projectLinks",
                                  arrayHelpers
                                )
                              }
                              disabled={
                                editProjectFormik.isSubmitting ||
                                editProjectFormik.values.projectLinks.length <=
                                  1
                              }
                            >
                              <CircleX size={20} />
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => arrayHelpers.push({ name: "", url: "" })}
                        className="mt-2"
                        disabled={editProjectFormik.isSubmitting}
                      >
                        <PlusCircle size={16} className="mr-2" /> Add Link
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
                  editProjectFormik.isSubmitting || !editProjectFormik.dirty
                }
              >
                {editProjectFormik.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditDialog;
