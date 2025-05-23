import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { useUSMod } from "../../features/hooks/solution/useUSMod";
import {
  ListGroup,
  Spinner,
  Badge,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { publishUS } from "../../service/api/usersolution/publishUS";
import { useAuth } from "../../context/auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const UserSolutionMod: React.FC = () => {
  const { token } = useAuth();
  const { problem_id } = useParams();
  const [updating, setUpdating] = useState(false);

  const { unpublished, loading } = useUSMod(problem_id || "");
  const [editingSolution, setEditingSolution] = useState<string | null>(null);
  const [newStatus, setnewStatus] = useState(true);
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "unpublished":
        return "danger";
      default:
        return "warning";
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "publish") {
      setnewStatus(true);
    } else {
      setnewStatus(false);
    }
  };

  const handleClick = async () => {
    try {
      setUpdating(true);
      await publishUS(editingSolution || "", token || "", newStatus);
      toast.success("Success fully updated");
      setEditingSolution(null);
    } catch (error) {
      console.log("handleClick", error);
      toast.error("Fail to change");
      throw error;
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="unpublished_solution">
      <ToastContainer />
      <h6 className="bg-body-secondary ps-3 py-2"> Unpublished solution </h6>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : unpublished?.length ? (
        <ListGroup>
          {unpublished?.map((solution) => (
            <ListGroup.Item
              key={solution.id}
              className="d-flex flex-column gap-2"
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="mb-1">
                    <Link
                      to={`/setting/user-solution/${solution.id}`}
                      className="text-decoration-none"
                    >
                      {solution.name || "Anonymous"}
                    </Link>
                  </h6>
                </div>
                <Badge bg={getBadgeVariant(solution.status)}>
                  {solution.status}
                </Badge>
              </div>

              {editingSolution === solution.id ? (
                <Form className="mt-2">
                  <Form.Group className="mb-2">
                    <Form.Select
                      size="sm"
                      defaultValue="publish"
                      onSelect={() => handleSelect}
                    >
                      <option value="publish">Publish</option>
                      <option value="reject">Reject</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="success" onClick={handleClick}>
                      {updating && <Spinner animation="border" size="sm" />}
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditingSolution(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                <Button
                  className="mx-auto"
                  size="sm"
                  variant="primary"
                  onClick={() => setEditingSolution(solution.id)}
                >
                  Edit Status
                </Button>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info"> No User solution made </Alert>
      )}
    </div>
  );
};

export default UserSolutionMod;
