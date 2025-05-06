import React from "react";
import { Stack } from "react-bootstrap";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LANGUAGE_MAPPING } from "../../../data/LanguageMapping";
import { createSubmission } from "../../../service/api/judge0-code/createSubmission";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState<String>();
  const [er, setError] = React.useState(false);
  const runCode = async () => {
    if (!editorRef.current) {
      return;
    }
    const code = editorRef.current.getValue();
    const languageCode = LANGUAGE_MAPPING[language];
    if (!languageCode) {
      console.error(`Language code not found for ${language}`);
      return;
    }

    try {
      setIsRunning(true);

      const result = await createSubmission({
        source_code: code,
        language_id: languageCode,
      });
      setOutput(result.stdout);
      result.stderr ? setError(true) : setError(false);
    } catch (error) {
      setOutput("An error occurred while running the code");
      alert("Failed to run code");
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="Output">
      <Stack
        direction="horizontal"
        className="mb-2 bg-gradient border-bottom border-dark-subtle border-4 px-3 py-2"
        gap={3}
      >
        <button
          className="text-white px-3 py-2 rounded-pill border-0 btn btn-secondary"
          type="submit"
          onClick={runCode}
        >
          {isRunning ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <FaCirclePlay className="mb-1 me-2" />
          )}
          Run
        </button>
        <button
          className="ms-auto btn btn-success text-white px-3 py-2 rounded-pill"
          type="submit"
        >
          <IoSend className="mb-1 me-2" />
          Submit
        </button>
      </Stack>
      <div className={er ? "text-danger" : "text-success"}>
        {output && !er ? (
          output
        ) : (
          <div className="text-secondary">
            Click runcode to see the the output
          </div>
        )}
      </div>
    </div>
  );
};

export default Output;
