import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { getCourseHead } from "../../../service/api/user-manage/getCourseHead";
import { Course } from "../../../types/org/course.type";
import CourseCardItem from "./element/CourseCardItem";
import { Alert, Button, Row, Spinner } from "react-bootstrap";

const OrgHeadCourse = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState(true);

  // refresh
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await getCourseHead(token || "");
        setCourses(response);
      } catch (err) {
        alert(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [refreshKey]);

  if (isLoading) return <Spinner animation="border" role="status"></Spinner>;

  if (!courses) {
    return <Alert variant="danger"> Failed to fetch courses</Alert>;
  }

  return (
    <div className="orghead-course">
      <Button
        onClick={handleRefresh}
        variant="secondary"
        className="mb-3"
        size="sm"
      >
        <i className="bi bi-arrow-clockwise"></i>
        <span>Refresh</span>
      </Button>
      {courses.length ? (
        <Row>
          {courses.map((course) => (
            <CourseCardItem course={course} />
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default OrgHeadCourse;
