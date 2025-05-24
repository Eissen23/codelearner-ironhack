import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { UserCourse } from "../../../types/user.type";
import { Link } from "react-router-dom";
import CourseCard from "../element/CourseCard";
import { useEnroll } from "../../../features/hooks/course/userEnroll";

const YourCourse: React.FC = () => {
  const token = useOutletContext() as string | null;

  const { courses, loading } = useEnroll(token!);

  if (loading) {
    return (
      <Spinner animation="border" className="align-items-center"></Spinner>
    );
  }

  return (
    <div>
      <h4 className="fs-4 mb-3">Your Courses</h4>
      {courses?.length !== 0 ? (
        <Row>
          {courses.map((user_course) => (
            <Col xs={12} md={4} key={user_course.id}>
              <CourseCard course={user_course as UserCourse} />
            </Col>
          ))}
        </Row>
      ) : (
        <div>
          <Alert variant="info">No enrolled course.....</Alert>
          <Button className="btn btn-primary">
            <Link to={"/courses"} className="text-white text-decoration-none">
              Enroll some course
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default YourCourse;
