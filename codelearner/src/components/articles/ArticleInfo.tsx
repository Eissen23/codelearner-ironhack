import { Alert, Badge, Spinner } from "react-bootstrap";
import { useArticleInfo } from "../../features/hooks/articles/useArticleInfo";
import { Link } from "react-router";

const ArticleInfo: React.FC<{ article_id: string }> = ({ article_id }) => {
  const { articleData, loading } = useArticleInfo(article_id || "");

  if (loading) {
    return (
      <div className="d-flex">
        <Spinner animation="border"></Spinner>
        <span>Loading....</span>
      </div>
    );
  }

  if (!articleData) {
    return <Alert variant="info">Article not found</Alert>;
  }

  return (
    <article>
      <h1 className="mb-3">{articleData.name}</h1>
      <div className="mb-3">
        {articleData.tags?.map((tag) => (
          <Link to={`/problems?tagged=${tag}`}>
            <Badge className="me-2" color="primary">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="d-flex flex-wrap pb-3 border-bottom">
          {articleData.chapter && (
            <div className="me-3">
              <strong>Chapter: </strong>
              {articleData.chapter}
            </div>
          )}
        <div className="me-2">
          <i className="bi bi-calendar-fill me-2"></i>
          {new Date(articleData.created_at).toLocaleString()}
        </div>
      </div>

      <div className="mt-3 pb-3 border-bottom text-secondary fs-6">
          {articleData.description}
      </div>


      {articleData.content && (
        <div
          className="rich-text-content mt-4"
          dangerouslySetInnerHTML={{ __html: articleData.content }}
        />
      )}
    </article>
  );
};

export default ArticleInfo;
