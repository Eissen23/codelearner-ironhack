import { ResultData, SubmissionResponse } from "../../types/code/judge0.type";

export function makeAnswer(
  data: SubmissionResponse[],
  source_code: string,
  language_id: number
): ResultData {
  const allAccepted = data.every((d) => d.status.id === 3);
  const result = allAccepted ? "Accepted" : "Wrong Answer";

  const times = data.map((d) => d.time);
  const memories = data.map((d) => d.memory);

  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);
  const minMemory = Math.min(...memories);
  const maxMemory = Math.max(...memories);

  const alpha = 0.5;
  const beta = 0.5;

  const pointsArray = data.map((d) => {
    const normalizedTime = (d.time - minTime) / (maxTime - minTime || 1);
    const normalizedMemory =
      (d.memory - minMemory) / (maxMemory - minMemory || 1);
    const compositeScore = alpha * normalizedTime + beta * normalizedMemory;
    return 1 - compositeScore;
  });

  const totalPoints =
    pointsArray.reduce((sum, p) => sum + p, 0) / pointsArray.length;

  const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length;
  const avgMemory = memories.reduce((sum, m) => sum + m, 0) / memories.length;

  return {
    source_code,
    language_id,
    result,
    points: Number(totalPoints.toFixed(4)),
    time: Number(avgTime.toFixed(2)),
    memory: Number(avgMemory.toFixed(2)),
  };
}
