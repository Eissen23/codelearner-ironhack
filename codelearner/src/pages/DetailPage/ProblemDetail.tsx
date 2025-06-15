import React, { lazy, Suspense, useRef, useState } from "react";
import Split from "react-split";
import CodeEditor from "../../features/main/code/CodeEditor";
import "../../assets/style/Code.css";
import LayoutHome from "../../layout/LayoutHome";
import ProblemDescription from "../../components/problems/ProblemDescription";
import ProblemOutput from "../../features/main/code/ProblemOutput";
import useProblemDetail from "../../features/hooks/problems/useProblemDetail";
import { Button, Tab, Tabs } from "react-bootstrap";
const SolutionArticleList = lazy(
  () => import("../../components/solution/SolutionArticleList")
);
const UserSolPublic = lazy(
  () => import("../../components/solution/UserSolPublic")
);
import CustomSpinner from "../../components/CustomSpinner";
import { useSearchParams } from "react-router";
import UserSolutionTab from "../../features/main/code/element/UserSolutionTab";
const SolutionTab = lazy(
  () => import("../../features/main/code/element/SolutionTab")
);

const ProblemDetail: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("javascript");
  const [activeTab, setActiveTab] = useState("description");
  const { problemData } = useProblemDetail();
  const [solutionParams, setSolutionParam] = useSearchParams();
  const sol = solutionParams.get("solution");
  const user_sol = solutionParams.get("user-sol");

  console.log("sol, usersol:", sol, user_sol);

  return (
    <div className="problem_detail">
      <LayoutHome noGutter>
        <Split className="split">
          <div>
            <Tabs
              activeKey={activeTab}
              onSelect={(key) => setActiveTab(key || "description")}
              className="bg-black"
            >
              <Tab title="Problem Description" eventKey="description">
                <ProblemDescription problem={problemData} />
              </Tab>
              <Tab title="Solution" eventKey="solution">
                {activeTab === "solution" && (
                  <div className="px-3">
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
                  </div>
                )}
              </Tab>
              {sol && (
                <Tab title="Detail Solution" eventKey="detail_solution">
                  <Button className="float-end me-3"
                    onClick={() => setSolutionParam("")}
                    variant="outline-danger"
                    size="sm"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </Button>
                  {activeTab === "detail_solution" && (
                    <Suspense fallback={CustomSpinner}>
                      <SolutionTab solution_id={sol} />
                    </Suspense>
                  )}
                </Tab>
              )}
              {user_sol && (
                <Tab title="Detail Solution" eventKey="detail_solution">
                  <Button
                    className="float-end me-3"
                    onClick={() => setSolutionParam("")}
                    variant="outline-danger"
                    size="sm"
                  >
                    <i className="bi bi-x-circle-fill"></i>
                  </Button>
                  {activeTab === "detail_solution" && (
                    <Suspense fallback={CustomSpinner}>
                      <UserSolutionTab user_sol_id={user_sol} />
                    </Suspense>
                  )}
                </Tab>
              )}
            </Tabs>
          </div>
          {/* <ProblemDescription problem={problemData} /> */}
          <Split
            className="vertical-split"
            direction="vertical"
            minSize={100}
            maxSize={1000}
            gutterSize={5}
            gutterAlign="end"
          >
            <CodeEditor
              testCase={problemData?.test_cases}
              editorRef={editorRef}
              language={language}
              onLanguageChange={setLanguage}
            />
            <ProblemOutput
              editorRef={editorRef}
              language={language}
              problemData={problemData}
            />
          </Split>
        </Split>
      </LayoutHome>
    </div>
  );
};

export default ProblemDetail;
