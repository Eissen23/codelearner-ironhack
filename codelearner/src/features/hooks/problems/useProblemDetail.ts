import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProblemData } from "../../../types/content/problem.type";
import { getProblemByID } from "../../../service/api/problem-manage/getProblemById";

const useProblemDetail = (problem?: string) => {
  const params = useParams<{ problem_id: string }>();
  const problem_id = problem || params.problem_id;

  const [problemData, setProblemData] = useState<ProblemData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true);
        const { problem } = await getProblemByID(problem_id || "");
        setProblemData(problem);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, [problem_id]);

  return { problemData, loading };
};

export default useProblemDetail;
