import { ResultData, SubmissionResponse } from "../../types/code/judge0.type";
import { calculatePoints } from "./calculatePoints";

export function makeAnswer(
  source_code: string,
  language_id: number,
  data: SubmissionResponse[] | undefined,
  problem_id: string,
  runNumber: number
): ResultData {
  if (!data)
    return {
      source_code,
      language_id,
      result: "Client Error",
      points: 0,
      time: 0,
      memory: 0,
      problem_id,
    };

  // Calculate average time (converting strings to numbers)
  const totalTime = data.reduce(
    (sum, submission) => sum + parseFloat(submission.time),
    0
  );
  const avgTime =
    data.length > 0 ? Number((totalTime / data.length).toFixed(2)) : 0;

  // Calculate average memory
  const totalMemory = data.reduce(
    (sum, submission) => sum + submission.memory,
    0
  );
  const avgMemory =
    data.length > 0 ? Number((totalMemory / data.length).toFixed(2)) : 0;

  // Determine overall result
  // We'll say "Accepted" if all submissions were accepted
  const allAccepted = data.every(
    (submission) =>
      submission.status.id === 3 && submission.status.description === "Accepted"
  );
  const result = allAccepted ? "Accepted" : "Failed";

  // Calculate points - giving full points (100) if all tests passed

  const points =
    result === "Accepted"
      ? calculatePoints(data, runNumber, avgTime, avgMemory)
      : 0;

  return {
    source_code,
    language_id,
    result,
    points,
    time: avgTime,
    memory: avgMemory,
    problem_id,
  };
}
