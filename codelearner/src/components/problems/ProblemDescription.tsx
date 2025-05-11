import React from "react";
import { ProblemData } from "../../types/content/problem.type";
import { parseEscapeSequences } from "../../utils/parseEscapeSequence";
import { Spinner } from "react-bootstrap";

const ProblemDescription: React.FC<{ problem?: ProblemData }> = ({
  problem,
}) => {
  if (!problem) {
    return (
      <div className="d-flex justify-content-center p-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <div className="problem-description p-4 bg-gray-50 rounded-lg shadow-sm overflow-scroll">
      <h2 className="h2 fw-bold mb-4">{problem.name}</h2>
      {problem.is_rich_text ? (
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: problem.description }}
        />
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>
          {parseEscapeSequences(problem.description)}
        </p>
      )}
    </div>
  );
};

export default ProblemDescription;
