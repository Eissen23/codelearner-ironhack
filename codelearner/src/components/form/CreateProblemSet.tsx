import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ProblemSet } from "../../types/org/problem_set.type";
import { Organization } from "../../types/user.type";
import { useAuth } from "../../context/auth/AuthContext";
import { addProblemSet } from "../../service/api/problem-set-manage/addProblemSet";
import { toast, ToastContainer } from "react-toastify";

const CreateProblemSet: React.FC<{ orgs: Organization[] }> = ({ orgs }) => {
  const { token } = useAuth();
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<
    Omit<ProblemSet, "id" | "created_at">
  >({
    name: "",
    description: "",
    short_description: "",
    logo: "",
    org_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await addProblemSet(formData, token || "");
      toast("Successfully added course");
    } catch (error) {
      toast.error("Failed to add course");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4 mb-5">
      <ToastContainer />
      <Form onSubmit={handleSubmit} className="d-block p-3">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <h4 className="text-center mb-0">Add problem set</h4>
          <Button className="d-block" variant="primary" type="submit" size="sm">
            {Loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </>
            ) : (
              "Add Problem set"
            )}
          </Button>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">ProblemSet's organization*</Form.Label>
              <Form.Select
                id="org_id"
                defaultValue={0}
                name="org_id"
                onChange={handleSelect}
                required
              >
                <option value={0}>Organization select</option>
                {orgs.map(
                  (org) =>
                    org.pivot.role === "OrgHead" && (
                      <option key={org.id} value={org.id}>
                        {org.name}
                      </option>
                    )
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">ProblemSet name*</Form.Label>
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
              <Form.Label htmlFor="logo">Logo</Form.Label>
              <Form.Control
                type="file"
                id="logo"
                name="logo"
                value={formData.logo || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="short_description">
                Short Description*
              </Form.Label>
              <Form.Control
                as="textarea"
                id="short_description"
                name="short_description"
                value={formData.short_description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description* </Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateProblemSet;
