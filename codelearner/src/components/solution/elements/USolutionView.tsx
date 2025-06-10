import React from "react";
import { UserSolution } from "../../../types/content/solution.type";
import { getVersionName } from "../../../data/LanguageVersion";
import { Badge } from "react-bootstrap";

interface USolutionViewProps {
  solution: UserSolution;
}

const USolutionView: React.FC<USolutionViewProps> = ({ solution }) => {
  return (
    <article className="user-solution-view">
      <header className="mb-4">
        <h1 className="fs-3 mb-2">{solution.name}</h1>
        <div className="d-flex gap-3 align-items-center mb-3">
          <Badge bg={solution.status === "published" ? "success" : "secondary"}>
            {solution.status}
          </Badge>
          {solution.user_submission && (
            <span className="text-muted">
              Language: {getVersionName(solution.user_submission.language_id)}
            </span>
          )}
        </div>
        <div className="text-muted small">
          Created: {new Date(solution.created_at).toLocaleString()}
          {solution.updated_at !== solution.created_at && (
            <> • Updated: {new Date(solution.updated_at).toLocaleString()}</>
          )}
        </div>
      </header>

      {solution.description && (
        <div 
          className="description mb-4 rich-text-content"
          dangerouslySetInnerHTML={{ __html: solution.description }}
        />
      )}

      {solution.content && (
        <div className="solution-code mb-4">
          <h2 className="fs-4 mb-3">Solution Code</h2>
          <pre className="bg-light p-3 rounded">
            <code>{solution.content}</code>
          </pre>
        </div>
      )}
    </article>
  );
};

export default USolutionView;
