import React, { useRef } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaCirclePlay } from "react-icons/fa6";
import { LANGUAGE_MAPPING } from "../../../data/LanguageMapping";
import { TestCase } from "../../../types/content/problem.type";
import { createBatchSubmission } from "../../../utils/code/createBatchSub";
import { runTestCase } from "../../../service/api/judge0-code/RunTestCase";
import {
  ResultData,
  SubmissionResponse,
} from "../../../types/code/judge0.type";
import { toast } from "react-toastify";
import { makeAnswer } from "../../../utils/code/makeAnswer";
import { useParams } from "react-router";
import OutputTab from "./element/OutputTab";
import ResultTab from "./element/ResultTab";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
  testCase?: TestCase;
  onSubmit?: () => void;
  setIsExecuted: (value: boolean) => void; // Add setIsExecuted prop
}

const CheckOutput: React.FC<OutputProps> = ({
  editorRef,
  language,
  testCase,
  setIsExecuted,
}) => {
  const { problem_id } = useParams();
  const runNumber = useRef(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState<SubmissionResponse[]>();
  const [valuation, setValuation] = React.useState<ResultData>();

  const runCode = async () => {
    if (!editorRef.current) {
      return;
    }
    const code = editorRef.current.getValue();
    if (!code) {
      toast.error("Code can't be empty");
      console.log("Code can't be empty");
      return;
    }

    const languageCode = LANGUAGE_MAPPING[language];
    if (!languageCode) {
      toast.error(`Language code not found for ${language}`, {
        position: "bottom-center",
      });
      return;
    }

    try {
      setIsRunning(true);
      const subs = createBatchSubmission(code, languageCode, testCase);

      const { submissions } = await runTestCase(subs);

      setResults(submissions);
      const userSubmit = makeAnswer(
        code,
        languageCode,
        submissions,
        problem_id || "",
        runNumber.current
      );
      setValuation(userSubmit);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRunning(false);
      setIsExecuted(true);
    }
  };

  return (
    <div className="Output pt-3 border-top border-1">
      <div className="d-flex justify-content-center">
        <button
          className="text-white btn btn-success"
          type="button"
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
          Check solution
        </button>
      </div>
      {valuation && (
        <Tabs defaultActiveKey={"result"}>
          <Tab
            className="bg-black text-white px-3"
            eventKey={`result`}
            title={`Output`}
            key={0}
          >
            <ResultTab data={valuation} />
          </Tab>
          {results?.map((result, index) => (
            <Tab
              className="bg-black text-white"
              eventKey={`output-${index}`}
              title={`Output ${index + 1}`}
              key={index + 1}
            >
              <OutputTab submision={result} />
            </Tab>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default CheckOutput;
