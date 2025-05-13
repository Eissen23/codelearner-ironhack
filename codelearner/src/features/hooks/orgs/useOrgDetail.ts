import { useEffect, useState } from "react";
import { getOrgsDetail } from "../../../service/api/org-manage/getOrgDetail";
import { Org } from "../../../types/org/org.type";

export const useOrgDetail = (id: string) => {
  const [data, setData] = useState<Org | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getOrgData = async () => {
      setLoading(true);
      try {
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

  return { data, loading };
};
