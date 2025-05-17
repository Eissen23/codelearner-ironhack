import useProblemDetail from "../../features/hooks/problems/useProblemDetail";
import ProblemForm from "../../features/main/problems/ProblemsForm";
import LayoutHome from "../../layout/LayoutHome";
import { Alert, Spinner } from "react-bootstrap";

const ProblemSettingPage = () => {
  const { problemData, loading } = useProblemDetail();

  return (
    <LayoutHome>
      {!loading ? (
        <>
          <h1 className="setting page">Update the problem</h1>
          {problemData ? (
            <ProblemForm problemData={problemData} noEdit />
          ) : (
            <Alert variant="info">No problem found</Alert>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </LayoutHome>
  );
};

export default ProblemSettingPage;
