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
        <span>Tag: </span>
        {articleData.tags?.map((tag) => (
          <Link to={`/problems?tagged=${tag}`}>
            <Badge className="me-2" color="primary">
              {tag}
            </Badge>
          </Link>
        ))}
      </div>
      <div className="mb-2 d-flex gap-4 flex-wrap">
        {articleData.chapter && (
          <div>
            <strong>Chapter: </strong>
            {articleData.chapter}
          </div>
        )}
      </div>
      <div className="mb-2">
        <strong>Posted At: </strong>
        {articleData.created_at.toLocaleString()}
      </div>

      <div className="mb-2">{articleData.description}</div>
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
