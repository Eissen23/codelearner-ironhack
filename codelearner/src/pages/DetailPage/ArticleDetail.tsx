import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ArticleInfo from "../../components/articles/ArticleInfo";
import LayoutHome from "../../layout/LayoutHome";
import ArticleSlimList from "../../components/courses/articles/ArticleSlimList";

const ArticleDetail = () => {
  const { course_id, article_id } = useParams();

  return (
    <LayoutHome noGutter>
      <Row>
        <Col md={3} className="bg-light border-end">
          <h2 className="fs-5 py-2 ">Chapter:</h2>
          <ArticleSlimList course_id={course_id || ""} editable={false} />
        </Col>
        <Col md={8}>
          <ArticleInfo article_id={article_id || ""} />
        </Col>
        <Col md={1}></Col>
      </Row>
    </LayoutHome>
  );
};

export default ArticleDetail;
