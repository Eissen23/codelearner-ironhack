import { useEffect, useRef, useState } from "react";
import { UserModerator } from "../../../types/user.type";
import { showModInOrg } from "../../../service/api/org-manage/moderator/showModInOrg";

export const useModList = (org_id: string, token?: string) => {
  const [refresh, setRefresh] = useState(0);
  const [oneSelf, setOneSelf] = useState<UserModerator>();
  const [mods, setMods] = useState<UserModerator[]>();
  const [pendings, setPendings] = useState<UserModerator[]>();
  const [loading, setLoading] = useState(false);

  const refreshComp = () => {
    setRefresh(refresh + 1);
  };

  useEffect(() => {
    const fetchModList = async () => {
      try {
        setLoading(true);
        const { moderators, pending, you } = await showModInOrg(org_id, token!);
        setMods(moderators.data);
        setPendings(pending.data);
        setOneSelf(you);
      } catch (error) {
        console.log("Error fetching moderator list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModList();
  }, [org_id, token, refresh]);

  return { mods, pendings, oneSelf, loading, refreshComp };
};
