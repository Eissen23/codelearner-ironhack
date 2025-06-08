import { CODELEARNER_API } from "../../api/clients/codelearner";
import { Course } from "../../../types/org/course.type";
import { UpdateImgCred } from "../../../types/feature-data/image.type";
import { createFormData } from "../../../utils/createFormData";

type Response = {
  course: Course;
  message: string;
};

export const imageCourse = async (cred: UpdateImgCred): Promise<Response> => {
  const imgFile = createFormData({ logo: cred.asset_img, _method: "PUT" });

  try {
    const response = await CODELEARNER_API.post<Response>(
      `/courses/${cred.owner_id}`,
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
