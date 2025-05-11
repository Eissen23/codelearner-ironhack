export type UserSubmission = {
  id: string;
  language_id: number;
  result: string;
  point: number;
  time: number;
  memory: number;
  user_id: number;
  problem_id: number;
  created_at: Date;
  updated_at: Date;
};
