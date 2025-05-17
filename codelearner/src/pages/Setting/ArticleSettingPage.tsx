import { useArticleInfo } from "../../features/hooks/articles/useArticleInfo";
import { useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import ArticleForm from "../../features/main/article/ArticleForm";
import { Spinner } from "react-bootstrap";

const ArticleSettingPage = () => {
  const { article_id } = useParams();
  const { articleData, loading } = useArticleInfo(article_id || "");
  return (
    <LayoutHome>
      {!loading ? (
        <>
          <h1 className="setting page"></h1>
          <ArticleForm articleData={articleData} nonEdit />
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </LayoutHome>
  );
};

export default ArticleSettingPage;
