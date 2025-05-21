import { useEffect, useState } from "react";
import { ResultData } from "../../../types/code/judge0.type";
import { ProblemData } from "../../../types/content/problem.type";
import { useAuth } from "../../../context/auth/AuthContext";
import { getUserSubmission } from "../../../service/api/user-submission/getSubmission";

const useSubInfo = (submission_id: string) => {
  const { token } = useAuth();
  const [submissionData, setSubmission] = useState<ResultData>();
  const [problemData, setProblem] = useState<ProblemData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserSub = async () => {
      try {
        setLoading(true);
        const { submission } = await getUserSubmission(
          token || "",
          submission_id
        );
        setProblem(submission.problem);
        setSubmission(submission);
      } catch (error) {
        console.log("fetchUserSub", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchUserSub();
  }, []);

  return { loading, submissionData, problemData };
};

export default useSubInfo;
