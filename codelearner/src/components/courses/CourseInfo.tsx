import React from "react";
import { Card, Spinner, Alert, Button } from "react-bootstrap";
import { useCourseInfo } from "../../features/hooks/course/useCourseInfo";
import { getAuthToken } from "../../config/loader/getLocalItem";
import { enrollCourse } from "../../service/user-service/enroll/enrollCourse";
import { toast, ToastContainer } from "react-toastify";

const CourseInfo: React.FC<{ courseId: string | undefined }> = ({
  courseId,
}) => {
  const { loading, error, course } = useCourseInfo(courseId);
  const token = getAuthToken();
  const handleEnroll = async () => {
    try {
      await toast.promise(enrollCourse(courseId!, token!), {
        pending: "Enrolling",
        success: "Enroll success",
        error: "You have already enrolled",
      });
    } catch (error) {
      console.log("handleEnroll", error);
    }
  };

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
    <>
      <ToastContainer />
      <Card className="shadow-sm">
        <Card.Header as="h5">{course.name}</Card.Header>
        <Card.Body>
          <Card.Title>Course Details</Card.Title>
          <Card.Text>
            <strong>What's this courses about?</strong>
            <br />
            {course.short_description}
          </Card.Text>
          <Card.Text className="text-secondary">{course.description}</Card.Text>
          {course.duration !== 0 && (
            <Card.Text>
              <strong>Duration:</strong> {course.duration}
            </Card.Text>
          )}
          {token && (
            <Button
              variant="primary"
              size="sm"
              className="me-auto"
              onClick={handleEnroll}
            >
              Enroll course?
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CourseInfo;
