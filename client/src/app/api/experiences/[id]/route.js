import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as experienceService from "@/services/experienceService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = context.params;
    const experience = await experienceService.getExperienceByIdService(id);
    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error fetching experience" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function PATCH(request, context) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode || 401 }
    );
  }
  try {
    await connectDB();
    const { id } = context.params;
    const body = await request.json();
    const result = await experienceService.updateExperienceService(id, body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error updating experience" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(request, context) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode || 401 }
    );
  }
  try {
    await connectDB();
    const { id } = context.params;
    const result = await experienceService.deleteExperienceService(id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error deleting experience" },
      { status: error.statusCode || 500 }
    );
  }
}
