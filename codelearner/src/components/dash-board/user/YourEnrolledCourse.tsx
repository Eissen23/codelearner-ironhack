import { Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { UserDetail } from "../../../types/user.type";
import { Link } from "react-router-dom";
import CourseCard from "../element/CourseCard";

const YourCourse: React.FC = () => {
  const userDetail = useOutletContext() as UserDetail | null;
  const userCourse = userDetail?.courses;

  if (!userCourse) {
    return (
      <Spinner animation="border" className="align-items-center"></Spinner>
    );
  }

  return (
    <div>
      <h4 className="display-6 mb-3">Your submission</h4>
      {userCourse?.length !== 0 ? (
        <Row>
          {userCourse.map((user_course) => (
            <Col xs={12} md={4} key={user_course.id}>
              <CourseCard course={user_course} />
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
