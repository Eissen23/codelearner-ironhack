import { useParams } from "react-router";
import LayoutHome from "../../layout/LayoutHome";
import ProblemSetInfoItem from "../../components/problemset/element/ProblemSetInfoItem";
import { useProblemSetsInfo } from "../../features/hooks/problemsets/useProblemSetInfo";
import { Spinner } from "react-bootstrap";

const ProblemSetSetting: React.FC = () => {
  const { problemSetId } = useParams<{ problemSetId: string }>();

  const { loading, problemSet, belong } = useProblemSetsInfo(
    problemSetId || ""
  );
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
      <div>
        <ProblemSetInfoItem
          problemSet={problemSet}
          loading={loading}
          org={belong}
        />
      </div>
    </LayoutHome>
  );
};

export default ProblemSetSetting;
