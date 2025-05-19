import React from "react";
import { Accordion, Alert, Modal, Spinner } from "react-bootstrap";
import { useTagArticle } from "../../../features/hooks/articles/useTagArticle";
import ArticleAccordionItem from "../../articles/element/ArticleAccordionItem";

type ModalProps = {
  tags: string;
  show: boolean;
  handleHide: () => void;
};

const ArticleModal: React.FC<ModalProps> = ({ tags, show, handleHide }) => {
  const { articles, loading } = useTagArticle(tags);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Related course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner animation="border" />}
        {!loading && articles?.length === 0 && (
          <Alert variant="info">No article available</Alert>
        )}
        {!loading && (
          <Accordion>
            {articles?.map((article) => (
              <ArticleAccordionItem article={article} />
            ))}
          </Accordion>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ArticleModal;
