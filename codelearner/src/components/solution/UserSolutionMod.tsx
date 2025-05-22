import React, { useState } from "react";
import { useParams } from "react-router";
import { useUSMod } from "../../features/hooks/solution/useUSMod";
import {
  ListGroup,
  Spinner,
  Badge,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const UserSolutionMod: React.FC = () => {
  const { problem_id } = useParams();
  const { unpublished, loading } = useUSMod(problem_id || "");
  const [editingSolution, setEditingSolution] = useState<string | null>(null);

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

  return (
    <div className="unpublished_solution">
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
                  <h6 className="mb-1">{solution.name || "Anonymous"}</h6>
                </div>
                <Badge bg={getBadgeVariant(solution.status)}>
                  {solution.status}
                </Badge>
              </div>

              {editingSolution === solution.id ? (
                <Form className="mt-2">
                  <Form.Group className="mb-2">
                    <Form.Select size="sm" defaultValue={solution.status}>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="success">
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
