import { useState, ChangeEvent, FormEvent } from "react";
import { Article } from "../../../types/content/article.type";
import { Course } from "../../../types/org/course.type";

interface UseArticleFormReturn {
  article: Partial<Article>;
  courses: Partial<Course>[];
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleContentUpdate: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const useArticleForm = (): UseArticleFormReturn => {
  const [article, setArticle] = useState<Partial<Article>>({
    name: "",
    description: "",
    chapter: "",
    content: "",
    type: "article",
    course_id: 0,
    mod_id: 0,
  });

  const courses: Partial<Course>[] = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
  ];

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArticle: Article = {
      ...article,
      id: crypto.randomUUID(),
      course_id: article.course_id ?? 0,
      mod_id: article.mod_id ?? 0,
      created_at: new Date(),
      updated_at: new Date(),
      type: article.type ?? "article",
      name: article.name ?? "",
      description: article.description ?? "",
    } as Article;
    console.log("Article Data:", newArticle);
    // Add your submit logic here (e.g., API call)
  };

  return {
    article,
    courses,
    handleChange,
    handleContentUpdate,
    handleSubmit,
  };
};
