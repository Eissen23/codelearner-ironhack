import LayoutHome from "../../layout/LayoutHome";
import ProblemSetList from "../../features/main/problems/ProblemSetList";
import FilterBar from "../../features/main/filter/FilterBar";

const ProblemSetPage = () => {
  return (
    <LayoutHome>
      <FilterBar />
      <ProblemSetList />
    </LayoutHome>
  );
};

export default ProblemSetPage;
