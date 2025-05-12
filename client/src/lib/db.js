import mongoose from "mongoose";

if (
  !process.env.MONGODB_USER ||
  !process.env.MONGODB_CLUSTER ||
  !process.env.MONGODB_DB ||
  !process.env.MONGODB_PASSWORD
) {
  let missingVars = [];
  if (!process.env.MONGODB_USER) missingVars.push("MONGODB_USER");
  if (!process.env.MONGODB_CLUSTER) missingVars.push("MONGODB_CLUSTER");
  if (!process.env.MONGODB_DB) missingVars.push("MONGODB_DB");
  if (!process.env.MONGODB_PASSWORD) missingVars.push("MONGODB_PASSWORD");

  const errorMessage = `CRITICAL ERROR: Missing required MongoDB environment variables: ${missingVars.join(
    ", "
  )}. Check Vercel dashboard or .env.local.`;
  console.error(errorMessage);

  if (process.env.NODE_ENV === "development") {
    // Stop the dev server if critical config is missing
    console.log(
      "Halting development server due to missing MongoDB configuration."
    );
    process.exit(1);
  } else {
    // In production on Vercel, throw error to fail the function invocation
    throw new Error(errorMessage);
  }
}

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development AND across separate serverless function invocations.
 */
let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 15000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("MongoDB Atlas: New connection established successfully.");
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null; // Reset promise on error to allow retries
        let specificErrorMessage = "MongoDB Atlas connection error.";
        if (err.message && err.message.includes("authentication failed")) {
          specificErrorMessage =
            "MongoDB Atlas connection error: Authentication failed. Please check your credentials.";
        } else if (err.message) {
          specificErrorMessage = `MongoDB Atlas connection error: ${err.message}`;
        }
        console.error(specificErrorMessage, err); // Log the detailed error
        throw new Error(specificErrorMessage); // Re-throw a standardized error
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
