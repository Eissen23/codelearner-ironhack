import React from "react";
import { Accordion, Alert } from "react-bootstrap";
import { useArticles } from "../../../features/hooks/articles/useArticles";

import ArticleSlimItem from "../../articles/element/ArticleSlimItem";

const ArticleSlimList: React.FC<{ course_id: string; editable?: boolean }> = ({
  course_id,
}) => {
  const { articles, loading } = useArticles(course_id);

  if (loading) {
    return <div>Is loading ...</div>;
  }

  if (!articles) {
    return <Alert variant="info"> No article for this course</Alert>;
  }
  if (articles?.length < 0) {
    return <Alert variant="info"> No article for this course</Alert>;
  }

  return (
    <div className="article_list">
      <Accordion defaultActiveKey="0" flush>
        {articles?.map((article) => (
          <ArticleSlimItem article={article} />
        ))}
      </Accordion>
    </div>
  );
};

export default ArticleSlimList;
