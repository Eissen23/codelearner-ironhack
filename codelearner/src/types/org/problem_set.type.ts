export interface ProblemSet {
    id: number;
    name: string;
    description: string |null;
    short_description: string;
    expired_at: Date;
    created_at: Date;
    org_id: number;
}

export interface ProblemSetResponse {
    problem_sets: ProblemSet[];
}


