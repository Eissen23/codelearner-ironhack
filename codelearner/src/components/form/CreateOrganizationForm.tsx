import React from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useOrgCreate } from "../../features/hooks/orgs/useOrgCreate";

const CreateOrganizationForm: React.FC = () => {
  const {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    isAuthenticated,
    isLoading,
  } = useOrgCreate();

  if (!isAuthenticated) {
    return <Alert variant="danger">Login to use feature</Alert>;
  }

  return (
    <div className="container-fluid align-items-center justify-content-center bg-light">
      <ToastContainer />
      <Form
        onSubmit={handleSubmit}
        className="d-block p-2"
        encType="multipart/form-data"
      >
        <div className="d-flex justify-content-between mb-4 mt-3">
          <h2 className="text-center mb-0">Create Organization</h2>
          <Button
            className="d-block"
            variant="primary"
            type="submit"
            size="sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </>
            ) : (
              "Create Organization"
            )}
          </Button>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="bane">Organization Name*</Form.Label>
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
              <Form.Label htmlFor="contact_email">Contact Email*</Form.Label>
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
              <Form.Label htmlFor="logo" className="d-block">
                Select logo
              </Form.Label>

              {formData.logo && (
                <div
                  className="bg-white p-3 rounded-2 mb-2 shadow"
                  style={{ height: "6rem", width: "6rem" }}
                >
                  <div className="ratio ratio-1x1">
                    <img
                      className="img-fluid"
                      alt="logo"
                      src={URL.createObjectURL(formData.logo as File)}
                    ></img>
                  </div>
                </div>
              )}

              <Form.Control
                type="file"
                id="logo"
                name="logo"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description*</Form.Label>
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
