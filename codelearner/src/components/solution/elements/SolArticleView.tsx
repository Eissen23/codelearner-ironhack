import React from "react";
import { SolutionArticle } from "../../../types/content/solution.type";
import { getVersionName } from "../../../data/LanguageVersion";

interface SolArticleViewProps {
  solution: SolutionArticle;
}

const SolArticleView: React.FC<SolArticleViewProps> = ({ solution }) => {
  return (
    <article className="solution-article-view">
      <header className="mb-4">
        <div className="d-flex gap-3 align-items-center mb-3">
          <span className="text-muted">
            Language: {getVersionName(solution.language)}
          </span>
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

      <div className="solution-code mb-4">
        <h2 className="fs-4 mb-3">Solution Code</h2>
        <pre className="bg-light p-3 rounded">
          <code>{solution.solution}</code>
        </pre>
      </div>

      {solution.problem && (
        <div className="problem-info mt-4 p-3 bg-light rounded">
          <h3 className="fs-5 mb-3">Problem Information</h3>
          <p className="mb-2">
            <strong>Problem:</strong> {solution.problem.name}
          </p>
          {solution.problem.description && (
            <p className="mb-0">
              <strong>Description:</strong> {solution.problem.description}
            </p>
          )}
        </div>
      )}
    </article>
  );
};

export default SolArticleView;
