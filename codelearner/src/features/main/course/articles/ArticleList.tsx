import React, { useState } from "react";
import { getArticleFromCourse } from "../../../../service/api/article-manage/getArticle";
import { Article } from "../../../../types/content/article.type";
import { Accordion } from "react-bootstrap";

const ArticleList: React.FC<{ course_id: string }> = ({ course_id }) => {
  const [articles, setArticle] = useState<Article[]>();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const { articles } = await getArticleFromCourse(course_id);
        setArticle(articles.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [course_id]);

  if (loading) {
    return <div>Is loading ...</div>;
  }

  return (
    <div className="article_list">
      <h4>Chapter in course</h4>
      <Accordion defaultActiveKey="0" flush>
        {articles?.map((article) => (
          <Accordion.Item
            key={article.id}
            eventKey={article.id}
            className="mb-3"
          >
            <Accordion.Header>{article.name}</Accordion.Header>
            <Accordion.Body>
              <p>{article.description}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ArticleList;
