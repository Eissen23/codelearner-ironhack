import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { UserSolution } from "../../../types/content/solution.type";
import { getUsrSolutions } from "../../../service/api/usersolution/getUsrSolutions";

const useYourSolution = () => {
  const { token } = useAuth();
  const [userSolution, setUserSolution] = useState<UserSolution[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserSolution = async () => {
      try {
        setLoading(true);
        const { user_solution } = await getUsrSolutions(token || "");
        setUserSolution(user_solution.data);
      } catch (error) {
        console.log("fetchUserSub", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchUserSolution();
  }, [token]);

  return { loading, userSolution };
};

export default useYourSolution;
