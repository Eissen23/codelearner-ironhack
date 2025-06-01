import { UserSubmission } from "./content/submission.type";
import { Link } from "./paginator.type";

export interface Moderator {
  user_id: number;
  org_id: number;
  role: string;
}

export interface Organization {
  id: number;
  name: string;
  contact_email: string;
  website: string | null;
  description: string | null;
  logo: string | null;
  created_at: Date;
  updated_at: Date;
  pivot: Moderator;
}

export interface Enrolled {
  user_id: number;
  course_id: number;
}

export interface UserCourse {
  id: number;
  name: string;
  description: string | null;
  short_description: string;
  fee: number | 0.0;
  duration: number;
  currency: string | null;
  logo: string | null;
  created_at: Date;
  org_id: number;
  pivot: Enrolled;
}

export type UserDetail = {
  id: number;
  full_name: string;
  account_name: string;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
  about: string;
  submissions: UserSubmission[];
  organizations: Organization[];
  courses: UserCourse[];
};

export type UserModerator = {
  id: number;
  full_name: string;
  account_name: string;
  email: string;
  logo: string | null;
  created_at: Date;
  updated_at: Date;
  about: string;
  pivot: Moderator;
};

export type ModList = {
  current_page: number;
  data: UserModerator[];
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
