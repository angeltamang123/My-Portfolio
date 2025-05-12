import jwt from "jsonwebtoken";

export async function protectRouteLogic(request) {
  let token;
  const authorizationHeader = request.headers.get("authorization");

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    try {
      token = authorizationHeader.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return {
          success: false,
          message: "Server configuration error: JWT_SECRET missing",
          statusCode: 500,
        };
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return { success: true, user: decoded };
    } catch (error) {
      console.error("Token verification failed:", error.message);
      return {
        success: false,
        message: "Not authorized, token failed",
        statusCode: 401,
      };
    }
  }

  if (!token) {
    return {
      success: false,
      message: "Not authorized, no token or invalid token format",
      statusCode: 401,
    };
  }
}
