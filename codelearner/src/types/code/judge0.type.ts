export type SubmissionParams = {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
  signal?: AbortSignal;
  wait?: boolean;
};

export type SubmissionResponse = {
  stdout: string | null;
  time: string;
  memory: number;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string;
  stdin: string;
  expected_output: string;
  status: {
    id: number;
    description: string;
  };
};

export type ResultData = {
  source_code: string;
  language_id: number;
  result: string;
  points: number;
  time: number;
  memory: number;
  problem_id?: string;
  //no need for adding
  updated_at?: Date;
  created_at?: Date;
  id?: string;
};

export type SubmitResponse = {
  message: string;
  submissions: ResultData;
};

export type BatchSubmission = {
  submission: SubmissionParams[];
};

export type BatchToken = {
  token: string;
};
