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
    const pendingResponse = await pendingRequests.get(cacheKey);
    return pendingResponse.data;
  }

  try {
    const requestPromise = CODELEARNER_API.get<response>(
      `/orgs/${org_id}/allow`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    pendingRequests.set(cacheKey, requestPromise);

    const response = await requestPromise;
    pendingRequests.delete(cacheKey); // Clean up after request completes

    return response.data;
  } catch (error) {
    pendingRequests.delete(cacheKey); // Clean up on error
    if (axios.isCancel(error)) {
      return { role: "UNAUTHORIZE" };
    }
    console.error("Error in isOrgHead:", error);
    throw error;
  }
};
