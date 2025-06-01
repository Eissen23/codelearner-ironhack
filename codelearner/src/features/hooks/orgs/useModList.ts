import { useEffect, useState } from "react";
import { UserModerator } from "../../../types/user.type";
import { showModInOrg } from "../../../service/api/org-manage/moderator/showModInOrg";

export const useModList = (org_id: string, token?: string) => {
  const [mods, setMods] = useState<UserModerator[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModList = async () => {
      try {
        setLoading(true);
        const { moderators } = await showModInOrg(org_id, token!);
        setMods(moderators.data);
      } catch (error) {
        console.log("Error fetching moderator list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModList();
  }, [org_id, token]);

  return { mods, loading };
};
