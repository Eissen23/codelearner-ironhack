import React from "react";
import { Col, Card, Row } from "react-bootstrap";
import { useProblemSets } from "../../../features/hooks/problemsets/useProblemSets";
import ProblemSetCard from "../../problemset/element/ProblemSetCard";

const ProblemSetInOrg: React.FC<{ org_id: string }> = ({ org_id }) => {
  const { problemSets, isLoading } = useProblemSets(org_id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moderator-org">
      <h4>Problem Sets In Organization</h4>
      {problemSets.length ? (
        <Row>
          {problemSets.map((problemSet) => (
            <ProblemSetCard problemSet={problemSet} />
          ))}
        </Row>
      ) : (
        <div className="text-info">No problem set available</div>
      )}
    </div>
  );
};

export default ProblemSetInOrg;
