import { Form, useNavigate } from "react-router";
import { Org } from "../../../types/org/org.type";
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { updateOrg } from "../../../service/api/org-manage/updateOrg";
import { useAuth } from "../../../context/auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { deleteOrg } from "../../../service/api/org-manage/deleteOrg";

const OrgInfoItem: React.FC<{ org: Org; role?: string }> = ({
  org,
  role = "",
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Org>(org);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    const allowed = confirm(
      "Delete your organization \n(Only head user are allowed)"
    );

    if (!allowed) {
      return;
    }

    try {
      setLoading(true);
      await deleteOrg(formData.id.toString(), token || "");
      toast.success("Delete Success");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateOrg(token, formData);
      setIsEditing(false);
      toast.success("Update success");
    } catch (error) {
      console.error("Failed to update organization:", error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <ToastContainer></ToastContainer>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel>Name:</FormLabel>
          <FormControl
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Contact email:</FormLabel>
          <FormControl
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Website:</FormLabel>
          <FormControl
            type="text"
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Description:</FormLabel>
          <FormControl
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Created Date:</FormLabel>
          <FormText> {new Date(org.created_at).toDateString()}</FormText>
        </FormGroup>

        {role === "HEAD" && (
          <div className="d-flex gap-2 justify-content-between">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              {loading && (
                <span>
                  <Spinner animation="border" size="sm"></Spinner>
                </span>
              )}
              Delete
            </button>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              {isEditing && (
                <button type="submit" className="btn btn-primary">
                  {loading && (
                    <span>
                      <Spinner animation="border" size="sm"></Spinner>
                    </span>
                  )}
                  Save Changes
                </button>
              )}
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};
export default OrgInfoItem;
