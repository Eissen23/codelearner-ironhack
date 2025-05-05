import { Link } from "../paginator.type";

export interface Course {
    id: number;
    name: string;
    description: string;
    short_description: string;
    fee: number;
    duration: number;
    org_id: number;
    created_at: string;
}

// Main response interface
export interface CoursePageResponse {
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
}

// Wrapper for the entire response
export interface CourseResponse {
  courses_page: CoursePageResponse;
}