import { NextResponse } from "next/server";
import * as adminAuthService from "@/services/adminAuthService";
export async function POST(request) {
  try {
    const body = await request.json();
    const { accessKey } = body;

    const result = await adminAuthService.loginAdminService(accessKey);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("API_ERROR (POST /admin):", error);
    return NextResponse.json(
      { message: error.message || "Authentication failed" },
      { status: error.statusCode || 500 }
    );
  }
}
