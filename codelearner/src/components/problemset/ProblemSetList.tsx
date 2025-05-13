import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useProblemSets } from "../../features/hooks/problemsets/useProblemSets";

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
          <Col key={problemSet.id}>
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
                    Created:{" "}
                    {new Date(problemSet.created_at).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    Expires:{" "}
                    {new Date(problemSet.expired_at).toLocaleDateString()}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProblemSetList;
