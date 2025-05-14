import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useProblemSetsHead } from "../../features/hooks/problemsets/useProblemSetsHead";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import ProblemSetCard from "./element/ProblemSetCard";

const ProblemSetHead = () => {
  const { token } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const { problemSets, isLoading } = useProblemSetsHead(token, refreshKey);

  if (isLoading) return <Spinner animation="border" role="status"></Spinner>;

  if (!problemSets) {
    return <Alert variant="danger"> Failed to fetch courses</Alert>;
  }

  return (
    <div className="orghead-problemset">
      <Button
        onClick={handleRefresh}
        variant="secondary"
        className="mb-3"
        size="sm"
      >
        <i className="bi bi-arrow-clockwise"></i>
        <span>Refresh</span>
      </Button>

      {problemSets.length ? (
        <Row>
          {problemSets.map((problemSet) => (
            <Col key={`pbs-${problemSet.id}`} md={4} xs={12} className="mb-3">
              <ProblemSetCard problemSet={problemSet} setting />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default ProblemSetHead;
