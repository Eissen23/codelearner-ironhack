import React, { useRef, useState } from "react";
import Split from "react-split";
import CodeEditor from "../../features/main/code/CodeEditor";
import "../../assets/style/Code.css";
import LayoutHome from "../../layout/LayoutHome";
import ProblemDescription from "../../components/problems/ProblemDescription";
import ProblemOutput from "../../features/main/code/ProblemOutput";
import useProblemDetail from "../../features/hooks/problems/useProblemDetail";

const ProblemDetail: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("javascript");

  const { problemData } = useProblemDetail();
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
              testCase={problemData?.test_cases}
              editorRef={editorRef}
              language={language}
              onLanguageChange={setLanguage}
            />
            <ProblemOutput
              editorRef={editorRef}
              language={language}
              testCase={problemData?.test_cases}
            />
          </Split>
        </Split>
      </LayoutHome>
    </div>
  );
};

export default ProblemDetail;
