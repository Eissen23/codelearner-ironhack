import { useAuth } from "../../context/auth/AuthContext";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import ProblemSetCard from "./element/ProblemSetCard";
import { useProblemSetsMod } from "../../features/hooks/problemsets/useProblemSetMod";

const OrgProblemSetMod = () => {
  const { token } = useAuth();

  const { problemSets, isLoading } = useProblemSetsMod(token);

  if (isLoading) return <Spinner animation="border" role="status"></Spinner>;

  if (!problemSets) {
    return <Alert variant="danger"> Failed to fetch courses</Alert>;
  }

  return (
    <div className="orghead-problemset">
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

export default OrgProblemSetMod;
