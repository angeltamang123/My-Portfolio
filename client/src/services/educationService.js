import Education from "@/app/models/educations";

// Helper to create a structured error
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function createEducationService(data) {
  const isExist = await Education.exists({ educationName: data.educationName });
  if (isExist) {
    throw new ApiError(409, "This education already exists!");
  }
  await Education.create(data);

  return "Education added successfully";
}

export async function getAllEducationsService() {
  try {
    const educations = await Education.find();
    return educations;
  } catch (err) {
    throw new ApiError(500, "Error fetching educations");
  }
}

export async function getEducationByIdService(id) {
  try {
    const education = await Education.findById(id);
    if (!education) {
      throw new ApiError(404, "Education not found");
    }
    return education;
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error fetching education"
    );
  }
}

export async function updateEducationService(id, data) {
  try {
    const updated = await Education.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new ApiError(404, "Education not found");
    }

    return { message: "Education updated", education: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error updating education"
    );
  }
}

export async function deleteEducationService(id) {
  try {
    const deleted = await Education.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Education not found");
    }
    return { message: "Education deleted" };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting education"
    );
  }
}

export async function addEducationBulletService(id, bulletData) {
  try {
    const education = await Education.findById(id);
    if (!education) {
      throw new ApiError(404, "Education not found");
    }
    if (education.educationBullets.includes(bulletData.bullet)) {
      throw new ApiError(409, "This bullet point already exists");
    }
    const added = await Education.findByIdAndUpdate(
      id,
      { $push: { educationBullets: bulletData.bullet } },
      { new: true }
    );
    if (!added) {
      throw new ApiError(404, "Education not found (during bullet add)");
    }
    return { message: "Bullet point added successfully", education: added };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error adding bullet point"
    );
  }
}

export async function deleteEducationBulletService(id, bulletData) {
  try {
    const education = await Education.findById(id);
    if (!education) {
      throw new ApiError(404, "Education not found");
    }
    if (!education.educationBullets.includes(bulletData.bullet)) {
      throw new ApiError(404, "Bullet point not found");
    }
    const updated = await Education.findByIdAndUpdate(
      id,
      { $pull: { educationBullets: bulletData.bullet } },
      { new: true }
    );
    return { message: "Bullet point deleted successfully", education: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting bullet point"
    );
  }
}
