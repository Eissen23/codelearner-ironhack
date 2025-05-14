import { Container, Row, Spinner, Col } from "react-bootstrap";
import CourseCardItem from "./element/CourseCardItem";
import { useCourses } from "../../features/hooks/course/useCourses";

const CourseList = () => {
  const { courses, loading } = useCourses();

  if (loading)
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  return (
    <Container className="py-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {courses.map((course) => (
          <Col key={`crs-${course.id}`} md={4} xs={12} className="mb-3">
            <CourseCardItem course={course} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CourseList;
