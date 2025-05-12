import Project from "@/app/models/projects";

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function createProjectService(data) {
  const isExist = await Project.exists({ projectName: data.projectName });
  if (isExist) {
    throw new ApiError(409, "This project already exists!");
  }
  await Project.create(data);
  return "Project added successfully";
}

export async function getAllProjectsService() {
  try {
    const projects = await Project.find();
    return projects;
  } catch (err) {
    throw new ApiError(500, "Error fetching projects");
  }
}

export async function getProjectByIdService(id) {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    return project;
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error fetching project"
    );
  }
}

export async function updateProjectService(id, data) {
  try {
    const updated = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      throw new ApiError(404, "Project not found");
    }

    return { message: "Project updated", project: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error updating project"
    );
  }
}

export async function deleteProjectService(id) {
  try {
    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, "Project not found");
    }

    return { message: "Project deleted" };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting project"
    );
  }
}

export async function addProjectBulletService(id, bulletData) {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    if (project.projectBullets.includes(bulletData.bullet)) {
      throw new ApiError(409, "This bullet point already exists");
    }
    const updated = await Project.findByIdAndUpdate(
      id,
      { $push: { projectBullets: bulletData.bullet } },
      { new: true }
    );
    if (!updated) {
      throw new ApiError(404, "Project not found (during bullet add)");
    }

    return { message: "Bullet point added successfully", project: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error adding bullet point"
    );
  }
}

export async function deleteProjectBulletService(id, bulletData) {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    if (!project.projectBullets.includes(bulletData.bullet)) {
      throw new ApiError(404, "Bullet point not found");
    }
    const updated = await Project.findByIdAndUpdate(
      id,
      { $pull: { projectBullets: bulletData.bullet } },
      { new: true }
    );

    return { message: "Bullet point deleted successfully", project: updated };
  } catch (err) {
    throw new ApiError(
      err.statusCode || 500,
      err.message || "Error deleting bullet point"
    );
  }
}
