import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import ArticleInfo from "../../components/articles/ArticleInfo";
import LayoutHome from "../../layout/LayoutHome";

const ArticleDetail = () => {
  const { article_id } = useParams();

  return (
    <LayoutHome noGutter>
      <Row>
        <Col md={2}>{/* Article list like w3s */}</Col>
        <Col md={8}>
          <ArticleInfo article_id={article_id || ""} />
        </Col>
      </Row>
    </LayoutHome>
  );
};

export default ArticleDetail;
