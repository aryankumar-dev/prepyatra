import { asyncHandler } from "#utils/async-handler.js";
import ApiResponse from "#utils/api-response.js";
import { Resource } from "#models/resource.models.js";

const getResources = asyncHandler(async (req, res) => {
    const { courseId } = req.query;
    const filter = courseId ? { courseId } : {};
    const resources = await Resource.find(filter).sort({ createdAt: -1 });

    res.status(200).json(new ApiResponse(200, resources, "Resources retrieved successfully"));
});

const createResource = asyncHandler(async (req, res) => {
    const { courseId, title, url, description, type } = req.body;
    const resource = await Resource.create({ courseId, title, url, description, type });

    res.status(201).json(new ApiResponse(201, resource, "Resource created successfully"));
});

export { getResources, createResource };
