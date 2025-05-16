import { useEffect, useState } from "react";
import { getArticles } from "../../../service/api/article-manage/getArticles";
import { Article } from "../../../types/content/article.type";

export const useArticle = (course_id: string) => {
  const [articles, setArticle] = useState<Article[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { articles } = await getArticles(course_id);
        setArticle(articles.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [course_id]);

  return { articles, loading };
};
