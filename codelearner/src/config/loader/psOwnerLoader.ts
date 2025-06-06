import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getAuthToken } from "./getLocalItem";
import { isOwnerProblemSet } from "../../service/helper/isOwnerProblemSet";

export const psOwnerLoader = async ({ params }: LoaderFunctionArgs) => {
  const { problemSetId } = params;
  const token = getAuthToken();

  if (!problemSetId || !token) throw new Error("Missing problemSetId or token");

  try {
    const { role } = await isOwnerProblemSet(token, problemSetId);
    if (role === "UNAUTHORIZE") {
      return redirect("/not-authorized");
    }
    return { role };
  } catch (error) {
    console.error("ProblemSet owner check failed:", error);
    return redirect("/not-authorized");
  }
};
