import LayoutHome from "../../layout/LayoutHome";
import { Spinner } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom";
import { useCourseInfo } from "../../features/hooks/course/useCourseInfo";
import CourseInfoItem from "../../components/courses/element/CourseInfoItem";
import ArticleList from "../../components/courses/articles/ArticleList";

const CourseSettingPage: React.FC = () => {
  const { course_id } = useParams<{ course_id: string }>();
  const { role } = useLoaderData();
  const { loading, course, belong } = useCourseInfo(course_id || "", true);

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
      <section className="course_info_form mb-5">
        <CourseInfoItem course={course} org={belong} user_role={role} />
      </section>

      <section className="articlelist">
        <ArticleList course_id={course_id || ""} editable />
      </section>
    </LayoutHome>
  );
};
export default CourseSettingPage;
