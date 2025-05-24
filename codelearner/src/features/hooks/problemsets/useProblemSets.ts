import { useEffect, useState } from "react";
import { getProblemSets } from "../../../service/api/problem-set-manage/getProblemSets";
import { ProblemSet } from "../../../types/org/problem_set.type";

export const useProblemSets = (org_id?: string) => {
  const [problemSets, setProblemSets] = useState<ProblemSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(org_id);
  useEffect(() => {
    const fetchProblemSets = async () => {
      try {
        const response = await getProblemSets(org_id);
        setProblemSets(response.problem_sets.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch problem sets");
        setIsLoading(false);
      }
    };

    fetchProblemSets();
  }, [org_id]);

  return { problemSets, isLoading, error };
};
