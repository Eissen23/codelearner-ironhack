import React from "react";
import { Accordion, Alert, Button } from "react-bootstrap";
import { useArticles } from "../../../features/hooks/articles/useArticles";
import { Link } from "react-router";
import ArticleAccordionItem from "../../articles/element/ArticleAccordionItem";

const ArticleList: React.FC<{ course_id: string; editable?: boolean }> = ({
  course_id,
  editable,
}) => {
  const { articles, loading } = useArticles(course_id);

  if (loading) {
    return <div>Is loading ...</div>;
  }

  if (!articles) {
    return <Alert variant="info"> No article for this course</Alert>;
  }
  if (articles?.length < 0) {
    return <Alert variant="info"> No article for this course</Alert>;
  }

  return (
    <div className="article_list">
      {editable && (
        <div className="d-flex justify-content-between mb-4">
          <Button variant="primary" size="sm">
            <Link
              className="text-white text-decoration-none"
              to={`add-article`}
            >
              Add article
            </Link>
          </Button>
        </div>
      )}
      <Accordion defaultActiveKey="0" flush>
        {articles?.map((article) => (
          <ArticleAccordionItem
            article={article}
            editable={editable}
            key={article.id}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default ArticleList;
