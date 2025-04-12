const mongoose = require("mongoose");
const { read } = require("read");

const connect = async () => {
  if (
    !process.env.MONGODB_USER ||
    !process.env.MONGODB_CLUSTER ||
    !process.env.MONGODB_DB
  ) {
    console.error(
      "Error: Missing required MongoDB environment variables (MONGODB_USER, MONGODB_CLUSTER, MONGODB_DB)."
    );
    process.exit(1);
  }

  try {
    const password = await read({
      silent: true, // This hides the input
      replace: "*", // Optional: Show '*' instead of nothing,
      terminal: true,
      prompt: "Enter MongoDB password: ",
    });

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${encodeURIComponent(
      password
    )}@${process.env.MONGODB_CLUSTER}/${
      process.env.MONGODB_DB
    }/?retryWrites=true&w=majority&appName=Cluster0`;

    console.log("Connecting to MongoDB Atlas..."); // Give feedback before connection attempt

    await mongoose.connect(uri).then(() => {
      console.log("MongoDB Atlas connected successfully.");
    });
  } catch (err) {
    let errorMessage = "MongoDB Atlas connection error.";
    if (err.message.includes("authentication failed")) {
      errorMessage =
        "MongoDB Atlas connection error: Authentication failed. Please check your password.";
    } else {
      errorMessage = `MongoDB Atlas connection error: ${err.message}`;
    }
    console.error(errorMessage);
    throw err;
  }
};

module.exports = connect;
