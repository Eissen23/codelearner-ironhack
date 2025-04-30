
export interface SubmissionParams {
    source_code: string;
    language_id: number;
    stdin?: string;
    expected_output?: string;
    signal?: AbortSignal;
}