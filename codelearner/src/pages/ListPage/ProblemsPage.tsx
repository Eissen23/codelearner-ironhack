import { useParams } from "react-router";
import ProblemSetSlide from "../../components/problemset/ProblemSetsSlide";
import ProblemList from "../../features/main/problems/ProblemList";
import LayoutHome from "../../layout/LayoutHome";
import { getParamFromUrl } from "../../utils/getParamFromUrl";

const ProblemsPage = () => {
  useParams();
  const page = getParamFromUrl("page");

  return (
    <LayoutHome>
      <section className="my-3">
        <ProblemSetSlide />
      </section>

      <section className="my-3">
        <ProblemList page={page || ""} />
      </section>
    </LayoutHome>
  );
};

export default ProblemsPage;
