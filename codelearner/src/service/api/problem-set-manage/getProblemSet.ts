import { CODELEARNER_API } from "../clients/codelearner";
import { ProblemSetResponse } from "../../../types/org/problem_set.type";

export const getProblemSet = async (): Promise<ProblemSetResponse> => {
    try {
        const response = await CODELEARNER_API.get("/problem-sets");
        return response.data;
    } catch (error) {
        throw error;
    }
}