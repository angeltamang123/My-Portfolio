"use client";
import MyName from "@/components/myName";
import NavigationBar from "@/components/navigationBar";
import { useRouter } from "next/navigation";
import React from "react";

const Admin = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <NavigationBar />
      <div className="flex flex-col w-11/12 border border-t-4 mt-12 rounded border-[#293431]">
        <div className="flex flex-col mt-2 border-b-4 w-full border-[#293431]">
          <MyName className="justify-center mb-2 text-white font-black" />
        </div>
        <div
          className="border-[#293431] border-t border-b hover:bg-[#293431] hover:cursor-pointer"
          onClick={() => {
            router.push("/admin/add");
          }}
        >
          <p className="p-5 mx-2 text-white font-black">Add new Entry</p>
        </div>
        <div
          className="border-[#293431] border-t border-b hover:bg-[#293431] hover:cursor-pointer"
          onClick={() => {
            router.push("/admin/edit");
          }}
        >
          <p className="p-5 mx-2 text-white font-black">Edit/Update an Entry</p>
        </div>
        <div
          className="border-[#293431] border-t border-b hover:bg-[#293431] hover:cursor-pointer"
          onClick={() => {
            router.push("/admin/delete");
          }}
        >
          <p className="p-5 mx-2 text-white font-black">Delete an Entry</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
