import { Course } from "../../../../types/org/course.type";
import { Col, Card } from "react-bootstrap";

const CourseCardItem: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Col key={`crs-${course.id}`} md={4} xs={12} className="mb-3">
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
              Created: {new Date(course.created_at).toLocaleDateString()}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CourseCardItem;
