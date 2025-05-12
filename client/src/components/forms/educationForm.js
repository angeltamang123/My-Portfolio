"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { FieldArray, FormikProvider, useFormik } from "formik";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { CircleX } from "lucide-react";
import { toast } from "sonner";

const EducationsForm = () => {
  const educationsSchema = Yup.object().shape({
    educationName: Yup.string() // e.g., B.Sc. Computer Science
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Degree/Certificate name is required"),
    educationOrganization: Yup.string() // e.g., University Name
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Institution name is required"),
    educationOrganizationLocation: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!"), // Optional
    educationDetails: Yup.string().min(5, "Too Short!"), // Optional
    educationBullets: Yup.array().of(Yup.string().min(3, "Too short")),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .nullable()
      .min(Yup.ref("startDate"), "End date can't be before start date"),
  });

  const educationsFormik = useFormik({
    initialValues: {
      educationName: "",
      educationOrganization: "",
      educationOrganizationLocation: "",
      educationDetails: "",
      educationBullets: [""],
      startDate: "",
      endDate: "",
    },
    validationSchema: educationsSchema,
    onSubmit: async (values) => {
      try {
        const submissionValues = {
          ...values,
          endDate: values.endDate || null,
        };
        const data = await addEducation(submissionValues);
        toast("Success", {
          description: "The education entry has been added.",
          classNames: { description: "!text-black" },
        });
        educationsFormik.resetForm();
        if (data === "This education entry already exists!") {
          // Adjust message
          toast("Duplicate Education", {
            description: "The education entry being added already exists.",
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
          toast("Duplicate Education", {
            description: "This education entry might already exist.",
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

  const addEducation = async (values) => {
    const { data } = await api.post(`/api/educations`, values);
    return data;
  };

  return (
    <Card className="w-[500px] md:w-[1000px] border-[#151616] bg-gradient-to-b from-[#45AA96] to-[#05CEA8]">
      <CardHeader>
        <CardTitle className="border-b-2 border-black py-1.5">
          Add Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormikProvider value={educationsFormik}>
          <form onSubmit={educationsFormik.handleSubmit}>
            <div className="flex flex-col space-y-3">
              {/* Education Name */}
              <div>
                <Label htmlFor="educationName" className="font-bold">
                  Degree / Certificate Name
                </Label>
                <Input
                  id="educationName"
                  name="educationName"
                  placeholder="e.g., B.Sc. Computer Science, High School Diploma"
                  className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  type="text"
                  onChange={educationsFormik.handleChange}
                  onBlur={educationsFormik.handleBlur}
                  value={educationsFormik.values.educationName}
                />
                {educationsFormik.touched.educationName &&
                  educationsFormik.errors.educationName && (
                    <p className="text-sm text-red-600">
                      {educationsFormik.errors.educationName}
                    </p>
                  )}
              </div>

              {/* Education Organization */}
              <div>
                <Label htmlFor="educationOrganization" className="font-bold">
                  Institution Name
                </Label>
                <Input
                  id="educationOrganization"
                  name="educationOrganization"
                  placeholder="e.g., University of Technology, Local High School"
                  className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  type="text"
                  onChange={educationsFormik.handleChange}
                  onBlur={educationsFormik.handleBlur}
                  value={educationsFormik.values.educationOrganization}
                />
                {educationsFormik.touched.educationOrganization &&
                  educationsFormik.errors.educationOrganization && (
                    <p className="text-sm text-red-600">
                      {educationsFormik.errors.educationOrganization}
                    </p>
                  )}
              </div>

              {/* Education Organization Location */}
              <div>
                <Label
                  htmlFor="educationOrganizationLocation"
                  className="font-bold"
                >
                  Institution Location (Optional)
                </Label>
                <Input
                  id="educationOrganizationLocation"
                  name="educationOrganizationLocation"
                  placeholder="e.g., City, Country"
                  className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  type="text"
                  onChange={educationsFormik.handleChange}
                  onBlur={educationsFormik.handleBlur}
                  value={educationsFormik.values.educationOrganizationLocation}
                />
                {educationsFormik.touched.educationOrganizationLocation &&
                  educationsFormik.errors.educationOrganizationLocation && (
                    <p className="text-sm text-red-600">
                      {educationsFormik.errors.educationOrganizationLocation}
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
                    onChange={educationsFormik.handleChange}
                    onBlur={educationsFormik.handleBlur}
                    value={educationsFormik.values.startDate}
                  />
                  {educationsFormik.touched.startDate &&
                    educationsFormik.errors.startDate && (
                      <p className="text-sm text-red-600">
                        {educationsFormik.errors.startDate}
                      </p>
                    )}
                </div>
                <div className="flex flex-col space-y-1.5 flex-1">
                  <Label htmlFor="endDate" className="font-bold">
                    End Date (or Expected)
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    className="border-2 border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                    type="date"
                    onChange={educationsFormik.handleChange}
                    onBlur={educationsFormik.handleBlur}
                    value={educationsFormik.values.endDate}
                  />
                  {educationsFormik.touched.endDate &&
                    educationsFormik.errors.endDate && (
                      <p className="text-sm text-red-600">
                        {educationsFormik.errors.endDate}
                      </p>
                    )}
                </div>
              </div>

              {/* Education Details */}
              <div>
                <Label htmlFor="educationDetails" className="font-bold my-1.5">
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id="educationDetails"
                  name="educationDetails"
                  placeholder="e.g., GPA, Thesis, Relevant coursework..."
                  className="border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                  onChange={educationsFormik.handleChange}
                  onBlur={educationsFormik.handleBlur}
                  value={educationsFormik.values.educationDetails}
                />
                {educationsFormik.touched.educationDetails &&
                  educationsFormik.errors.educationDetails && (
                    <p className="text-sm text-red-600">
                      {educationsFormik.errors.educationDetails}
                    </p>
                  )}
              </div>

              {/* Education Bullets */}
              <div className="border-2 rounded-2xl border-[#293431] p-2 my-1.5">
                <Label
                  htmlFor="educationBullets"
                  className="font-bold my-2 block"
                >
                  Key Learnings / Bullet Points (Optional)
                </Label>
                <FieldArray
                  name="educationBullets"
                  render={(arrayHelpers) => (
                    <div>
                      {educationsFormik.values.educationBullets.map(
                        (bullet, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 my-2"
                          >
                            <Input
                              id={`educationBullets[${index}]`}
                              name={`educationBullets[${index}]`}
                              placeholder={`Bullet Point ${index + 1}`}
                              className="w-full border-[#293431] focus:border-[#151616] focus:shadow-2xl"
                              type="text"
                              onChange={educationsFormik.handleChange}
                              onBlur={educationsFormik.handleBlur}
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
                      {educationsFormik.touched.educationBullets &&
                        Array.isArray(
                          educationsFormik.errors.educationBullets
                        ) &&
                        educationsFormik.errors.educationBullets.map(
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
                disabled={educationsFormik.isSubmitting}
              >
                {educationsFormik.isSubmitting ? "Adding..." : "Add Education"}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </CardContent>
    </Card>
  );
};

export default EducationsForm;
