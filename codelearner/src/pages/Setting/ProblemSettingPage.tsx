import { lazy, Suspense } from "react";
const UserSolutionMod = lazy(
  () => import("../../components/solution/UserSolutionMod")
);
const SolutionArticleList = lazy(
  () => import("../../components/solution/SolutionArticleList")
);

import useProblemDetail from "../../features/hooks/problems/useProblemDetail";
import ProblemForm from "../../features/main/problems/ProblemsForm";
import LayoutHome from "../../layout/LayoutHome";
import { Alert, Spinner, Tab, Tabs } from "react-bootstrap";
import CustomSpinner from "../../components/CustomSpinner";

const ProblemSettingPage = () => {
  const { problemData, loading } = useProblemDetail();

  return (
    <LayoutHome>
      {!loading ? (
        <>
          <h1 className="setting page">Update the problem</h1>
          <Tabs
            defaultActiveKey="problem_info"
            id="problemInfo"
            className="mb-3"
          >
            <Tab eventKey="problem_info" title="Problem Info">
              {problemData ? (
                <ProblemForm problemData={problemData} noEdit />
              ) : (
                <Alert variant="info">No problem found</Alert>
              )}
            </Tab>
            <Tab eventKey="user_solution" title="Available Solution">
              <section className="unpublished">
                <Suspense fallback={CustomSpinner}>
                  <UserSolutionMod />
                </Suspense>
              </section>

              <section className="solution_article mb-3">
                <Suspense fallback={CustomSpinner}>
                  <SolutionArticleList />
                </Suspense>
              </section>
            </Tab>
          </Tabs>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </LayoutHome>
  );
};

export default ProblemSettingPage;
