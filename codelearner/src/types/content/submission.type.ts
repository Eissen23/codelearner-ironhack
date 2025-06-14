import { Link } from "../paginator.type";
import { ProblemData } from "./problem.type";

export type UserSubmission = {
  id: string;
  source_code: string;
  language_id: number;
  result: string;
  points: number;
  time: number;
  memory: number;
  user_id: number;
  problem_id: string;
  created_at: Date;
  updated_at: Date;
  problem?: ProblemData;
};

export type UserSubmissionPaginate = {
  current_page: number;
  data: UserSubmission[];
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
