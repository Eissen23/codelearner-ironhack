import React, { useEffect, useState } from "react";
import { Card, Spinner, Alert } from "react-bootstrap";
import { getCourseInfo } from "../../service/api/cours-manage/getCourseInfo";
import { Course } from "../../types/org/course.type";

const CourseInfo: React.FC<{ courseId: string | undefined }> = ({
  courseId,
}) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        setLoading(true);
        const { data } = await getCourseInfo(courseId ? courseId : "");
        setCourse(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch course information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseInfo();
  }, [courseId]);

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
