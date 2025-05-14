import React from "react";
import { Card, Alert } from "react-bootstrap";
import { useProblemSetsInfo } from "../../features/hooks/problemsets/useProblemSetInfo";

const ProblemSetInfo: React.FC<{ problem_set_id: string }> = ({
  problem_set_id,
}) => {
  const { problemSet, loading } = useProblemSetsInfo(problem_set_id);

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
          {new Date(problemSet.expired_at || "").toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProblemSetInfo;
