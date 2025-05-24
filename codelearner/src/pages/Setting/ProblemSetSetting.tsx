import { redirect, useLoaderData, useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import ProblemSetInfoItem from "../../components/problemset/element/ProblemSetInfoItem";
import { useProblemSetsInfo } from "../../features/hooks/problemsets/useProblemSetInfo";
import { Spinner } from "react-bootstrap";
import ProblemSetProblems from "../../components/problems/ProblemSetProblems";

const ProblemSetSetting: React.FC = () => {
  const { problemSetId } = useParams<{ problemSetId: string }>();
  const { role } = useLoaderData();
  const { loading, problemSet, belong } = useProblemSetsInfo(
    problemSetId || "",
    true
  );

  if (role === "UNAUTHORIZE") {
    redirect("/not-authorized");
  }

  if (loading) {
    return (
      <LayoutHome>
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </LayoutHome>
    );
  }
  if (!problemSet) {
    return <div>No problem set information available.</div>;
  }
  if (!belong) {
    return <div>No organization information available.</div>;
  }

  return (
    <LayoutHome>
      <section className="problemset_info mb-5">
        <ProblemSetInfoItem
          problemSet={problemSet}
          loading={loading}
          org={belong}
          user_role={role}
        />
      </section>

      <section>
        <ProblemSetProblems problemSetId={problemSetId || ""} editable />
      </section>
    </LayoutHome>
  );
};

export default ProblemSetSetting;
