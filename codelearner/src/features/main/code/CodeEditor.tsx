import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector";
import { TestCase } from "../../../types/content/problem.type";
import ViewTestCase from "./ViewTestCase";
import { LANGUAGE_VERSION } from "../../../data/LanguageVersion";

interface CodeEditorProps {
  value?: string;
  language: string;
  testCase?: TestCase;
  onLanguageChange: (language: string) => void;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  editorRef?: React.RefObject<any>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value = "",
  onChange,
  readOnly = false,
  editorRef: externalRef,
  language,
  onLanguageChange,
  testCase,
}) => {
  const internalRef = useRef<any>(null);
  const editorRef = externalRef || internalRef;

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onLanguageChange(event.target.value);
  };

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
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
        <ViewTestCase testCase={testCase} />
      </div>
      <Editor
        theme="vs-dark"
        language={LANGUAGE_VERSION[language].syntax}
        value={value}
        onMount={onMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          readOnly: readOnly,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
