"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input"; // Assuming Input is in ../ui/input
import { Textarea } from "../ui/textarea"; // Assuming Textarea is in ../ui/textarea
import { CircleX } from "lucide-react";
import { toast } from "sonner";

const ExperiencesForm = () => {
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
    experienceDetails: Yup.string().min(5, "Too Short!"), // Optional
    experienceBullets: Yup.array().of(Yup.string().min(3, "Too short")),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End date can't be before start date"),
  });

  const experiencesFormik = useFormik({
    initialValues: {
      experienceName: [""], // Array of roles/titles
      experienceOrganization: "",
      experienceDetails: "",
      experienceBullets: [""],
      startDate: "",
      endDate: "",
    },
    validationSchema: experiencesSchema,
    onSubmit: async (values) => {
      try {
        // Convert empty endDate to null for the backend
        const submissionValues = {
          ...values,
          endDate: values.endDate || null,
        };
        const data = await addExperience(submissionValues);
        toast("Success", {
          description: "The experience has been added.",
          classNames: { description: "!text-black" },
        });
        experiencesFormik.resetForm();
        // Assuming the duplicate check logic is similar
        if (data === "This experience already exists!") {
          // Adjust message as per your API
          toast("Duplicate Experience", {
            description: "The experience being added already exists.",
            classNames: {
              toast: "!bg-red-400",
              description: "!text-black",
            },
          });
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          "Unexpected error occurred.";
        if (errorMessage.toLowerCase().includes("already exists")) {
          // More generic duplicate check
          toast("Duplicate Experience", {
            description: "This experience might already exist.",
            classNames: { toast: "!bg-red-400", description: "!text-black" },
          });
        } else {
          toast("Uh oh! Something went wrong.", {
            description: errorMessage,
            classNames: { toast: "!bg-red-400", description: "!text-black" },
          });
        }
      }
    },
  });

  const addExperience = async (values) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/experiences`, // Ensure this endpoint is correct
      values
    );
    return data;
  };

  return (
    <Card className="w-[500px] md:w-[1000px] border-[#151616] bg-gradient-to-b from-[#45AA96] to-[#05CEA8]">
      <CardHeader>
        <CardTitle className="border-b-2 border-black py-1.5">
          Add an Experience
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormikProvider value={experiencesFormik}>
          <form onSubmit={experiencesFormik.handleSubmit}>
            <div className="flex flex-col space-y-3">
              {/* Experience Name (FieldArray) */}
              <div className="border-2 rounded-2xl border-[#293431] p-2 my-1.5">
                <Label
                  htmlFor="experienceName"
                  className="font-bold my-2 block"
                >
                  Role(s) / Title(s)
                </Label>
                <FieldArray
                  name="experienceName"
                  render={(arrayHelpers) => (
                    <div>
                      {experiencesFormik.values.experienceName.map(
                        (name, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 my-2"
                          >
                            <Input
                              id={`experienceName[${index}]`}
                              name={`experienceName[${index}]`}
                              placeholder={`Role/Title ${index + 1}`}
                              className="w-full border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              type="text"
                              onChange={experiencesFormik.handleChange}
                              onBlur={experiencesFormik.handleBlur}
                              value={name}
                            />

                            <CircleX
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="cursor-pointer text-red-600"
                            />
                          </div>
                        )
                      )}
                      {experiencesFormik.touched.experienceName &&
                        typeof experiencesFormik.errors.experienceName ===
                          "string" && (
                          <p className="text-sm text-red-600">
                            {experiencesFormik.errors.experienceName}
                          </p>
                        )}
                      {/* Error for individual item if any, e.g. a specific role is too short */}
                      {experiencesFormik.touched.experienceName &&
                        Array.isArray(
                          experiencesFormik.errors.experienceName
                        ) &&
                        experiencesFormik.errors.experienceName.map(
                          (error, index) =>
                            error && (
                              <p key={index} className="text-sm text-red-600">
                                {error}
                              </p>
                            )
                        )}
                      <div className="flex justify-center md:justify-normal">
                        <Button
                          type="button"
                          onClick={() => arrayHelpers.push("")}
                          className="mt-2"
                        >
                          Add Another Role/Title
                        </Button>
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Experience Organization */}
              <div>
                <Label htmlFor="experienceOrganization" className="font-bold">
                  Organization
                </Label>
                <Input
                  id="experienceOrganization"
                  name="experienceOrganization"
                  placeholder="Company XYZ / University ABC"
                  className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  type="text"
                  onChange={experiencesFormik.handleChange}
                  onBlur={experiencesFormik.handleBlur}
                  value={experiencesFormik.values.experienceOrganization}
                />
                {experiencesFormik.touched.experienceOrganization &&
                  experiencesFormik.errors.experienceOrganization && (
                    <p className="text-sm text-red-600">
                      {experiencesFormik.errors.experienceOrganization}
                    </p>
                  )}
              </div>

              {/* Start Date and End Date */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="startDate" className="font-bold">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    type="date"
                    onChange={experiencesFormik.handleChange}
                    onBlur={experiencesFormik.handleBlur}
                    value={experiencesFormik.values.startDate}
                  />
                  {experiencesFormik.touched.startDate &&
                    experiencesFormik.errors.startDate && (
                      <p className="text-sm text-red-600">
                        {experiencesFormik.errors.startDate}
                      </p>
                    )}
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="endDate" className="font-bold">
                    End Date (leave blank if current)
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    type="date"
                    onChange={experiencesFormik.handleChange}
                    onBlur={experiencesFormik.handleBlur}
                    value={experiencesFormik.values.endDate}
                  />
                  {experiencesFormik.touched.endDate &&
                    experiencesFormik.errors.endDate && (
                      <p className="text-sm text-red-600">
                        {experiencesFormik.errors.endDate}
                      </p>
                    )}
                </div>
              </div>

              {/* Experience Details */}
              <div>
                <Label htmlFor="experienceDetails" className="font-bold my-1.5">
                  Details (Optional)
                </Label>
                <Textarea
                  id="experienceDetails"
                  name="experienceDetails"
                  placeholder="Describe your role and responsibilities..."
                  className="border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={experiencesFormik.handleChange}
                  onBlur={experiencesFormik.handleBlur}
                  value={experiencesFormik.values.experienceDetails}
                />
                {experiencesFormik.touched.experienceDetails &&
                  experiencesFormik.errors.experienceDetails && (
                    <p className="text-sm text-red-600">
                      {experiencesFormik.errors.experienceDetails}
                    </p>
                  )}
              </div>

              {/* Experience Bullets */}
              <div className="border-2 rounded-2xl border-[#293431] p-2 my-1.5">
                <Label
                  htmlFor="experienceBullets"
                  className="font-bold my-2 block"
                >
                  Key Achievements / Bullet Points
                </Label>
                <FieldArray
                  name="experienceBullets"
                  render={(arrayHelpers) => (
                    <div>
                      {experiencesFormik.values.experienceBullets.map(
                        (bullet, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 my-2"
                          >
                            <Input
                              id={`experienceBullets[${index}]`}
                              name={`experienceBullets[${index}]`}
                              placeholder={`Bullet Point ${index + 1}`}
                              className="w-full border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              type="text"
                              onChange={experiencesFormik.handleChange}
                              onBlur={experiencesFormik.handleBlur}
                              value={bullet}
                            />
                            <CircleX
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="cursor-pointer text-red-600"
                            />
                          </div>
                        )
                      )}
                      {/* Error for individual bullet point */}
                      {experiencesFormik.touched.experienceBullets &&
                        Array.isArray(
                          experiencesFormik.errors.experienceBullets
                        ) &&
                        experiencesFormik.errors.experienceBullets.map(
                          (error, index) =>
                            error && (
                              <p key={index} className="text-sm text-red-600">
                                {error}
                              </p>
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
                disabled={experiencesFormik.isSubmitting}
              >
                {experiencesFormik.isSubmitting
                  ? "Adding..."
                  : "Add Experience"}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
};

export default ExperiencesForm;
