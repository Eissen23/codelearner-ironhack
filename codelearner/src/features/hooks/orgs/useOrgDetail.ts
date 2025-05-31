import { useEffect, useState } from "react";
import { getOrgsDetail } from "../../../service/api/org-manage/getOrgDetail";
import { Org } from "../../../types/org/org.type";
import { isOrgHead } from "../../../service/helper/isOrgHead";

export const useOrgDetail = (id: string, token?: string) => {
  const [data, setData] = useState<Org | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roleLoading, setRoleLoading] = useState<boolean>(false);
  const [role_owner, setRole] = useState<string>("UNAUTHORIZE");

  useEffect(() => {
    const getOrgData = async () => {
      try {
        setLoading(true);
        const response = await getOrgsDetail(id);
        setData(response);
      } catch (error) {
        console.error("Error fetching org data:", error);
      } finally {
        setLoading(false);
      }
    };

    getOrgData();
  }, [id]);

  useEffect(() => {
    const checkOwnership = async () => {
      if (!token || !id) return;

      try {
        setRoleLoading(true);
        const { role } = await isOrgHead(token!, id);
        setRole(role);
      } catch (error) {
        console.error("Error checking ownership:", error);
      } finally {
        setRoleLoading(false);
      }
    };

    checkOwnership();
  }, [id, token]);

  return { data, loading: loading || roleLoading, role_owner, setRole };
};
