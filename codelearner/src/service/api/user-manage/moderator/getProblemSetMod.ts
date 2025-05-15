import { ProblemSet } from "../../../../types/org/problem_set.type";
import { CODELEARNER_API } from "../../clients/codelearner";

export const getProblemSetMod = async (
  token: string
): Promise<ProblemSet[]> => {
  try {
    const response = await CODELEARNER_API.get<ProblemSet[]>(
      `/mod/your-problemset`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error getCoursesMod", error);
    throw error;
  }
};
