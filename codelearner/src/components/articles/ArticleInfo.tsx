import { Alert, Badge, Spinner } from "react-bootstrap";
import { useArticleInfo } from "../../features/hooks/articles/useArticleInfo";
import { Link } from "react-router";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { useEffect, useRef, useMemo } from "react";

const ArticleInfo: React.FC<{ article_id: string }> = ({ article_id }) => {
  const { articleData, loading } = useArticleInfo(article_id || "");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Highlighting code blocks");
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current!.querySelectorAll("pre code[class^='language-']").forEach((block) => {
          hljs.highlightElement(block as HTMLElement);
        });
      }, 0);
    }
  }, [articleData?.content]);

  // Pre-process the HTML content with highlight.js
  const highlightedContent = useMemo(() => {
    if (!articleData?.content) return "";
    // Create a DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(articleData.content, "text/html");
    doc.querySelectorAll("pre code[class^='language-']").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
    return doc.body.innerHTML;
  }, [articleData?.content]);

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
          <Link to={`/problems?tagged=${tag}`} key={tag}>
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
          ref={contentRef}
          className="rich-text-content mt-4"
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        />
      )}
    </article>
  );
};

export default ArticleInfo;
