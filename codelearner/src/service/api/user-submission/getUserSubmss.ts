import { UserSubmissionPaginate } from "../../../types/content/submission.type";
import { DefaultQueryParam } from "../../../types/query";
import { CODELEARNER_API } from "../clients/codelearner";

type Response = {
  submissions: UserSubmissionPaginate;
};

export const getUserSubmssn = async (
  token: string,
  query_param?: DefaultQueryParam
): Promise<Response> => {
  try {
    const response = await CODELEARNER_API.get<Response>(`submissions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: query_param?.page || undefined,
        sort: query_param?.sort || undefined,
        keyword: query_param?.keyword || undefined,
        per_page: query_param?.per_page || undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Fail to fetch submission", error);
    throw error;
  }
};
