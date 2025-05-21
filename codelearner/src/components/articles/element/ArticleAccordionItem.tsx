import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { Article } from "../../../types/content/article.type";
import { Link } from "react-router";

const ArticleAccordionItem: React.FC<{
  article: Article;
  editable?: boolean;
}> = ({ article, editable }) => {
  return (
    <Accordion.Item eventKey={article.id} className="mb-3">
      <Accordion.Header>{article.name}</Accordion.Header>
      <Accordion.Body>
        <p>{article.description}</p>
        <Button variant="primary">
          <Link
            className="text-white text-decoration-none"
            to={
              editable
                ? `/setting/article/${article.id}`
                : `/courses/${article.course_id}/articles/${article.id}`
            }
          >
            To article
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ArticleAccordionItem;
