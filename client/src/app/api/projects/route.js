import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as projectService from "@/services/projectService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

// Since the app is being deployed in vercel same origin no need to setup cors.
// But other origin need to make api calls later setup cors is done here

export async function GET(request) {
  try {
    await connectDB();
    const projects = await projectService.getAllProjectsService();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error fetching projects" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function POST(request) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode || 401 }
    );
  }
  try {
    await connectDB();
    const body = await request.json();
    const message = await projectService.createProjectService(body);

    return new NextResponse(message, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: error.statusCode || 500 });
  }
}
