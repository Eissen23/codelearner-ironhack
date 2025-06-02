import React from "react";
import { Article } from "../../../types/content/article.type";
import { Link } from "react-router";

// TODO: FIX REROUTE
const ArticleSlimItem: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="article-slim-item">
      <h5 className="article-title fs-5 py-1 px-3 mb-0">
        <Link className="text-reset text-decoration-none" to={`${article.id}`}>
          {article.name}
        </Link>
      </h5>
      {article.sub_articles && (
        <ul className="article-chapter list-unstyled">
          {article.sub_articles.map((subArticle) => (
            <li key={subArticle.id} className="text-muted px-4 py-1 ">
              <Link
                className="text-reset text-decoration-none"
                to={`${subArticle.id}`}
              >
                {subArticle.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticleSlimItem;
