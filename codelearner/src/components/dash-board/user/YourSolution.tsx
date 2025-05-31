import React from "react";
import useYourSolution from "../../../features/hooks/users/useYourSolution";
import { Alert, ListGroup, Spinner } from "react-bootstrap";

import USolutionItem from "../../solution/elements/USolutionItem";

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
                <USolutionItem us={us} />
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
