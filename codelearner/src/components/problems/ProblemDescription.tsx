import React, { useState } from "react";
import { ProblemData } from "../../types/content/problem.type";
import { parseEscapeSequences } from "../../utils/parseEscapeSequence";
import { Badge, Spinner } from "react-bootstrap";
import ArticleModal from "../courses/articles/ArticleModal";

const ProblemDescription: React.FC<{ problem?: ProblemData }> = ({
  problem,
}) => {
  const [tag, setTag] = useState("");
  const [show, setShow] = useState(false);
  const handleHide = () => {
    setShow(false);
  };

  const handleClick = (tag: string) => {
    setShow(true);
    setTag(tag);
  };

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
      <ArticleModal handleHide={handleHide} tags={tag} show={show} />
      <h2 className="h2 fw-bold">{problem.name}</h2>
      <div className="badge_problemtype mb-4">
        {problem.tags?.map((tag) => (
          <Badge
            pill
            bg="primary"
            className="me-2"
            onClick={() => handleClick(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
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
