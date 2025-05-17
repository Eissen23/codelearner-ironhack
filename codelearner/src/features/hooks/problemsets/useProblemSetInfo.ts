import React from "react";
import { getProblemSetInfo } from "../../../service/api/problem-set-manage/getProblemSetInfo";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { Org } from "../../../types/org/org.type";

export const useProblemSetsInfo = (
  problem_set_id: string,
  is_belong: boolean = false
) => {
  const [problemSet, setProblemSet] = React.useState<ProblemSet | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [belong, setBelong] = React.useState<Org | null>(null);

  React.useEffect(() => {
    const fetchProblemSets = async () => {
      try {
        setLoading(true);
        const { data, belong_to } = await getProblemSetInfo(
          problem_set_id,
          is_belong
        );
        setProblemSet(data);
        setBelong(belong_to);
      } catch (error) {
        console.log("Failed to fetch problem set info");
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchProblemSets();
  }, [problem_set_id]);

  return { problemSet, belong, loading };
};
