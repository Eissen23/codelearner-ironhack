import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { SolutionArticle } from "../../../types/content/solution.type";
import { getSArticleInfo } from "../../../service/api/solution-article/getSArticleInfo";

export const useSArticleInfo = (sol_atricle_id: string) => {

  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const [solution_article, setSolutionArticle] = useState<SolutionArticle>();

  useEffect(() => {
    const fetchSArticleInfo = async () => {
      try {
        setLoading(true);
        const { data } = await getSArticleInfo(
          sol_atricle_id || "",
          token || ""
        );
        setSolutionArticle(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchSArticleInfo();
  }, []);

  return { loading, solution_article };
};
