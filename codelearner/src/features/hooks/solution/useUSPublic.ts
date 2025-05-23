import { useEffect, useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { useAuth } from "../../../context/auth/AuthContext";
import { viewPublishUS } from "../../../service/api/usersolution/viewPublishUS";

export const useUSPublic = (problem_id: string, refreshKey: number = 0) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState<UserSolution[]>();

  useEffect(() => {
    const fetchUnpublished = async () => {
      try {
        setLoading(true);
        const { user_solutions } = await viewPublishUS(problem_id, token || "");
        setPublished(user_solutions);
      } catch (error) {
        console.log("fetchUnpublished", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchUnpublished();
  }, [refreshKey, problem_id]);

  return { loading, published };
};
