import jwt from "jsonwebtoken";

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function loginAdminService(accessKey) {
  if (!accessKey) {
    throw new ApiError(400, "Access key is required");
  }

  if (!process.env.ADMIN_ACCESS_KEY || !process.env.JWT_SECRET) {
    console.error(
      "ADMIN_ACCESS_KEY or JWT_SECRET is not defined in environment variables."
    );
    throw new ApiError(500, "Server configuration error.");
  }

  if (accessKey === process.env.ADMIN_ACCESS_KEY) {
    const token = jwt.sign(
      { id: "admin_user", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { token };
  } else {
    throw new ApiError(401, "Invalid access key");
  }
}
