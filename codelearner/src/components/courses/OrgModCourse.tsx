import { useAuth } from "../../context/auth/AuthContext";
import CourseCardItem from "./element/CourseCardItem";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import { useCourseMod } from "../../features/hooks/course/useCourseMod";

const OrgModCourse = () => {
  const { token } = useAuth();

  const { courses, isLoading } = useCourseMod(token);

  if (isLoading) return <Spinner animation="border" role="status"></Spinner>;

  if (!courses) {
    return <Alert variant="danger"> Failed to fetch courses</Alert>;
  }

  return (
    <div className="orghead-course">
      {courses.length ? (
        <Row>
          {courses.map((course) => (
            <Col key={`crs-${course.id}`} md={4} xs={12} className="mb-3">
              <CourseCardItem setting course={course} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default OrgModCourse;
