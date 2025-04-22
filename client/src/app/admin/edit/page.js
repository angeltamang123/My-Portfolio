"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const Edit = () => {
  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <Tabs defaultValue="Projects" className="w-[500px] md:w-[1000px] my-10">
        <TabsList className="grid w-full grow grid-cols-3 bg-[#293431]">
          <TabsTrigger value="Projects">Projects</TabsTrigger>
          <TabsTrigger value="Experiences">Experiences</TabsTrigger>
          <TabsTrigger value="Educations">Educations</TabsTrigger>
        </TabsList>
        <TabsContent value="Projects">
          <Card>
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Experiences">
          Change your Experiences here.
        </TabsContent>
        <TabsContent value="Educations">
          Change your Educations here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Edit;
