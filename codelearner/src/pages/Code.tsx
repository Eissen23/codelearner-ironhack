import React, { useRef, useState } from 'react';
import Split from "react-split";
import Problem from "../components/Problem";
import CodeEditor from "../features/main/code/CodeEditor";
import "../assets/style/Code.css";
import LayoutHome from "../layout/LayoutMain";
import Output from "../features/main/code/Output";

const Code: React.FC = () => {
  const editorRef = useRef<any>(null);
  const [language, setLanguage] = useState("javascript");

  return (
    <div>
      <LayoutHome noGutter>
        <Split className="split">
          <Problem />
          <Split
            className="vertical-split"
            direction="vertical"
            minSize={100}
            maxSize={1000}
            gutterSize={5}
            gutterAlign="end"
          >
            <CodeEditor editorRef={editorRef} language={language} onLanguageChange={setLanguage} />
            <Output editorRef={editorRef} language={language} />
          </Split>
        </Split>
      </LayoutHome>
    </div>
  );
};

export default Code;
