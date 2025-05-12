import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import * as educationService from "@/services/educationService";
import { protectRouteLogic } from "@/lib/adminAuthMiddleware";

export async function PATCH(request, { params }) {
  const authResult = await protectRouteLogic(request);
  if (!authResult.success) {
    return NextResponse.json(
      { message: authResult.message },
      { status: authResult.statusCode }
    );
  }

  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();

    if (!body || typeof body.bullet !== "string") {
      return NextResponse.json(
        { message: "Bullet content to delete (string) is required" },
        { status: 400 }
      );
    }
    const result = await educationService.deleteEducationBulletService(
      id,
      body
    );
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error.statusCode === 404) {
      return new NextResponse(error.message, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Error deleting bullet point" },
      { status: error.statusCode || 500 }
    );
  }
}
