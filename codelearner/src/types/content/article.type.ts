import { Link } from "../paginator.type";

export type Article = {
  id: string;
  name: string;
  description: string;
  chapter?: string;
  content?: string;
  type: "article" | "solution" | "chapter";
  course_id: number;
  mod_id: number;
  created_at: Date;
  updated_at: Date;
};

export type ArticlePaginator = {
  current_page: number;
  data: Article[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type ArticleResponse = {
  articles: ArticlePaginator;
};
