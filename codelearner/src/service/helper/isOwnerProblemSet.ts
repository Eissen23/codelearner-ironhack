import axios from "axios";
import { CODELEARNER_API, pendingRequests } from "../api/clients/codelearner";

type response = {
  role: string;
};

export const isOwnerProblemSet = async (
  token: string,
  problem_set: string
): Promise<response> => {
  const cacheKey = `get:/problem-sets/${problem_set}/is-own:${token}`;
  // Check if request is already in progress
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }
  try {
    const request = CODELEARNER_API.get<response>(
      `/problem-sets/${problem_set}/is-own`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Store the promise in pending requests
    pendingRequests.set(cacheKey, request);
    const response = await request;

    return response.data;
  } catch (error) {
    // Handle Axios cancel error silently if it's a duplicate
    if (axios.isCancel(error)) {
      return pendingRequests.get(cacheKey)!; // Return the original pending promise
    }
    throw error;
  }
};
