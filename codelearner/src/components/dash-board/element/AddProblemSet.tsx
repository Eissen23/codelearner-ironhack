import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { Org } from "../../../types/org/org.type";
import { useNavigate } from "react-router";
import { ProblemSetFormData } from "../../../types/org/problem_set.type";
import { addProblemSet } from "../../../service/api/problem-set-manage/addProblemSet";

const AddProblemSet: React.FC<{ orgs: Org }> = ({ orgs }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProblemSetFormData>({
    name: "",
    description: "",
    short_description: "",
    logo: undefined,
    org_id: orgs.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files?.[0] : value,
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
      await addProblemSet(formData as ProblemSetFormData, token || "");
      toast.success("Successfully added problem set");
      setTimeout(() => navigate(`/dashboard/org-manage/${orgs.id}`), 3000);
    } catch (error) {
      toast.error("Failed to add problem set");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid align-items-center justify-content-center bg-light">
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
              <Form.Label htmlFor="name">ProblemSet's organization</Form.Label>
              <Form.Select
                id="org_id"
                defaultValue={orgs.id}
                name="org_id"
                onChange={handleSelect}
                required
                disabled
              >
                <option key={orgs.id} value={orgs.id}>
                  {orgs.name}
                </option>
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

              {formData.logo && (
                <div
                  className="bg-white p-3 rounded-2 mb-2"
                  style={{ height: "6rem", width: "6rem" }}
                >
                  <div className=" ratio ratio-1x1">
                    <img
                      className="img-fluid"
                      alt="logo"
                      src={URL.createObjectURL(new Blob([formData.logo]))}
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
    </div>
  );
};

export default AddProblemSet;
