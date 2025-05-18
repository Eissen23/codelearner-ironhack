import { Link } from "../paginator.type";

export type TestCase = {
  input: string[];
  output: string[];
};

export type ProblemData = {
  id: string;
  name: string;
  description: string;
  test_cases: TestCase;
  difficulty: number;
  tags?: string[];
  problem_set: number;
  is_rich_text: boolean;
};

export type ProblemResponse = {
  current_page: number;
  data: ProblemData[];
  links: Link[];
};
