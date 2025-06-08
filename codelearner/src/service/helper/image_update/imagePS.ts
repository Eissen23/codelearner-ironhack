import { CODELEARNER_API } from "../../api/clients/codelearner";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { UpdateImgCred } from "../../../types/feature-data/image.type";
import { createFormData } from "../../../utils/createFormData";

type Response = {
  message: string;
  problem_set: ProblemSet;
};

export const imagePs = async (cred: UpdateImgCred): Promise<Response> => {
  const imgFile = createFormData({ logo: cred.asset_img, _method: "PUT" });
  try {
    const response = await CODELEARNER_API.post<Response>(
      `/problem-sets/${cred.owner_id}`,
      imgFile,
      {
        headers: {
          Authorization: `Bearer ${cred.user_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
