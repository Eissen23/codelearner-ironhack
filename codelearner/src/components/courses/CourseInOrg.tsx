import { getCourseInOrg } from "../../service/api/cours-manage/getCourseInOrg";
import React from "react";
import { Course } from "../../types/org/course.type";
import { Row } from "react-bootstrap";
import CourseCardItem from "./element/CourseCardItem";

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
            <CourseCardItem course={course} />
          ))}
        </Row>
      ) : (
        <div className="text-info">No course available</div>
      )}
    </div>
  );
};

export default CourseInOrg;
