import ProblemSetSlide from "../../components/problemset/ProblemSetsSlide";
import ProblemList from "../../components/problems/ProblemList";
import LayoutHome from "../../layout/LayoutHome";
import Filter from "../../features/main/filter/Filter";
import { getDefaultParam } from "../../utils/getDefaultParam";

const ProblemsPage = () => {
  const { page, per_page, keyword, sort, tags } = getDefaultParam();

  return (
    <LayoutHome>
      <section className="my-3">
        <Filter problem_only={true} />
      </section>

      <section className="my-3">
        <ProblemSetSlide />
      </section>

      <section className="my-3">
        <ProblemList
          page={page}
          per_page={per_page}
          name={keyword}
          sort={sort}
          tags={tags}
        />
      </section>
    </LayoutHome>
  );
};

export default ProblemsPage;
