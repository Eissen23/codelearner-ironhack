import { Link } from "../paginator.type";

export type UserSolution = {
  id: string;
  name: string;
  description: string;
  content: string;
  status: "published" | "unpublished";
  created_at: Date;
  updated_at: Date;
};

export type UserSolutionRes = {
  user_solution: UserSolution;
};

export type PaginatedUsrSolution = {
  current_page: number;
  data: UserSolution[];
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
