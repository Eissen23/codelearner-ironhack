import React, { useCallback } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import RichTextEditor from "../tiptap/RichTextEditor";
import { useProblemForm } from "../../hooks/problems/useProblemsForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import { ProblemData } from "../../../types/content/problem.type";
import KeyValueForm from "../../mislancenous/KeyValue";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TagifyInput from "../../mislancenous/TagInput";

const ProblemForm: React.FC<{
  problemData?: ProblemData;
  noEdit?: boolean;
}> = ({ problemData, noEdit = false }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p></p>",
    editable: true,
  });

  const {
    problem,
    setProblem,
    handleChange,
    handleSubmit,
    handleTestCasesChange,
    uploading,
  } = useProblemForm(editor, problemData, noEdit);

  const handleEditorUpdate = useCallback(
    (content: string) => {
      setProblem((prev) => {
        if (prev.description !== content) {
          return { ...prev, description: content };
        }
        return prev;
      });
    },
    [setProblem]
  );
  if (!editor) {
    return <div>Loading...</div>;
  }

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
          </Col>
        </Row>

        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3" controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <TagifyInput
                name="tags"
                initialTags={problem.tags}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="test_cases">
          <KeyValueForm
            initialData={{
              test_cases: problem.test_cases ?? { input: [""], output: [""] },
            }}
            onChange={handleTestCasesChange}
            title="Test Cases*"
          />
        </Form.Group>

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
              content={problem.description ?? "<p></p>"}
              onUpdate={handleEditorUpdate}
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
          ) : !noEdit ? (
            "Save Problem"
          ) : (
            "Update"
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ProblemForm;
