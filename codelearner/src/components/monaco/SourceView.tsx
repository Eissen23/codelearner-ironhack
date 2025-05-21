import { Editor } from "@monaco-editor/react";
import { FC } from "react";

interface SourceViewProps {
  source: string;
  lang: string;
}

const SourceView: FC<SourceViewProps> = ({ source, lang }) => {
  return (
    <Editor
      height="300px"
      defaultLanguage={lang}
      value={source}
      theme="vs-dark"
      options={{
        readOnly: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: "on",
        renderLineHighlight: "all",
        automaticLayout: true,
      }}
    />
  );
};

export default SourceView;
