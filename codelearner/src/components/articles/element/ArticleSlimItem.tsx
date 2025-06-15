import React from "react";
import { Article } from "../../../types/content/article.type";
import { Link, useParams } from "react-router";
import { isActiveArticle, isActiveSubArticle } from "../../../features/functions/isActiveArticle";



// TODO: FIX REROUTE
const ArticleSlimItem: React.FC<{ article: Article }> = ({ article }) => {
  const {course_id} = useParams();
  const c_active = isActiveArticle(article.id) ? "text-bg-primary rounded": "";
  

  return (
    <div className="article-slim-item mx-2">
      <div className={`article-title fs-6 py-1 px-3 mb-0 ${c_active}`}>
        <Link className="text-reset text-decoration-none" to={`/courses/${course_id}/articles/${article.id}`}>
          {article.name}
        </Link>
      </div>
      {article.sub_articles && (
        <ul className="article-chapter list-unstyled">
          {article.sub_articles.map((subArticle) => (
            <li key={subArticle.id} className={`text-muted px-4 py-1 ${isActiveSubArticle(subArticle.id) && "text-primary"}`} >
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
