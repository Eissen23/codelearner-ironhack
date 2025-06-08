import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import CourseCardItem from "./element/CourseCardItem";
import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { useCourseHead } from "../../features/hooks/course/useCourseHead";

const OrgHeadCourse = () => {
  const { token } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const { courses, isLoading } = useCourseHead(token, refreshKey);

  if (isLoading) return <Spinner animation="border" role="status"></Spinner>;

  if (!courses) {
    return <Alert variant="danger"> Failed to fetch courses</Alert>;
  }

  return (
    <div className="orghead-course">
      <Button
        onClick={handleRefresh}
        variant="secondary"
        className="mb-3"
        size="sm"
      >
        <i className="bi bi-arrow-clockwise"></i>
        <span>Refresh</span>
      </Button>
      {courses.length ? (
        <Row>
          {courses.map((course) => (
            <Col key={`crs-${course.id}`} md={3} xs={12} className="mb-3">
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

export default OrgHeadCourse;
