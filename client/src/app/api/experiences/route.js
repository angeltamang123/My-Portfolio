import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as experienceService from "@/services/experienceService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function GET(request) {
  try {
    await connectDB();
    const experiences = await experienceService.getAllExperiencesService();
    return NextResponse.json(experiences, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error fetching experiences" },
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
    const message = await experienceService.createExperienceService(body);
    return new NextResponse(message, { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: error.statusCode || 500 });
  }
}
