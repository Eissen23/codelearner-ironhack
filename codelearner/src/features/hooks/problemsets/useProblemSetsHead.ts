import { useEffect, useState } from "react";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { getProblemSetHead } from "../../../service/api/user-manage/getProblemSetHead";

export const useProblemSetsHead = (
  token: string | null,
  refreshKey: number
) => {
  const [problemSets, setProblemSet] = useState<ProblemSet[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblemSet = async () => {
      try {
        setIsLoading(true);
        const response = await getProblemSetHead(token || "");
        setProblemSet(response);
      } catch (error) {
        console.log("error useProblemSetsHead: ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblemSet();
  }, [refreshKey]);

  return { problemSets, isLoading };
};
