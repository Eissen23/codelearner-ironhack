import React, { useState } from "react";
import { Org } from "../../types/org/org.type";
import { Form, Button, Row, Col } from "react-bootstrap";

const CreateOrganizationForm: React.FC = () => {
  const [formData, setFormData] = useState<Org>({
    id: 0,
    org_name: "",
    contact_email: "",
    description: "",
    website: "",
    logo: "",
    created_at: new Date(),
    updated_at: new Date(),
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
          <h2 className="text-center mb-0">Create Organization</h2>
          <Button className="d-block" variant="primary" type="submit" size="sm">
            Create Organization
          </Button>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="org_name">Organization Name</Form.Label>
              <Form.Control
                type="text"
                id="org_name"
                name="org_name"
                value={formData.org_name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="contact_email">Contact Email</Form.Label>
              <Form.Control
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="website">Website</Form.Label>
              <Form.Control
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="logo">Logo URL</Form.Label>
              <Form.Control
                type="file"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="contact_email">Contact Email</Form.Label>
              <Form.Control
                type="email"
                id="contact_email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
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

        <div className="d-grid"></div>
      </Form>
    </div>
  );
};

export default CreateOrganizationForm;
