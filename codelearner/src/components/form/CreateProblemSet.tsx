import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { ProblemSet } from "../../types/org/problem_set.type";

const CreateProblemSet: React.FC = () => {
  const [formData, setFormData] = useState<ProblemSet>({
    id: 0,
    org_id: 0,
    name: "",
    description: "",
    short_description: "",
    created_at: new Date(),
    expired_at: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="mt-4 mb-5">
      <h2>Create New Problem Set</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Short Description</Form.Label>
          <Form.Control
            type="text"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Problem Set
        </Button>
      </Form>
    </Container>
  );
};

export default CreateProblemSet;
