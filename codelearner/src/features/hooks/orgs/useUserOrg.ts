import { useState, useEffect } from "react";
import { OrgUser } from "../../../types/org/org.type";
import { getUserOrg } from "../../../service/api/user-manage/getUserOrg";

export const useUserOrgs = (token: string) => {
  const [orgs, setOrgs] = useState<OrgUser>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        const data = await getUserOrg(token);
        setOrgs(data);
      } catch (err) {
        console.log("error while getting user's org");
        throw err;
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, [token]);

  return { orgs, loading };
};
