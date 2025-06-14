import { SubmissionResponse } from "../../types/code/judge0.type";

/**
 * Calculates points based on test results, execution time, memory usage, and number of run attempts
 *
 * @param submissions - The Judge0 submission results
 * @param runNumber - Number of times the user has run their code
 * @returns Calculated points
 */
export function calculatePoints(
  submissions: SubmissionResponse[],
  runNumber: number,
  avgTime: number,
  avgMemory: number
): number {
  // Count passed tests
  const passedTests = submissions.filter(
    (submission) =>
      submission.status.id === 3 && submission.status.description === "Accepted"
  ).length;

  // Calculate base points from passed tests percentage
  const basePoints = Math.round((passedTests / submissions.length) * 100);

  // If no tests passed, return 0 points
  if (basePoints === 0) return 0;

  // Performance bonus based on execution time and memory
  let performanceBonus = 0;

  // Calculate average time and memory

  // Time efficiency bonus (lower is better)
  // Let's say < 0.5s is excellent, < 1s is good
  if (avgTime < 0.5) {
    performanceBonus += 10;
  } else if (avgTime < 1.0) {
    performanceBonus += 5;
  }

  // Memory efficiency bonus (lower is better)
  // These thresholds will depend on your specific application
  // Adjust based on your expected memory usage
  if (avgMemory < 40000) {
    performanceBonus += 10;
  } else if (avgMemory < 50000) {
    performanceBonus += 5;
  }

  // Run attempt penalty - encourage solving with fewer attempts
  // The more attempts, the smaller the bonus
  const runMultiplier = Math.max(0.6, 1 - (runNumber - 1) * 0.05);

  // Calculate final points
  const finalPoints = Math.min(
    100,
    Math.round((basePoints + performanceBonus) * runMultiplier)
  );

  return finalPoints;
}
