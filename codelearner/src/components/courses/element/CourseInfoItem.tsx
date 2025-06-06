import { useState } from "react";
import { useAuth } from "../../../context/auth/AuthContext";
import { Course } from "../../../types/org/course.type";
import { Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { updateCourse } from "../../../service/api/cours-manage/updateCourse";
import { deleteCourse } from "../../../service/api/cours-manage/deleteCourse";
import { useNavigate } from "react-router";
import { Org } from "../../../types/org/org.type";

const CourseInfoItem: React.FC<{
  course: Course | null;
  org?: Org | null;
  user_role?: "HEAD" | "MOD" | "UNAUTHORIZE";
}> = ({ course, org, user_role }) => {
  if (!course) {
    return <div>Loading...</div>;
  }

  const navigate = useNavigate();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Course, "created_at">>({
    id: course.id,
    name: course.name,
    description: course.description,
    short_description: course.short_description,
    fee: course.fee,
    currency: course.currency,
    duration: course.duration,
    logo: course.logo,
    org_id: course.org_id,
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
      await updateCourse(token, formData);
      toast("Successfully updated course");
    } catch (error) {
      toast.error("Failed to update course");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const allowed = confirm(
      "Delete your Course? \n(Only head user are allowed)"
    );

    if (!allowed) {
      return;
    }

    try {
      setLoading(true);
      await deleteCourse(formData.id.toString(), token || "");
      toast("Delete Success");
      setTimeout(() => {
        navigate(-1);
      }, 5000);
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
          <h2 className="text-center mb-0">Course Info</h2>
        </div>
        <Row>
          <Col md={6} xs={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Course's organization*</Form.Label>
              <Form.Select
                id="org_id"
                value={formData.org_id}
                name="org_id"
                onChange={handleSelect}
                required
                disabled
              >
                <option value={course.org_id}>
                  {org ? org.name : course.org_id}
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="name">Course name*</Form.Label>
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
              <Form.Label htmlFor="fee">Fee</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  id="fee"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  disabled={!isEditing}
                ></Form.Control>

                <Form.Select
                  id="currency"
                  name="currency"
                  defaultValue="USD"
                  onChange={handleSelect}
                  disabled={!isEditing}
                >
                  <option value="USD">USD</option>
                  <option value="VND">VND</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="logo" className="d-block">
                Logo
              </Form.Label>

              {formData.logo && (
                <div
                  className="bg-white p-3 rounded-2 mb-2"
                  style={{ height: "6rem", width: "6rem" }}
                >
                  <div className=" ratio ratio-1x1">
                    <img
                      className="img-fluid"
                      alt="logo"
                      src={formData.logo}
                    ></img>
                  </div>
                </div>
              )}
              <Form.Control
                type="file"
                id="logo"
                name="logo"
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="duration">Duration</Form.Label>
              <Form.Control
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
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
                required
                disabled={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description*</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex gap-2 justify-content-between">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={user_role !== "HEAD"}
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
              disabled={user_role !== "HEAD"}
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

export default CourseInfoItem;
