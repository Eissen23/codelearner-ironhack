import { UserCourse } from "../../../types/user.type";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router";

const CourseCard: React.FC<{ course: UserCourse }> = ({ course }) => {
  return (
    <Col key={course.id}>
      <Card className="h-100 shadow-sm hover-shadow">
        <Card.Body>
          <Card.Title>
            <Link
              to={`${course.id}/manage`}
              className="text-decoration-none text-dark"
            >
              {course.name}
            </Link>
          </Card.Title>
          <Card.Text>{course.description}</Card.Text>
          <div className="text-muted">
            <p className="mb-1">{course.description}</p>
            {course.duration && (
              <p className="mb-1">Duration: {course.duration}</p>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="text-muted">
          <small>
            Last updated: {new Date(course.created_at).toLocaleDateString()}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default CourseCard;
