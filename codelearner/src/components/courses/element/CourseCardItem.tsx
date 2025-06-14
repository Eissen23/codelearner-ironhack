import { Link } from "react-router-dom";
import { Course } from "../../../types/org/course.type";
import { Card } from "react-bootstrap";

const CourseCardItem: React.FC<{ course: Course; setting?: boolean }> = ({
  course,
  setting,
}) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Img
          style={{
            height: "200px",
            objectFit: "cover",
            padding: "1rem",
          }}
          alt={course.name}
          src={
            course.logo ?? `https://placehold.co/200x200?text=${course.name}`
          }
        ></Card.Img>
        <Card.Title>
          <Link
            to={
              setting ? `/setting/course/${course.id}` : `/courses/${course.id}`
            }
            className="text-decoration-none text-dark"
          >
            {course.name}
          </Link>
        </Card.Title>
        <Card.Text>{course.description}</Card.Text>
        <div className="text-muted small">
          <p className="mb-1">
            Created: {new Date(course.created_at).toLocaleDateString()}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CourseCardItem;
