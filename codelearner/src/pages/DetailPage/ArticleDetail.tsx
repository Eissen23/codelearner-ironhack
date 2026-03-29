import { useParams } from "react-router";
import ArticleInfo from "../../components/articles/ArticleInfo";
import LayoutHome from "../../layout/LayoutHome";
import ArticleSlimList from "../../components/courses/articles/ArticleSlimList";
import styles from "../../assets/modules/ArticleDetail.module.css"
import HeadNav from "../../components/HeadNav";
import { useState } from "react";
import RelatedProblem from "../../components/articles/RelatedProblem";

const ArticleDetail = () => {
  const { course_id, article_id } = useParams();
  const [tags, setTags] = useState<string[]>([]);

  const fetchTags = (tags: string[]) => {
    setTags(tags);
  }
  return (
    <LayoutHome noGutter header={<HeadNav fixed/>}>
       <div className={styles.LeftSide}>
          <ArticleSlimList course_id={course_id || ""} editable={false} />
        </div>

      <section className={styles.ArticleDetail}>
        <div className={styles.MiddleContent}>
          <ArticleInfo article_id={article_id || ""} fetchTags={fetchTags} />
        </div>
        <div className={styles.RightSide}>
            <RelatedProblem per_page="5" tags={tags.join(",")}/>
        </div>
      </section>
    </LayoutHome>
  );
};

export default ArticleDetail;
