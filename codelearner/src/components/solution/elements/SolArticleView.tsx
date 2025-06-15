import React from "react";
import { SolutionArticle } from "../../../types/content/solution.type";
import { getSyntax, getVersionName } from "../../../data/LanguageVersion";
import { Spinner } from "react-bootstrap";
import SourceView from "../../monaco/SourceView";

interface SolArticleViewProps {
  solution: SolutionArticle;
}

const SolArticleView: React.FC<SolArticleViewProps> = ({ solution }) => {
  if (!solution) {
    return <Spinner animation="border" />;
  }

  return (
    <article className="solution-article-view p-3">
      <header className="mb-4">
        <div className="d-flex gap-3 align-items-center mb-3">
          <span className="text-muted me-3">
            Language: {getVersionName(solution.language)}
          </span>
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

      <div className="solution-code mb-4">
        <h6 className="fs-6 p-3 text-bg-dark mb-0">Solution Code</h6>
        <SourceView
          source={solution.solution}
          lang={getSyntax(solution.language)}
        />
      </div>
    </article>
  );
};

export default SolArticleView;
