import React from "react";
import { Link, useParams } from "react-router";
import { ListGroup, Spinner, Badge, Alert } from "react-bootstrap";
import { useUSPublic } from "../../features/hooks/solution/useUSPublic";
import { ToastContainer } from "react-toastify";

const UserSolPublic: React.FC = () => {
  const { problem_id } = useParams();

  const { published, loading } = useUSPublic(problem_id || "");
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
      <ToastContainer />
      <h6 className="bg-success ps-3 py-2 text-white"> Published solution </h6>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : published?.length ? (
        <ListGroup>
          {published?.map((solution) => (
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
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info"> No public user solution made </Alert>
      )}
    </div>
  );
};

export default UserSolPublic;
