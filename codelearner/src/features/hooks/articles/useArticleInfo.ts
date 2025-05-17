import { useEffect, useState } from "react";
import { Article } from "../../../types/content/article.type";
import { showArticle } from "../../../service/api/article-manage/showArticle";

export const useArticleInfo = (
  article_id: string,
  is_author: boolean = false,
  is_belong: boolean = false
) => {
  const [articleData, setArticleData] = useState<Article>();
  const [loading, setLoading] = useState(false);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data } = await showArticle(article_id, is_belong, is_author);
      setArticleData(data);
    } catch (error) {
      console.log("Error fetching article");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [article_id]);

  return { articleData, loading };
};
