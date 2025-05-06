import { getCourseInOrg } from "../../../service/api/cours-manage/getCourseInOrg";
import React from "react";
import { Course } from "../../../types/org/course.type";
import { Col, Card, Row } from "react-bootstrap";

const CourseInOrg: React.FC<{ org_id: string }> = ({ org_id }) => {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { courses_page } = await getCourseInOrg(org_id);
        setCourses(courses_page.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [org_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="moderator-org">
      <h4>Course In Org</h4>
      {courses.length ? (
        <Row>
          {courses.map((course) => (
            <Col key={course.id} md={4} xs={12} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>
                    <a
                      href={`/courses/${course.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {course.name}
                    </a>
                  </Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <div className="text-muted small">
                    <p className="mb-1">
                      Created:{" "}
                      {new Date(course.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default CourseInOrg;
