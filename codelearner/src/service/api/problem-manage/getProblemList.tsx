import axios from "axios";
import { ProblemResponse } from "../../../types/problem.type";
const API_URL = import.meta.env.VITE_API_URL;


export const getProblemList = async (
): Promise<ProblemResponse> => {
  try {
    const response = await axios.get<ProblemResponse>(
      `${API_URL}/problems`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
