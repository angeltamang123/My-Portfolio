import Experience from "@/app/models/experiences";

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function createExperienceService(data) {
  await Experience.create(data);
  return "Experience added successfully";
}

export async function getAllExperiencesService() {
  try {
    const experiences = await Experience.find();
    return experiences;
  } catch (err) {
    throw new ApiError(500, "Error fetching experiences");
  }
}

export async function getExperienceByIdService(id) {
  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new ApiError(404, "Experience not found");
    }
    return experience;
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error fetching experience"
    );
  }
}

export async function updateExperienceService(id, data) {
  try {
    const updated = await Experience.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new ApiError(404, "Experience not found");
    }
    return { message: "Experience updated", experience: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error updating experience"
    );
  }
}

export async function deleteExperienceService(id) {
  try {
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Experience not found");
    }
    return { message: "Experience deleted" };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting experience"
    );
  }
}

export async function addExperienceBulletService(id, bulletData) {
  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new ApiError(404, "Experience not found");
    }
    if (experience.experienceBullets.includes(bulletData.bullet)) {
      throw new ApiError(409, "This bullet point already exists");
    }
    const updated = await Experience.findByIdAndUpdate(
      id,
      { $push: { experienceBullets: bulletData.bullet } },
      { new: true }
    );
    if (!updated) {
      throw new ApiError(404, "Experience not found (during bullet add)");
    }
    return { message: "Bullet point added successfully", experience: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error adding bullet point"
    );
  }
}

export async function deleteExperienceBulletService(id, bulletData) {
  try {
    const experience = await Experience.findById(id);
    if (!experience) {
      throw new ApiError(404, "Experience not found");
    }
    if (!experience.experienceBullets.includes(bulletData.bullet)) {
      throw new ApiError(404, "Bullet point not found");
    }
    const updated = await Experience.findByIdAndUpdate(
      id,
      { $pull: { experienceBullets: bulletData.bullet } },
      { new: true }
    );
    return {
      message: "Bullet point deleted successfully",
      experience: updated,
    };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting bullet point"
    );
  }
}
