import React, { useState } from "react";
import { Org } from "../../types/org/org.type";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { createOrg } from "../../service/api/org-manage/createOrg";
import { useAuth } from "../../context/auth/AuthContext";

const CreateOrganizationForm: React.FC = () => {
  const { isAuthenticated, token } = useAuth();
  const [formData, setFormData] = useState<
    Omit<Org, "id" | "created_at" | "updated_at">
  >({
    name: "",
    contact_email: "",
    description: "",
    website: "",
    logo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Organization Created:", formData);
    // Add your API call or logic to handle form submission here
    await createOrg(token, formData);
  };

  if (!isAuthenticated) {
    return <Alert variant="danger">Login to use feature</Alert>;
  }

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
              <Form.Label htmlFor="bane">Organization Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={11}
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
