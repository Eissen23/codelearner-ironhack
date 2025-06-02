import React from "react";
import { useSArticleInfo } from "../../features/hooks/solution/useSArticleInfo";
import { Container, Spinner } from "react-bootstrap";
import SolutionArticleForm from "../../features/main/solution/SolutionArticleForm";
import LayoutHome from "../../layout/LayoutHome";

const SolArticle: React.FC = () => {
  const { loading, solution_article } = useSArticleInfo();
  return (
    <LayoutHome noGutter>
      <div className="py-1 bg-gradient mb-3 text-center">
        <h1 className="fs-4">Update solution</h1>
      </div>
      <Container>
        {loading ? (
          <div className="d-flex justify-content-center h-100 align-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <section className="solution_article_info">
            <SolutionArticleForm initialData={solution_article} update />
          </section>
        )}
      </Container>
    </LayoutHome>
  );
};

export default SolArticle;
