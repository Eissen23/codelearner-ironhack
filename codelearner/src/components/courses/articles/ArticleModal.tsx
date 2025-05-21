import React, { lazy, Suspense } from "react";
import { Modal, Spinner } from "react-bootstrap";
const ArticleModalContent = lazy(
  () => import("../../articles/element/ArticleModalContent")
);

type ModalProps = {
  tags: string;
  show: boolean;
  handleHide: () => void;
};

const ArticleModal: React.FC<ModalProps> = ({ tags, show, handleHide }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Related article to: {tags}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Suspense fallback={<Spinner animation="border" />}>
          {show && <ArticleModalContent tags={tags} />}
        </Suspense>
      </Modal.Body>
    </Modal>
  );
};

export default ArticleModal;
