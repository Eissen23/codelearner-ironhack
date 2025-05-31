import { useEffect, useState } from "react";
import { getOrgsDetail } from "../../../service/api/org-manage/getOrgDetail";
import { Org } from "../../../types/org/org.type";
import { isOrgHead } from "../../../service/helper/isOrgHead";
import { getAuthToken } from "../../../config/loader/getLocalItem";
import { useNavigate } from "react-router";

export const useOrgDetail = (id: string, ownerCheck: boolean = false) => {
  const navigate = useNavigate();
  const [data, setData] = useState<Org | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roleLoading, setRoleLoading] = useState<boolean>(false);
  const [role_owner, setRole] = useState<string>("UNAUTHORIZE");

  useEffect(() => {
    const getOrgData = async () => {
      setLoading(true);
      try {
        const response = await getOrgsDetail(id);
        if (ownerCheck) {
          const { role } = await isOrgHead(getAuthToken()!, id);
          setRole(role || "UNAUTHORIZE");
        }
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
      if (!ownerCheck || !id) return;

      const token = getAuthToken();
      try {
        setRoleLoading(true);
        const { role } = await isOrgHead(token!, id);

        if (role === "UNAUTHORIZE") {
          navigate(`/non-authorized`);
        }

        setRole(role);
      } catch (error) {
        console.error("Error checking ownership:", error);
      } finally {
        setRoleLoading(false);
      }
    };

    checkOwnership();
  }, [id, ownerCheck]);

  return { data, loading: loading || roleLoading, role_owner };
};
