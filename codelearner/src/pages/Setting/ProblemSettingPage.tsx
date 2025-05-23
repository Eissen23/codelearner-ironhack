import { lazy, Suspense, useState } from "react";
const UserSolutionMod = lazy(
  () => import("../../components/solution/UserSolutionMod")
);
const SolutionArticleList = lazy(
  () => import("../../components/solution/SolutionArticleList")
);
const UserSolPublic = lazy(
  () => import("../../components/solution/UserSolPublic")
);

import useProblemDetail from "../../features/hooks/problems/useProblemDetail";
import ProblemForm from "../../features/main/problems/ProblemsForm";
import LayoutHome from "../../layout/LayoutHome";
import { Alert, Spinner, Tab, Tabs } from "react-bootstrap";
import CustomSpinner from "../../components/CustomSpinner";

const ProblemSettingPage = () => {
  const [activeTab, setActiveTab] = useState("problem_info");

  const { problemData, loading } = useProblemDetail();

  return (
    <LayoutHome>
      {!loading ? (
        <>
          <h1 className="setting page">Update the problem</h1>
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key || "problem_info")}
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
              {activeTab === "user_solution" && (
                <>
                  <section className="unpublished mb-3">
                    <Suspense fallback={CustomSpinner}>
                      <UserSolutionMod />
                    </Suspense>
                  </section>

                  <section className="solution_article mb-3">
                    <Suspense fallback={CustomSpinner}>
                      <SolutionArticleList />
                    </Suspense>
                  </section>
                  <section className="solution_article mb-3">
                    <Suspense fallback={CustomSpinner}>
                      <UserSolPublic />
                    </Suspense>
                  </section>
                </>
              )}
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
