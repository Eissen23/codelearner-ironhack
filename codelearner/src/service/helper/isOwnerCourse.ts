// src/service/helper/isOwnerCourse.ts
import { CODELEARNER_API, pendingRequests } from "../api/clients/codelearner";

type OwnerResponse = {
  role: string;
};

export const isOwnerCourse = async (
  token: string,
  course_id: string
): Promise<OwnerResponse> => {
  const cacheKey = `get:/courses/${course_id}/is-own:${token}`;

  // Check if request is already in progress
  if (pendingRequests.has(cacheKey)) {
    const pendingResponse = await pendingRequests.get(cacheKey);
    return pendingResponse.data;
  }

  try {
    const request = CODELEARNER_API.get<OwnerResponse>(
      `/courses/${course_id}/is-own`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Store the promise in pending requests
    pendingRequests.set(cacheKey, request);
    const response = await request;

    pendingRequests.delete(cacheKey);
    return response.data;
  } catch (error) {
    // Handle Axios cancel error silently if it's a duplicate
    pendingRequests.delete(cacheKey);
    console.error("Error checking course ownership:", error);
    throw error;
    throw error;
  }
};
