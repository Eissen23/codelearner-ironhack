import React, { useEffect, useRef, useState } from "react";
import Split from "react-split";
import CodeEditor from "../../features/main/code/CodeEditor";
import "../../assets/style/Code.css";
import LayoutHome from "../../layout/LayoutHome";
import { useParams } from "react-router";
import { getProblemByID } from "../../service/api/problem-manage/getProblemById";
import { ProblemData } from "../../types/content/problem.type";
import ProblemDescription from "../../components/problems/ProblemDescription";
import ProblemOutput from "../../features/main/code/ProblemOutput";

const ProblemDetail: React.FC = () => {
  const { problem_id } = useParams<{ problem_id: string }>();
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("javascript");
  const [problemData, setProblemData] = useState<ProblemData>();

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const { problem } = await getProblemByID(problem_id || "");
        setProblemData(problem);
      } catch (error) {
        throw error;
      }
    };

    fetchProblemData();
  }, [problem_id]);
  // const handleSubmit = () => {
  //   // Handle submission logic here
  // };

  return (
    <div>
      <LayoutHome noGutter>
        <Split className="split">
          <ProblemDescription problem={problemData} />
          <Split
            className="vertical-split"
            direction="vertical"
            minSize={100}
            maxSize={1000}
            gutterSize={5}
            gutterAlign="end"
          >
            <CodeEditor
              testCase={problemData?.test_case}
              editorRef={editorRef}
              language={language}
              onLanguageChange={setLanguage}
            />
            <ProblemOutput
              editorRef={editorRef}
              language={language}
              testCase={problemData?.test_case}
            />
          </Split>
        </Split>
      </LayoutHome>
    </div>
  );
};

export default ProblemDetail;
