import axios from "axios";
import { CODELEARNER_API, pendingRequests } from "../api/clients/codelearner";

type response = {
  role: string;
};

export const isOrgHead = async (
  token: string,
  org_id: string
): Promise<response> => {
  const cacheKey = `get:/orgs/${org_id}/allow:${token}`;

  // Check if request is already in progress
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }

  try {
    const request = CODELEARNER_API.get<response>(`/orgs/${org_id}/allow`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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
