import { Link } from "./paginator.type";

export interface TestCase {
    input: string[];
    output: string[];
}

export interface ProblemData {
    id: string;
    name: string;
    description: string;
    test_case: TestCase;
    difficulty: number
}

export interface ProblemResponse {
    current_page: number;
    data: ProblemData[];
    links: Link[]
}