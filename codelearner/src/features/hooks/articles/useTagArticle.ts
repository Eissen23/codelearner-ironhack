import { useEffect, useState } from "react";
import { Article } from "../../../types/content/article.type";
import { getArticlesTaged } from "../../../service/api/article-manage/getArticleTaged";

export const useTagArticle = (tagged: string) => {
  const [articles, setArticle] = useState<Article[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { articles } = await getArticlesTaged(tagged);
        setArticle(articles.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [tagged]);

  return { articles, loading };
};
