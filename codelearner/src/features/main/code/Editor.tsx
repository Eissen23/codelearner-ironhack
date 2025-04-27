import React from 'react';
import Editor from '@monaco-editor/react';
import styles from './Editor.module.css';

interface CodeEditorProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value = '',
  language = 'javascript',
  onChange,
  readOnly = false
}) => {
  const handleEditorChange = (value: string | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={styles.Editor}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          readOnly: readOnly,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
