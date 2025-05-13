import { useState, useEffect } from "react";
import { getOrgsList } from "../../../service/api/org-manage/getOrgsList"; // Adjust the import path based on your project structure
import { Org } from "../../../types/org/org.type";

export const useOrgs = () => {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await getOrgsList();
        setOrgs(response.org);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch organizations");
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  return { orgs, loading, error };
};
