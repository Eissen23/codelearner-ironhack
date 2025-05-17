import React from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RichTextEditor from "../tiptap/RichTextEditor";
import { useArticleForm } from "../../hooks/articles/useArticleFormReturn";
import { Article } from "../../../types/content/article.type";
import { ToastContainer } from "react-toastify";

const ArticleForm: React.FC<{ articleData?: Article; nonEdit?: boolean }> = ({
  articleData,
  nonEdit = false,
}) => {
  const {
    article,
    uploading,
    handleChange,
    handleContentUpdate,
    handleSubmit,
  } = useArticleForm(articleData, nonEdit);

  return (
    <Container className="my-4">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Article Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={article.name || ""}
                onChange={handleChange}
                placeholder="Enter article name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description*</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={article.description || undefined}
                onChange={handleChange}
                placeholder="Enter article description"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type*</Form.Label>
              <Form.Select
                name="type"
                value={article.type || "article"}
                onChange={handleChange}
                required
              >
                <option value="article">Article</option>
                <option value="solution">Solution</option>
                <option value="chapter">Chapter</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="chapter">
              <Form.Label>Chapter (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="chapter"
                value={article.chapter || undefined}
                onChange={handleChange}
                placeholder="Enter chapter name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <RichTextEditor
            content={article.content ?? ""}
            onUpdate={handleContentUpdate}
            editable
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {uploading && <Spinner animation="border" />}
          {!nonEdit ? "Save Article" : "Update article"}
        </Button>
      </Form>
    </Container>
  );
};

export default ArticleForm;
