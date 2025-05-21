import React from "react";
import { Accordion, Alert, Spinner } from "react-bootstrap";
import { useTagArticle } from "../../../features/hooks/articles/useTagArticle";
import ArticleAccordionItem from "../../articles/element/ArticleAccordionItem";

type ModalContentProps = {
  tags: string;
};

const ArticleModalContent: React.FC<ModalContentProps> = ({ tags }) => {
  const { articles, loading } = useTagArticle(tags);

  return (
    <>
      {loading && <Spinner animation="border" />}
      {!loading && articles?.length === 0 && (
        <Alert variant="info">No article available</Alert>
      )}
      {!loading && (
        <Accordion>
          {articles?.map((article) => (
            <ArticleAccordionItem key={`rel-${article.id}`} article={article} />
          ))}
        </Accordion>
      )}
    </>
  );
};

export default ArticleModalContent;
