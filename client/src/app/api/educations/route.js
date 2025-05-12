// client/src/app/api/educations/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as educationService from "@/services/educationService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";
export async function GET(request) {
  try {
    await connectDB();
    const educations = await educationService.getAllEducationsService();
    return NextResponse.json(educations, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Error fetching educations" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function POST(request) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode }
    );
  }

  try {
    await connectDB();
    const body = await request.json();
    const result = await educationService.createEducationService(body);
    return new NextResponse(result.message, { status: 201 }); // Using 201 for created
  } catch (error) {
    return new NextResponse(error.message, { status: error.statusCode || 500 });
  }
}
