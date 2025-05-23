import React from "react";
import { useSArticleInfo } from "../../features/hooks/solution/useSArticleInfo";
import { Spinner } from "react-bootstrap";
import SolutionArticleForm from "../../features/main/solution/SolutionArticleForm";
import LayoutHome from "../../layout/LayoutHome";

const SolArticle: React.FC = () => {
  const { loading, solution_article } = useSArticleInfo();
  return (
    <LayoutHome>
      <h2 className="fs-4">Update solution</h2>
      {loading ? (
        <div className="d-flex justify-content-center h-100 align-content-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <section className="solution_article_info">
          <SolutionArticleForm initialData={solution_article} update />
        </section>
      )}
    </LayoutHome>
  );
};

export default SolArticle;
