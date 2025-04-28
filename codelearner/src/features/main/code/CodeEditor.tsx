import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector";

interface CodeEditorProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value = "",
  onChange,
  readOnly = false,
}) => {
  const [language, setLanguage] = useState("javascript");

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.Editor}>
      <div className="d-flex justify-content-between py-2 px-3 bg-black">
        <LanguageSelector language={language} onChange={handleLanguageChange} />
      </div>
      <Editor
        theme="vs-dark"
        language={language}
        value={value}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: true,
          readOnly: readOnly,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
