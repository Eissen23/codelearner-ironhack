import { Link } from "../paginator.type";

export type Course = {
  id: number;
  name: string;
  description?: string;
  short_description: string;
  fee: number | 0.0;
  duration: number | 0;
  currency?: string;
  created_at: Date;
  org_id: number;
};
export type CourseInfoResponse = {
  data: Course;
};

// Main response interface
export type CoursePageResponse = {
  current_page: number;
  data: Course[];
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

// Wrapper for the entire response
export type CourseResponse = {
  courses_page: CoursePageResponse;
};
