"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CircleX } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

const ProjectsForm = () => {
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
        name: Yup.string().min(3, "Too Short!"),
        url: Yup.string().url("Must be a valid URL!"),
      })
    ),
  });

  const projectsFormik = useFormik({
    initialValues: {
      projectName: "",
      projectDetails: "",
      projectBullets: [""],
      status: "",
      projectType: "",
      projectLinks: [{ name: "", url: "" }],
    },
    onSubmit: async (values) => {
      try {
        const data = await addProject(values);
        toast("Success", {
          description: "The project has been added.",
          classNames: {
            description: "!text-black",
          },
        });
        projectsFormik.resetForm();
        if (data == "This project already exists!") {
          toast("Duplicate Project", {
            description: "The project being added already exists.",
            classNames: {
              toast: "!bg-red-400", // This makes toast red to show destructive nature, also ! is necessary to override default styling
              description: "!text-black",
            },
          });
        } else {
        }
      } catch (err) {
        if (err.response?.data === "This project already exists!") {
          toast("Duplicate Project", {
            description: "The project being added already exists.",
            classNames: {
              toast: "!bg-red-400",
              description: "!text-black",
            },
          });
        } else {
          toast("Uh oh! Something went wrong.", {
            description: err?.message || "Unexpected error occurred.",
            classNames: {
              toast: "!bg-red-400",
              description: "!text-black",
            },
          });
        }
      }
    },

    validationSchema: projectsSchema,
  });

  const addProject = async (values) => {
    const { data } = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/projects`,
      values
    );
    return data;
  };

  return (
    <Card className="w-[500px] md:w-[1000px] border-[#151616] bg-gradient-to-b from-[#45AA96] to-[#05CEA8]">
      <CardHeader>
        <CardTitle className="border-b-2 border-black py-1.5">
          Add a project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormikProvider value={projectsFormik}>
          <form onSubmit={projectsFormik.handleSubmit}>
            <div className="flex flex-col">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="projectName" className="font-bold">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  placeholder="Project XYZ"
                  className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  type="text"
                  onChange={projectsFormik.handleChange}
                  onBlur={projectsFormik.handleBlur}
                  value={projectsFormik.values.projectName}
                />
                {projectsFormik.touched.projectName &&
                  projectsFormik.errors.projectName && (
                    <p className="text-sm text-red-600">
                      {projectsFormik.errors.projectName}
                    </p>
                  )}
                <div className="flex gap-16 md:gap-50 ">
                  <div className="flex flex-col">
                    <Label htmlFor="status" className="font-bold my-2">
                      Project Status
                    </Label>
                    <Select
                      id="status"
                      onValueChange={(value) =>
                        projectsFormik.setFieldValue("status", value)
                      }
                      value={projectsFormik.values.status}
                    >
                      <SelectTrigger className="w-[180px] border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl ">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="font-bold">
                            Status
                          </SelectLabel>
                          <SelectItem value="In-Progress">
                            In-Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {projectsFormik.touched.status &&
                      projectsFormik.errors.status && (
                        <p className="text-sm text-red-600">
                          {projectsFormik.errors.status}
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col">
                    <Label htmlFor="projectType" className="font-bold my-2">
                      Project Type
                    </Label>
                    <Select
                      id="projectType"
                      onValueChange={(value) =>
                        projectsFormik.setFieldValue("projectType", value)
                      }
                      value={projectsFormik.values.projectType}
                    >
                      <SelectTrigger className="w-[200px] border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl ">
                        <SelectValue placeholder="Select Project Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="font-bold">
                            Project Type
                          </SelectLabel>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Web Development">
                            Web Development
                          </SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {projectsFormik.touched.projectType &&
                      projectsFormik.errors.projectType && (
                        <p className="text-sm text-red-600">
                          {projectsFormik.errors.projectType}
                        </p>
                      )}
                  </div>
                </div>

                <div className="border-2 rounded-2xl border-[#293431] p-2 my-1.5">
                  <Label htmlFor="projectLinks" className="font-bold my-2">
                    Project Links
                  </Label>
                  <FieldArray
                    name="projectLinks"
                    id="projectLinks"
                    render={(arrayHelpers) => (
                      <div>
                        {projectsFormik.values.projectLinks.map(
                          (link, index) => (
                            <div
                              key={index}
                              className="flex-col md:flex md:flex-row gap-10 my-1.5"
                            >
                              <div>
                                <Input
                                  placeholder="Link name"
                                  name={`projectLinks[${index}].name`}
                                  value={
                                    projectsFormik.values.projectLinks[index]
                                      .name
                                  }
                                  onChange={projectsFormik.handleChange}
                                  onBlur={projectsFormik.handleBlur}
                                  className="w-85 my-1.5 md:m-0 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                                />
                                {projectsFormik.touched.projectLinks?.[index]
                                  ?.name &&
                                  projectsFormik.errors.projectLinks?.[index]
                                    ?.name && (
                                    <p className="text-red-600 text-sm">
                                      {
                                        projectsFormik.errors.projectLinks[
                                          index
                                        ].name
                                      }
                                    </p>
                                  )}
                              </div>
                              <div>
                                <Input
                                  placeholder="https://your-url.com"
                                  name={`projectLinks[${index}].url`}
                                  value={
                                    projectsFormik.values.projectLinks[index]
                                      .url
                                  }
                                  onChange={projectsFormik.handleChange}
                                  onBlur={projectsFormik.handleBlur}
                                  className="w-85 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                                />
                                {projectsFormik.touched.projectLinks?.[index]
                                  ?.url &&
                                  projectsFormik.errors.projectLinks?.[index]
                                    ?.url && (
                                    <p className="text-red-600 text-sm">
                                      {
                                        projectsFormik.errors.projectLinks[
                                          index
                                        ].url
                                      }
                                    </p>
                                  )}
                              </div>
                              <div className="flex relative md:absolute mr-18 md:ml-182 md:mr-0 mt-1 item-center justify-center">
                                <CircleX
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="cursor-pointer text-red-600"
                                />
                              </div>
                            </div>
                          )
                        )}
                        <div className="flex justify-center md:justify-normal mr-18 md:mr-0">
                          <Button
                            type="button"
                            onClick={() =>
                              arrayHelpers.push({ name: "", url: "" })
                            }
                            className="mt-2"
                          >
                            Add Project Link
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <Label
                  htmlFor="projectDetails"
                  id="projectDetails"
                  className="font-bold my-1.5"
                >
                  Project Details
                </Label>
                <Textarea
                  placeholder="Write Project Details here."
                  className="border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                />

                <div className="border-2 rounded-2xl border-[#293431] p-2 my-4">
                  <Label htmlFor="projectBullets" className="font-bold my-2">
                    Project Bullet Points
                  </Label>
                  <FieldArray
                    name="projectBullets"
                    render={(arrayHelpers) => (
                      <div>
                        {projectsFormik.values.projectBullets.map(
                          (bullet, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 my-2"
                            >
                              <Input
                                placeholder={`Bullet Point ${index + 1}`}
                                name={`projectBullets[${index}]`}
                                value={
                                  projectsFormik.values.projectBullets[index]
                                }
                                onChange={projectsFormik.handleChange}
                                onBlur={projectsFormik.handleBlur}
                                className="w-full border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              />
                              <CircleX
                                className="cursor-pointer text-red-600"
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            </div>
                          )
                        )}
                        <div className="flex justify-center md:justify-normal">
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push("")}
                            className="mt-2"
                          >
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                    )}
                  />
                </div>

                <Button
                  className="w-full mt-3.5 border-2 rounded-2xl border-emerald-900 hover:shadow-2xl hover:scale-105 active:scale-95 hover:border-blue-500"
                  type="submit"
                >
                  Add Project
                </Button>
              </div>
            </div>
          </form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
};

export default ProjectsForm;
