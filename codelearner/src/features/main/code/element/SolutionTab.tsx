import React from "react";
import { useSArticleInfo } from "../../../hooks/solution/useSArticleInfo";
import SolArticleView from "../../../../components/solution/elements/SolArticleView";
import { Spinner } from "react-bootstrap";

const SolutionTab: React.FC<{ solution_id: string }> = ({ solution_id }) => {
  const { solution_article, loading } = useSArticleInfo(solution_id);

  if (loading) {
    return (
      <>
        <h4>Solution</h4>
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Spinner animation="border" />
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="px-3 mt-3">Solution</h4>
      <SolArticleView solution={solution_article!} />
    </>
  );
};

export default SolutionTab;
