import { LoaderFunctionArgs } from "react-router-dom";
import { isOwnerCourse } from "../../service/helper/isOwnerCourse";
import { getAuthToken } from "./getLocalItem";

export const courseOwnerLoader = async ({ params }: LoaderFunctionArgs) => {
  const { course_id } = params;
  const token = getAuthToken();

  if (!course_id || !token) throw new Error("Missing course_id or token");

  const { role } = await isOwnerCourse(token, course_id);
  return { role };
};
