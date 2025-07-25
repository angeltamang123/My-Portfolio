"use client";
import MyName from "@/components/myName";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import api from "@/lib/adminAxiosInstance"; // Custom axios instance for request and response interception
import { toast } from "sonner";
import { useMediaQuery } from "@mui/material";

const Admin = () => {
  const router = useRouter();
  const [accessKey, setAccessKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = sessionStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }

    // Check for redirect reason in sub paths and show toast
    const reason = sessionStorage.getItem("redirectReason");
    if (reason === "authRequired") {
      toast.error("Please log in to access requested page.");
      sessionStorage.removeItem("redirectReason"); // Clear the flag
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post(`/api/admin`, { accessKey });
      if (response.data.token) {
        sessionStorage.setItem("adminToken", response.data.token);
        setIsAuthenticated(true);
        toast.success("Login successful!");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please check the key.";
      toast.error(errorMessage);
      sessionStorage.removeItem("adminToken");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    router.push("/");
    toast.info("Logged out.");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col bg-[#151616] min-h-screen items-center">
        <div className="flex flex-col w-11/12 md:w-1/3 p-8 border border-t-4 mt-42 rounded border-[#293431] bg-[#1e1f1f]">
          <MyName className="justify-center mb-6 text-white font-black" />
          <h2 className="text-2xl text-white font-bold mb-6 text-center">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="accessKey"
                className="block text-sm font-medium text-gray-300"
              >
                Admin Access Key
              </label>
              <input
                type="password"
                id="accessKey"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-[#293431] border border-gray-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#151616] min-h-screen items-center">
      <div className="flex flex-col w-11/12 border border-t-4 mt-12 rounded border-[#293431]">
        <div className="flex flex-col mt-2 border-b-4 w-full border-[#293431]">
          <MyName className="justify-center mb-2 text-white font-black mt-10" />
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
        <button
          onClick={handleLogout}
          className="mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Admin;
