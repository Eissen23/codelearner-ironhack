import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { getAuthToken } from "./getLocalItem";
import { isOrgHead } from "../../service/helper/isOrgHead";

export const orgOwnerLoader = async ({ params }: LoaderFunctionArgs) => {
  const { org_id } = params;
  const token = getAuthToken();

  if (!org_id || !token) throw new Error("Missing problemSetId or token");

  const { role } = await isOrgHead(token, org_id);

  if (role === "UNAUTHORIZE") {
    return redirect("/not-authorized");
  }
  return { role };
};
