import React from "react";
import { Stack } from "react-bootstrap";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LANGUAGE_MAPPING } from "../../../data/LanguageMapping";
import { createSubmission } from "../../../service/api/judge0-code/createSubmission";
import { TestCase } from "../../../types/content/problem.type";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
  testCase?: TestCase;
  onSubmit?: () => void;
}

const SandboxOutput: React.FC<OutputProps> = ({
  editorRef,
  language,
  onSubmit,
}) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState<String | null>(null);
  const [status, setStatus] = React.useState(true);

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
      result.status.id === 3
        ? setOutput(result.stdout)
        : setOutput(result.stderr);
      setStatus(result.status.id === 3);
    } catch (error) {
      setOutput("An error occurred while running the code");
      setStatus(false);
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
          onClick={onSubmit}
        >
          <IoSend className="mb-1 me-2" />
          Submit
        </button>
      </Stack>
      <div className={status ? "text-success" : "text-danger"}>
        <h6 className="fw-semibold text-uppercase">
          {status ? "Output" : "Error"}
        </h6>
        <div className="bg-secondary mx-3 mt-2 text-white rounded-2 pt-2 px-3">
          {output || "Click run to see the code"}
        </div>
      </div>
    </div>
  );
};

export default SandboxOutput;
