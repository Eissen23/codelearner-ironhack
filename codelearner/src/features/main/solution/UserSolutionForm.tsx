import React from "react";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";
import { UserSolution } from "../../../types/content/solution.type";
import RichTextEditor from "../tiptap/RichTextEditor";
import useFormUSSolution from "../../hooks/solution/useFormUSSolution";
import { ToastContainer } from "react-toastify";

interface UserSolutionFormProps {
  initialData?: Partial<UserSolution>;
  update?: boolean;
  editable?: boolean;
}

const UserSolutionForm: React.FC<UserSolutionFormProps> = ({
  initialData = {},
  update = false, //sửa update
  editable = true,
}) => {
  const {
    formData,
    uploading,
    handleSubmit,
    handleChange,
    handleContentChange,
    handlDelete,
  } = useFormUSSolution(initialData, update);

  return (
    <Container className="my-4">
      <ToastContainer />
      <Card>
        <Card.Body>
          <Card.Title>User Solution Form</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter solution name"
                disabled={!editable}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter solution description"
                disabled={!editable}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content*</Form.Label>
              <RichTextEditor
                content={formData.content}
                onUpdate={handleContentChange}
                editable={editable}
              />
            </Form.Group>
            {initialData.id && (
              <Form.Group className="mb-3" controlId="id">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" value={initialData.id} disabled />
              </Form.Group>
            )}
            {initialData.created_at && (
              <Form.Group className="mb-3" controlId="created_at">
                <Form.Label>Created At</Form.Label>
                <Form.Control
                  type="text"
                  value={initialData.created_at.toString()}
                  disabled
                />
              </Form.Group>
            )}
            {initialData.updated_at && (
              <Form.Group className="mb-3" controlId="updated_at">
                <Form.Label>Updated At</Form.Label>
                <Form.Control
                  type="text"
                  value={initialData.updated_at.toString()}
                  disabled
                />
              </Form.Group>
            )}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" disabled={!editable}>
                {uploading && <Spinner animation="border" size="sm" />}
                {update ? "Update solution" : "Confirm"}
              </Button>
              {!update && (
                <Button variant="danger" type="button" onClick={handlDelete}>
                  {uploading && <Spinner animation="border" size="sm" />}
                  Delete
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserSolutionForm;
