import React from "react";
import useYourSolution from "../../../features/hooks/users/useYourSolution";
import { Alert, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { getLanguageKey } from "../../../data/LanguageMapping";

const YourSolution: React.FC = () => {
  const { loading, userSolution } = useYourSolution();
  return (
    <>
      <h3 className="fs-4">Your solution</h3>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : userSolution?.length !== 0 ? (
        <div className="your_solution">
          <ListGroup>
            {userSolution?.map((us, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between">
                  <h4 className="fs-6">{us.name}</h4>
                  <div
                    className={
                      us.status === "published"
                        ? "badge bg-success"
                        : "badge bg-secondary"
                    }
                  >
                    {us.status}
                  </div>
                  <div>
                    {getLanguageKey(us.user_submission?.language_id || 0)}
                  </div>
                  <Link to={`/setting/user-solution/${us.id}`}>
                    To your solution
                  </Link>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <Alert variant="info">No solution (yet) ...</Alert>
      )}
    </>
  );
};

export default YourSolution;
