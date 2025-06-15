import { useParams } from "react-router";
import ArticleInfo from "../../components/articles/ArticleInfo";
import LayoutHome from "../../layout/LayoutHome";
import ArticleSlimList from "../../components/courses/articles/ArticleSlimList";
import styles from "../../assets/modules/ArticleDetail.module.css"
import HeadNav from "../../components/HeadNav";

const ArticleDetail = () => {
  const { course_id, article_id } = useParams();

  return (
    <LayoutHome noGutter header={<HeadNav fixed/>}>
       <div className={styles.LeftSide}>
          <ArticleSlimList course_id={course_id || ""} editable={false} />
        </div>

      <section className={styles.ArticleDetail}>
        <div className={styles.MiddleContent}>
          <ArticleInfo article_id={article_id || ""} />
        </div>
        <div className={styles.RightSide}></div>
      </section>
    </LayoutHome>
  );
};

export default ArticleDetail;
