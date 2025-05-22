import { useEffect, useState } from "react";
import { SolutionArticle } from "../../../types/content/solution.type";
import getSArticle from "../../../service/api/solution-article/getSArticle";

export const useSArticleList = (problem_id: string) => {
  const [loading, setLoading] = useState(false);
  const [solutionArticle, setSArticle] = useState<SolutionArticle[]>();

  useEffect(() => {
    const fetchSArticleList = async () => {
      try {
        setLoading(true);
        const { solution_articles } = await getSArticle(problem_id);
        setSArticle(solution_articles);
      } catch (error) {
        console.log("fetchSArticleList: ", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchSArticleList();
  }, []);

  return { loading, solutionArticle };
};
