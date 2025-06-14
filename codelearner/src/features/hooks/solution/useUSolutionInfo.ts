import { useEffect, useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getUserSolution } from "../../../service/api/solution-article/getUserSolution";
import { useParams } from "react-router";
import { useAuth } from "../../../context/auth/AuthContext";

export const useUSolutionInfo = () => {
  const { user_solution_id } = useParams();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [user_solution, setUserSolution] = useState<UserSolution>();

  useEffect(() => {
    const fetchUserSolution = async () => {
      try {
        setLoading(true);
        const { user_solution } = await getUserSolution(
          user_solution_id || "",
          token || ""
        );
        setUserSolution(user_solution);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchUserSolution();
  }, []);

  return { loading, user_solution };
};
