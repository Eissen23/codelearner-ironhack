import { useEffect, useState } from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getProblemSubMod } from "../../../service/api/solution-article/getProblemSubMod";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { publishUS } from "../../../service/api/usersolution/publishUS";

export const useUSMod = (problem_id: string, refreshKey: number = 0) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [unpublished, setUnpublished] = useState<UserSolution[]>();

  const [updating, setUpdating] = useState(false);
  const [editingSolution, setEditingSolution] = useState<string | null>(null);
  const [newStatus, setnewStatus] = useState(true);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "publish") {
      setnewStatus(true);
    } else {
      setnewStatus(false);
    }
  };

  const handleClick = async () => {
    if (!editingSolution || !token) {
      toast.error("Missing solution ID or authentication token");
      return;
    }

    try {
      setUpdating(true);
      await publishUS(editingSolution, token, newStatus);
      toast.success("Success fully updated");
      setEditingSolution(null);
    } catch (error) {
      console.log("handleClick", error);
      toast.error("Fail to change");
    } finally {
      setUpdating(false);
    }
  };

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

  return {
    loading,
    updating,
    unpublished,
    editingSolution,
    handleClick,
    handleSelect,
    setEditingSolution,
  };
};
