import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import CourseInfo from "../../features/main/course/CourseInfo";
import LayoutHome from "../../layout/LayoutHome";
import ArticleList from "../../features/main/course/articles/ArticleList";

const CourseDetail = () => {
  const { course_id } = useParams<{ course_id: string }>();

  return (
    <LayoutHome>
      <div className="course_detail">
        <Row>
          <Col xs={12} md={4}>
            <CourseInfo courseId={course_id} />
          </Col>
          <Col xs={12} md={8}>
            <ArticleList course_id={course_id ? course_id : ""}></ArticleList>
          </Col>
        </Row>
      </div>
    </LayoutHome>
  );
};

export default CourseDetail;
