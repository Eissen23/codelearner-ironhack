import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useProblemSets } from "../../features/hooks/problemsets/useProblemSets";
import ProblemSetCard from "./element/ProblemSetCard";

const ProblemSetList = () => {
  const { problemSets, isLoading, error } = useProblemSets();

  if (isLoading)
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {problemSets.map((problemSet) => (
          <ProblemSetCard problemSet={problemSet} />
        ))}
      </Row>
    </Container>
  );
};

export default ProblemSetList;
