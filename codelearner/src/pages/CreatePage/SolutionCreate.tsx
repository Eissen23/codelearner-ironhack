import React from "react";
import LayoutHome from "../../layout/LayoutHome";
import SolutionArticleForm from "../../features/main/solution/SolutionArticleForm";

const SolutionCreate: React.FC = () => {
  return (
    <LayoutHome>
      <h1 className="fs-4">Create Solution</h1>
      <section className="solution_form">
        <SolutionArticleForm />
      </section>
    </LayoutHome>
  );
};

export default SolutionCreate;
