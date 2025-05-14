import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
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
          <Col md={6} lg={4} key={problemSet.id} className="mb-3">
            <ProblemSetCard problemSet={problemSet} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProblemSetList;
