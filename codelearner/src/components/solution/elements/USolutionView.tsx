import React from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getSyntax, getVersionName } from "../../../data/LanguageVersion";
import { Badge, Spinner } from "react-bootstrap";
import SourceView from "../../monaco/SourceView";

interface USolutionViewProps {
  solution: UserSolution;
}

const USolutionView: React.FC<USolutionViewProps> = ({ solution }) => {
  if (!solution) {
    return <Spinner animation="border" />;
  }

  return (
    <article className="user-solution-view p-3">
      <header className="mb-4">
        <h4 className="fs-3 mb-2">{solution.name}</h4>
        <div className="d-flex gap-3 align-items-center mb-3">
          <Badge bg={solution.status === "published" ? "success" : "secondary"}>
            {solution.status}
          </Badge>
          {solution.user_submission && (
            <span className="text-muted">
              Language: {getVersionName(solution.user_submission.language_id)}
            </span>
          )}
          <span className="text-muted small">
            <i className="bi bi-clock-fill me-1"></i>
            {new Date(solution.created_at).toLocaleString()}
          </span>
        </div>
      </header>

      {solution.description && (
        <div 
          className="description mb-4 rich-text-content bg-light p-3 rounded"
          dangerouslySetInnerHTML={{ __html: solution.description }}
        />
      )}

      {solution.content && (
        <div className="solution-code mb-4">
          <pre className="bg-light p-3 rounded">
            <code>{solution.content}</code>
          </pre>
        </div>
      )}

      {solution.user_submission && (
        <div className="solution-code mb-4">
          <h6 className="fs-6 p-3 text-bg-dark mb-0">User Submission</h6>
          <SourceView 
            source={solution.user_submission?.source_code}
            lang={getSyntax(solution.user_submission.language_id)} 
          />
        </div>
      )}
    </article>
  );
};

export default USolutionView;
