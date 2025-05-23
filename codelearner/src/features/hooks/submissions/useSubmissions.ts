import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { getUserSubmssn } from "../../../service/api/user-submission/getUserSubmss";
import { UserSubmission } from "../../../types/content/submission.type";

const UseSubmissions = () => {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState<UserSubmission[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserSub = async () => {
      try {
        setLoading(true);
        const { submissions } = await getUserSubmssn(token || "");
        setSubmissions(submissions.data);
      } catch (error) {
        console.log("fetchUserSub", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchUserSub();
  }, [token]);

  return { loading, submissions };
};

export default UseSubmissions;
