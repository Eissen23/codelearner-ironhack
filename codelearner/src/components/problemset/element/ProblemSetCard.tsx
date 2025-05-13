import { Card, Col } from "react-bootstrap";
import { ProblemSet } from "../../../types/org/problem_set.type";
import React from "react";

const ProblemSetCard: React.FC<{ problemSet: ProblemSet }> = ({
  problemSet,
}) => {
  return (
    <Col md={6} lg={4} key={problemSet.id} className="mb-3">
      <Card className="h-100 shadow-sm">
        <Card.Body>
          <Card.Title>
            <a
              href={`/problem-sets/${problemSet.id}`}
              className="text-decoration-none text-dark"
            >
              {problemSet.name}
            </a>
          </Card.Title>
          <Card.Text>{problemSet.short_description}</Card.Text>
          <div className="text-muted small">
            <p className="mb-1">
              Created: {new Date(problemSet.created_at).toLocaleDateString()}
            </p>
            <p className="mb-0">
              Expires: {new Date(problemSet.expired_at).toLocaleDateString()}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProblemSetCard;
