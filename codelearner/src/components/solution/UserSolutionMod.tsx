import React from "react";
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
import { ToastContainer } from "react-toastify";
import { getBadgeVariant } from "../../utils/solutions/getBadgeVariant";

const UserSolutionMod: React.FC = () => {
  const { problem_id } = useParams();
  const {
    loading,
    unpublished,
    editingSolution,
    handleClick,
    handleSelect,
    updating,
    setEditingSolution,
  } = useUSMod(problem_id || "");

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
              <div className="d-flex justify-content-between align-items-center">
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
                {editingSolution === solution.id ? (
                  <Form className="mt-2">
                    <Form.Group className="mb-2">
                      <Form.Select
                        size="sm"
                        defaultValue="publish"
                        onSelect={handleSelect}
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
                    className=""
                    size="sm"
                    variant="primary"
                    onClick={() => setEditingSolution(solution.id)}
                  >
                    Edit Status
                  </Button>
                )}
              </div>
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
