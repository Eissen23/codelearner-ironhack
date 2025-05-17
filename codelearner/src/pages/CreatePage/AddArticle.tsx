import ArticleForm from "../../features/main/article/ArticleForm";
import LayoutHome from "../../layout/LayoutHome";

const AddArticle = () => {
  return (
    <LayoutHome>
      <h2 className="h2 font-weight-bold mb-3">Add article to course</h2>
      <section className="px-4 py-3 border border-1">
        <ArticleForm />
      </section>
    </LayoutHome>
  );
};
export default AddArticle;
