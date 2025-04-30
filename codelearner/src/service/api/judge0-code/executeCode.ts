import { SubmissionParams } from "../../../types/judge0.type";
import { createSubmission } from "./createSubmission";
import { getSubmission } from "./getSubmission";
import axios from "axios";

//test this later
export const executeCode = async (params: SubmissionParams) => {
  try {
    // Create submission and get token
    const submissionResponse = await createSubmission(params);
    const token = submissionResponse.token;

    // Get submission result using token
    const result = await getSubmission(token, params.signal);
    return result;

  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error("Error executing code:", error);
    }
    throw error;
  }
};  
