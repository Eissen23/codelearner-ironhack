import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import styles from "./Editor.module.css";
import LanguageSelector from "./LanguageSelector";

interface CodeEditorProps {
  value?: string;
  language: string;
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
}) => {

  const internalRef = useRef<any>(null);
  const editorRef = externalRef || internalRef;
  
  const handleLanguageChange = (newLanguage: string) => {
    onLanguageChange(newLanguage);
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
      </div>
      <Editor
        theme="vs-dark"
        language={language}
        value={value}
        onMount={onMount}
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
