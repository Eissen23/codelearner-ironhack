import { Link } from "./paginator.type";

export type TestCase = {
  input: string[];
  output: string[];
};

export type ProblemData = {
  id: string;
  name: string;
  description: string;
  test_case: TestCase;
  difficulty: number;
};

export type ProblemResponse = {
  current_page: number;
  data: ProblemData[];
  links: Link[];
};
