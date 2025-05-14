import { Card } from "react-bootstrap";
import { ProblemSet } from "../../../types/org/problem_set.type";
import React from "react";
import { Link } from "react-router-dom";

const ProblemSetCard: React.FC<{
  problemSet: ProblemSet;
  setting?: boolean;
}> = ({ problemSet, setting }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>
          <Link
            to={
              setting
                ? `/setting/problem-set/${problemSet.id}`
                : `/problem-sets/${problemSet.id}`
            }
            className="text-decoration-none text-dark"
          >
            {problemSet.name}
          </Link>
        </Card.Title>
        <Card.Text>{problemSet.short_description}</Card.Text>
        <div className="text-muted small">
          <p className="mb-1">
            Created: {new Date(problemSet.created_at).toLocaleDateString()}
          </p>
          <p className="mb-0">
            Expires:{" "}
            {new Date(problemSet.expired_at || "").toLocaleDateString()}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProblemSetCard;
