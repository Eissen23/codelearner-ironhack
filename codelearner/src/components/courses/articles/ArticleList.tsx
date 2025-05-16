import React from "react";
import { Accordion, Alert, Button } from "react-bootstrap";
import { useArticle } from "../../../features/hooks/articles/useArticles";
import { Link } from "react-router";

const ArticleList: React.FC<{ course_id: string; editable?: boolean }> = ({
  course_id,
  editable,
}) => {
  const { articles, loading } = useArticle(course_id);

  if (loading) {
    return <div>Is loading ...</div>;
  }

  if (articles && articles?.length < 0) {
    return <Alert variant="info"> No article for this course</Alert>;
  }

  return (
    <div className="article_list">
      <div className="d-flex justify-content-between mb-4">
        <h4>Chapter in course</h4>
        {editable && (
          <Button variant="primary" size="sm">
            <Link
              className="text-white text-decoration-none"
              to={`add-article`}
            >
              Add Course
            </Link>
          </Button>
        )}
      </div>
      <Accordion defaultActiveKey="0" flush>
        {articles?.map((article) => (
          <Accordion.Item
            key={article.id}
            eventKey={article.id}
            className="mb-3"
          >
            <Accordion.Header>{article.name}</Accordion.Header>
            <Accordion.Body>
              <p>{article.description}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ArticleList;
