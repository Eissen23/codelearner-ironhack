import LayoutHome from "../../layout/LayoutHome";
import { Spinner, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCourseInfo } from "../../features/hooks/course/useCourseInfo";
import CourseInfoItem from "../../components/courses/element/CourseInfoItem";

const CourseSettingPage: React.FC = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const { loading, course, belong } = useCourseInfo(course_id || "");

  if (loading) {
    return (
      <LayoutHome>
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </LayoutHome>
    );
  }

  return (
    <LayoutHome>
      <CourseInfoItem course={course} org={belong} />
      {/* Add more tabs as needed */}
    </LayoutHome>
  );
};
export default CourseSettingPage;
