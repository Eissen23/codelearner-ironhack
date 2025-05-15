import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RichTextEditor from "../tiptap/RichTextEditor";
import { useArticleForm } from "../../hooks/articles/useArticleFormReturn";

const ArticleForm: React.FC = () => {
  const { article, courses, handleChange, handleContentUpdate, handleSubmit } =
    useArticleForm();

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Article Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={article.name}
                onChange={handleChange}
                placeholder="Enter article name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={article.description}
                onChange={handleChange}
                placeholder="Enter article description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="chapter">
              <Form.Label>Chapter (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="chapter"
                value={article.chapter}
                onChange={handleChange}
                placeholder="Enter chapter name"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={article.type}
                onChange={handleChange}
                required
              >
                <option value="article">Article</option>
                <option value="solution">Solution</option>
                <option value="chapter">Chapter</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="course_id">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course_id"
                value={article.course_id}
                onChange={handleChange}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="mod_id">
              <Form.Label>Module ID</Form.Label>
              <Form.Control
                type="number"
                name="mod_id"
                value={article.mod_id}
                onChange={handleChange}
                placeholder="Enter module ID"
                required
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
          Save Article
        </Button>
      </Form>
    </Container>
  );
};

export default ArticleForm;
