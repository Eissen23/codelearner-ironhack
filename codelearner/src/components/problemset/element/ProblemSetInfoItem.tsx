import React, { useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../context/auth/AuthContext";
import { useNavigate } from "react-router";
import { ProblemSet } from "../../../types/org/problem_set.type";
import { updateProblemSet } from "../../../service/api/problem-set-manage/updateProblemSet";
import { deleteProblemSet } from "../../../service/api/problem-set-manage/deleteProblemSet";
import { Org } from "../../../types/org/org.type";

const ProblemSetInfoItem: React.FC<{
  problemSet: ProblemSet;
  loading: boolean;
  org: Org;
}> = ({ problemSet, loading, org }) => {
  // const { problemSet, belong, loading } = useProblemSetsInfo(problem_set_id);
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  if (loading) {
    return <Spinner animation="border" role="status" className="mt-3" />;
  }
  if (!problemSet) {
    return <div>No problem set information available.</div>;
  }

  const [formData, setFormData] = useState<Omit<ProblemSet, "created_at">>({
    id: problemSet.id,
    name: problemSet.name,
    description: problemSet.description,
    short_description: problemSet.short_description,
    logo: problemSet.logo,
    org_id: problemSet.org_id,
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
      await updateProblemSet(token || "", formData);
      toast("Successfully updated problem set");
    } catch (error) {
      toast.error("Failed to update problem set");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleDelelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await deleteProblemSet(token || "", formData.id.toString());
      toast("Delete Success");
      navigate("/dashboard/head/problemset");
    } catch (error) {
      console.log("error while delete", error);
      toast.error("Delete fail");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid align-items-center justify-content-center bg-light">
      <ToastContainer />
      <Form onSubmit={handleSubmit} className="d-block p-3">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <h4 className="text-center mb-0">Problem Set info</h4>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">ProblemSet's organization*</Form.Label>
              <Form.Select
                id="org_id"
                defaultValue={problemSet.org_id}
                name="org_id"
                onChange={handleSelect}
                required
                disabled
              >
                <option key={problemSet.org_id} value={problemSet.org_id}>
                  {org ? org.name : problemSet.org_id}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex gap-2 justify-content-between">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelelete}
          >
            {Loading && (
              <span>
                <Spinner animation="border" size="sm"></Spinner>
              </span>
            )}
            Delete
          </button>

          <div className="d-flex">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button type="submit" className="btn btn-primary ms-3">
                {Loading && (
                  <span>
                    <Spinner animation="border" size="sm"></Spinner>
                  </span>
                )}
                Save Changes
              </button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProblemSetInfoItem;
