import React from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { useCourseInfo } from "../../features/hooks/course/useCourseInfo";

const CourseInfo: React.FC<{ courseId: string | undefined }> = ({
  courseId,
}) => {
  const { loading, error, course } = useCourseInfo(courseId);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!course) {
    return <Alert variant="info">No course information available.</Alert>;
  }

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5">{course.name}</Card.Header>
      <Card.Body>
        <Card.Title>Course Details</Card.Title>
        <Card.Text>{course.description}</Card.Text>
        {course.duration && (
          <Card.Text>
            <strong>Duration:</strong> {course.duration}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default CourseInfo;
