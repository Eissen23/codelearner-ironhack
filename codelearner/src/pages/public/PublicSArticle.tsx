import { useSArticleInfo } from "../../features/hooks/solution/useSArticleInfo";
import SolArticleView from "../../components/solution/elements/SolArticleView";
import LayoutHome from "../../layout/LayoutHome";
import { getVersionName } from "../../data/LanguageVersion";
import { Spinner } from "react-bootstrap";

const PublicSArticle = () => {
  const { loading, solution_article } = useSArticleInfo();

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <LayoutHome>
      <h2 className="text-center p-2 bg-gradient">
        {solution_article?.name ??
          `${getVersionName(solution_article?.language!)} method`}
      </h2>
      <div>
        <SolArticleView solution={solution_article!} />
      </div>
    </LayoutHome>
  );
};

export default PublicSArticle;
