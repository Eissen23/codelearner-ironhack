import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ArticleInfo from "../../components/articles/ArticleInfo";
import LayoutHome from "../../layout/LayoutHome";
import ArticleList from "../../components/courses/articles/ArticleList";

const ArticleDetail = () => {
  const { course_id, article_id } = useParams();

  return (
    <LayoutHome>
      <Row>
        <Col md={2}>
          <h2 className="fs-5">Chapter:</h2>
          <ArticleList course_id={course_id || ""} />
        </Col>
        <Col md={8}>
          <ArticleInfo article_id={article_id || ""} />
        </Col>
      </Row>
    </LayoutHome>
  );
};

export default ArticleDetail;
