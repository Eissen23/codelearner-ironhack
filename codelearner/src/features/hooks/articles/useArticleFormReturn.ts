import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Article } from "../../../types/content/article.type";
import { useParams } from "react-router";
import { addArticle } from "../../../service/api/article-manage/addArticle";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast } from "react-toastify";
import { updateArticle } from "../../../service/api/article-manage/updateArticle";

interface UseArticleFormReturn {
  article: Partial<Article>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleContentUpdate: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  uploading: boolean;
}

export const useArticleForm = (
  articleData?: Article,
  nonEdit: boolean = false
): UseArticleFormReturn => {
  const { course_id } = useParams();
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);

  const [article, setArticle] = useState<Partial<Article>>({
    name: "",
    description: "",
    chapter: "",
    content: "",
    type: "article",
    course_id: course_id ? Number(course_id) : undefined,
  });

  useEffect(() => {
    if (articleData) {
      setArticle(articleData);
    }
  }, [articleData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: name === "course_id" || name === "mod_id" ? Number(value) : value,
    }));
  };

  const handleContentUpdate = (content: string) => {
    setArticle((prev) => ({ ...prev, content }));
  };

  const postArticle = async () => {
    const newArticle: Omit<Article, "id" | "created_at" | "updated_at"> = {
      ...article,
      course_id: article.course_id ?? 0,
      type: article.type ?? "article",
      name: article.name ?? "",
      description: article.description ?? "",
    } as Article;

    try {
      setUploading(true);
      const { article } = await addArticle(token || "", newArticle);
      toast("Successfully post article");
      return article;
    } catch (error) {
      console.log("Error post article", error);
      toast.error("Failed to post article");
    } finally {
      setUploading(false);
    }
  };

  const fetchUpdateArticle = async () => {
    const newArticle: Omit<Article, "created_at" | "updated_at"> = {
      ...article,
      id: article.id,
      course_id: article.course_id ?? 0,
      type: article.type ?? "article",
      name: article.name ?? "",
      description: article.description ?? "",
    } as Article;

    try {
      setUploading(true);
      const { article } = await updateArticle(token || "", newArticle);
      toast("Successfully updating article");
      return article;
    } catch (error) {
      console.log("Error updating article", error);
      toast.error("Failed to update article");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !nonEdit ? postArticle() : fetchUpdateArticle();
  };

  return {
    article,
    uploading,
    handleChange,
    handleContentUpdate,
    handleSubmit,
  };
};
