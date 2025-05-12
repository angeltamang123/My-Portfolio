import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as educationService from "@/services/educationService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function GET(request, context) {
  try {
    await connectDB();
    const { id } = context.params;
    const education = await educationService.getEducationByIdService(id);
    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error fetching education" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function PATCH(request, context) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode }
    );
  }

  try {
    await connectDB();
    const { id } = context.params;
    const body = await request.json();
    const result = await educationService.updateEducationService(id, body);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error updating education" },
      { status: error.statusCode || 500 }
    );
  }
}

export async function DELETE(request, context) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode }
    );
  }

  try {
    await connectDB();
    const { id } = context.params;
    const result = await educationService.deleteEducationService(id);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error deleting education" },
      { status: error.statusCode || 500 }
    );
  }
}
