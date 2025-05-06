import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Course } from "../../types/org/course.type";

const CreateOrganizationForm: React.FC = () => {
  const [formData, setFormData] = useState<Course>({
    id: 0,
    name: "",
    description: "",
    short_description: "",
    fee: 0.0,
    duration: 0,
    created_at: new Date(),
    currency: "",
    org_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization Created:", formData);
    // Add your API call or logic to handle form submission here
  };

  return (
    <div className="container-fluid align-items-center justify-content-center bg-light">
      <Form onSubmit={handleSubmit} className="d-block">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <h2 className="text-center mb-0">Create Course</h2>
          <Button className="d-block" variant="primary" type="submit" size="sm">
            Create Course
          </Button>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="org_name">Course name</Form.Label>
              <Form.Control
                type="text"
                id="org_name"
                name="org_name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="contact_email">Short Description</Form.Label>
              <Form.Control
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.short_description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="website">Fee</Form.Label>
              <Form.Control
                type="url"
                id="website"
                name="website"
                value={formData.fee}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="logo">Currency</Form.Label>
              <Form.Control
                type=""
                id="logo"
                name="logo"
                value={formData.currency}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="duration">Duration</Form.Label>
              <Form.Control
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateOrganizationForm;
