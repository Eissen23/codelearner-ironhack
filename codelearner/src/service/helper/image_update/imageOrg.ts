import { UpdateImgCred } from "../../../types/feature-data/image.type";
import { OrgUpdateRes } from "../../../types/org/org.type";
import { createFormData } from "../../../utils/createFormData";
import { CODELEARNER_API } from "../../api/clients/codelearner";

export const imageOrg = async (cred: UpdateImgCred) => {
  //just add put in this an be fine
  const img = createFormData({ logo: cred.asset_img, _method: "PUT" });

  try {
    const response = await CODELEARNER_API.post<OrgUpdateRes>(
      `/orgs/${cred.owner_id}`,
      img,
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
