import React from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import RichTextEditor from "../tiptap/RichTextEditor";
import { useProblemForm } from "../../hooks/problems/useProblemsForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";

const ProblemForm: React.FC = () => {
  const {
    problem,
    setProblem,
    testCaseInputRaw,
    testCaseOutputRaw,
    handleChange,
    handleBlur,
    handleSubmit,
    uploading,
  } = useProblemForm(null);

  return (
    <Container className="my-4">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Problem Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={problem.name ?? ""}
                onChange={handleChange}
                placeholder="Enter problem name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="test_case_input">
              <Form.Label>Test Case Input*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="test_case_input"
                value={testCaseInputRaw}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter test case inputs as comma-separated values"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="difficulty">
              <Form.Label>Difficulty*</Form.Label>
              <Form.Select
                name="difficulty"
                value={problem.difficulty ?? 1}
                onChange={handleChange}
                required
              >
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="test_case_output">
              <Form.Label>Test Case Output*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="test_case_output"
                value={testCaseOutputRaw}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter test case outputs as comma-separated values"
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="is_rich_text">
          <Form.Label>Description Type*</Form.Label>
          <Form.Check
            type="checkbox"
            name="is_rich_text"
            label="Use Rich Text Editor"
            checked={problem.is_rich_text}
            onChange={(e) => {
              setProblem((prev) => ({
                ...prev,
                is_rich_text: e.target.checked,
              }));
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description*</Form.Label>
          {problem.is_rich_text ? (
            <RichTextEditor
              content={problem.description ?? ""}
              onUpdate={(content) =>
                setProblem((prev) => ({ ...prev, description: content }))
              }
              editable={problem.is_rich_text}
            />
          ) : (
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={problem.description ?? ""}
              onChange={handleChange}
              placeholder="Enter problem description"
              required
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          {uploading ? (
            <div>
              <Spinner animation="border" size="sm" />
              Saving
            </div>
          ) : (
            "Save Problem"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ProblemForm;
