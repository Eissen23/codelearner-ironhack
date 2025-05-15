import { useEffect, useState } from "react";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { getProblemSetMod } from "../../../service/api/user-manage/moderator/getProblemSetMod";

export const useProblemSetsHead = (token: string | null) => {
  const [problemSets, setProblemSet] = useState<ProblemSet[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblemSet = async () => {
      try {
        setIsLoading(true);
        const response = await getProblemSetMod(token || "");
        setProblemSet(response);
      } catch (error) {
        console.log("error useProblemSetsHead: ", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblemSet();
  });

  return { problemSets, isLoading };
};
