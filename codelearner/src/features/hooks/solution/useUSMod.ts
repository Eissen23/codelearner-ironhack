import { useEffect, useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getProblemSubMod } from "../../../service/api/solution-article/getProblemSubMod";
import { useAuth } from "../../../context/auth/AuthContext";

export const useUSMod = (problem_id: string, refreshKey: number = 0) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [unpublished, setUnpublished] = useState<UserSolution[]>();

  useEffect(() => {
    const fetchUnpublished = async () => {
      try {
        setLoading(true);
        const { user_solution } = await getProblemSubMod(
          problem_id,
          token || ""
        );
        setUnpublished(user_solution.data);
      } catch (error) {
        console.log("fetchUnpublished", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchUnpublished();
  }, [refreshKey, problem_id]);

  return { loading, unpublished };
};
