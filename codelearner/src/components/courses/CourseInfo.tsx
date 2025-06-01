import React from "react";
import { Card, Spinner, Alert, Button } from "react-bootstrap";
import { useCourseInfo } from "../../features/hooks/course/useCourseInfo";
import { getAuthToken } from "../../config/loader/getLocalItem";
import { enrollCourse } from "../../service/user-service/enroll/enrollCourse";
import { toast, ToastContainer } from "react-toastify";
import { cancelCourses } from "../../service/user-service/enroll/cancelCourses";

const CourseInfo: React.FC<{ courseId: string | undefined }> = ({
  courseId,
}) => {
  const token = getAuthToken();

  const { loading, course, enroll, setEnroll } = useCourseInfo({
    courseId,
    token: token!,
    enrollCheck: true,
  });

  const handleEnroll = async () => {
    try {
      await toast.promise(enrollCourse(courseId!, token!), {
        pending: "Enrolling",
        success: "Enroll success",
        error: "You have already enrolled",
      });
      setEnroll(true);
    } catch (error) {
      console.log("handleEnroll", error);
    }
  };

  const handleLeave = async () => {
    try {
      await toast.promise(cancelCourses(courseId!, token!), {
        pending: "Cancelling",
        success: "Successfuly cancelled",
        error: "Error",
      });
      setEnroll(false);
    } catch (error) {}
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
          {!enroll && token && (
            <Button
              variant="primary"
              size="sm"
              className="me-auto"
              onClick={handleEnroll}
            >
              Enroll course?
            </Button>
          )}

          {enroll && token && (
            <Button
              variant="danger"
              size="sm"
              className="me-auto"
              onClick={handleLeave}
            >
              Cancel course?
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CourseInfo;
