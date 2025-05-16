import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useProblemSets } from "../../../features/hooks/problemsets/useProblemSets";
import ProblemSetCard from "../../problemset/element/ProblemSetCard";

const ProblemSetInOrg: React.FC<{ org_id: string; isMod?: boolean }> = ({
  org_id,
  isMod,
}) => {
  const { problemSets, isLoading } = useProblemSets(org_id);

  if (isLoading)
    return (
      <Spinner
        animation="border"
        role="status"
        className="d-block mx-auto my-5"
      />
    );
  return (
    <div className="moderator-org">
      <h4>Problem Sets In Organization</h4>
      {problemSets.length ? (
        <Row>
          {problemSets.map((problemSet) => (
            <Col md={6} lg={4} key={problemSet.id} className="mb-3">
              <ProblemSetCard problemSet={problemSet} setting={isMod} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No problem set available</div>
      )}
    </div>
  );
};

export default ProblemSetInOrg;
