import ProblemForm from "../../features/main/problems/ProblemsForm";
import LayoutHome from "../../layout/LayoutHome";

const AddProblem = () => {
  return (
    <LayoutHome>
      <h2 className="h2 font-weight-bold mb-3">Add problem to problem set</h2>
      <section className="px-4 py-3 border border-1">
        <ProblemForm />
      </section>
    </LayoutHome>
  );
};
export default AddProblem;
