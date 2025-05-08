import React from "react";
import { getProblemSetInfo } from "../../service/api/problem-set-manage/getProblemSetInfo";
import { ProblemSet } from "../../types/org/problem_set.type";
import { Card, Alert } from "react-bootstrap";

const ProblemSetInfo: React.FC<{ problem_set_id: string }> = ({
  problem_set_id,
}) => {
  const [problemSet, setProblemSet] = React.useState<ProblemSet | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProblemSets = async () => {
      try {
        setLoading(true);
        const { data } = await getProblemSetInfo(problem_set_id);
        setProblemSet(data);
      } catch (error) {
        console.log("Failed to fetch problem set info");
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchProblemSets();
  }, [problem_set_id]);

  if (loading) {
    return <div> is Loading ....</div>;
  }

  if (!problemSet) {
    return <Alert variant="info">No problem set information available.</Alert>;
  }

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">{problemSet.name}</Card.Header>
      <Card.Body>
        <Card.Title>Details</Card.Title>
        <Card.Text>{problemSet.description}</Card.Text>
        <Card.Text>
          <strong>Created at:</strong>
          {new Date(problemSet.created_at).toLocaleDateString()}
        </Card.Text>
        <Card.Text>
          <strong>Expired at:</strong>
          {new Date(problemSet.expired_at).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProblemSetInfo;
