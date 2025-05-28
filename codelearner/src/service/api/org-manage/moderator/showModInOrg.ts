import { CODELEARNER_API } from "../../clients/codelearner";

type response = {};

export const showModInOrg = (org_id: string, token: string) => {
  try {
    const response = CODELEARNER_API.get(`orgs/${org_id}/mods`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log("showModInOrg", error);
    throw error;
  }
};
