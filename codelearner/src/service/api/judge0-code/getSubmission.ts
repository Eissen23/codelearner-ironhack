import { JUDGE0_API } from "../clients/judge0";
import axios from "axios";

export const getSubmission = async (token: string, signal?: AbortSignal) => {
  try {
    const response = await JUDGE0_API.get(`/submissions/${token}`, {
      signal: signal
    });

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error("Error getting submission:", error);
    }
    throw error;
  }
};
