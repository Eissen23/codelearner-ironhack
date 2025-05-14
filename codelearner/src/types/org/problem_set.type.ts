import { Link } from "../paginator.type";
import { Org } from "./org.type";

export type ProblemSet = {
  id: number;
  name: string;
  description?: string;
  short_description: string;
  expired_at?: Date;
  created_at: Date;
  logo?: string;
  org_id: number;
};

export type ProblemSetInfoResponse = {
  data: ProblemSet;
  belong_to: Org;
};

export type ProblemSetResponse = {
  problem_sets: {
    current_page: number;
    data: ProblemSet[];
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
};
