import { LoaderFunctionArgs } from "react-router-dom";
import { getAuthToken } from "./getLocalItem";
import { isOwnerProblemSet } from "../../service/helper/isOwnerProblemSet";

export const psOwnerLoader = async ({ params }: LoaderFunctionArgs) => {
  const { problemSetId } = params;
  const token = getAuthToken();

  if (!problemSetId || !token) throw new Error("Missing problemSetId or token");

  const { role } = await isOwnerProblemSet(token, problemSetId);
  return { role };
};
