import { useEffect, useState } from "react";
import { getCourseList } from "../../../service/api/cours-manage/getCourseList";
import { Course } from "../../../types/org/course.type";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseList();
        setCourses(response.courses_page.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
        {courses.map((course) => (
          <Col key={course.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <div className="text-muted small">
                  <p className="mb-1">
                    Created: {new Date(course.created_at).toLocaleDateString()}
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

export default CourseList;
