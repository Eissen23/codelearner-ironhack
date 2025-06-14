import React, { useRef } from "react";
import { Stack, Tab, Tabs } from "react-bootstrap";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LANGUAGE_MAPPING } from "../../../data/LanguageMapping";
import { ProblemData } from "../../../types/content/problem.type";
import { createBatchSubmission } from "../../../utils/code/createBatchSub";
import { runTestCase } from "../../../service/api/judge0-code/RunTestCase";
import {
  ResultData,
  SubmissionResponse,
} from "../../../types/code/judge0.type";
import { toast, ToastContainer } from "react-toastify";
import { makeAnswer } from "../../../utils/code/makeAnswer";
import { useParams } from "react-router";
import { submitAnswer } from "../../../service/user-service/submission/submitAnswer";
import { getAuthToken } from "../../../config/loader/getLocalItem";
import OutputTab from "./element/OutputTab";
import ResultTab from "./element/ResultTab";
import PopupAIEval from "./ai-element/PopupAIEval";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
  problemData?: ProblemData;
  onSubmit?: () => void;
}

const ProblemOutput: React.FC<OutputProps> = ({
  editorRef,
  language,
  problemData,
}) => {
  const { problem_id } = useParams();
  const token = getAuthToken();

  const runNumber = useRef(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState<SubmissionResponse[]>();
  const [valuation, setValuation] = React.useState<ResultData>();
  const testCase = problemData?.test_cases;

  const runCode = async () => {
    if (!editorRef.current) {
      return;
    }
    const code = editorRef.current.getValue();
    if (!code) {
      toast.error("Code can't be empty", {
        position: "bottom-center",
      });
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
      runNumber.current += 1;
    }
  };

  const submitCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!token) {
      toast.error("Login for this feature", {
        position: "bottom-center",
      });
      return;
    }
    const allow = confirm("Do you want to submit this code");

    if (!allow) {
      return;
    }

    // Probably error here
    if (!valuation) {
      await runCode();
    }

    const userSubmit = makeAnswer(
      editorRef.current.getValue(),
      LANGUAGE_MAPPING[language],
      results,
      problem_id || "",
      runNumber.current
    );
    try {
      setIsRunning(true);
      await submitAnswer(token, userSubmit);
      toast.success("Submission success", {
        position: "bottom-center",
      });
      setValuation(userSubmit);
    } catch (error) {
      toast.error("Submission failed", {
        position: "bottom-center",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="Output">
      <ToastContainer />
      <Stack
        direction="horizontal"
        className="mb-2 bg-dark border-bottom border-dark-subtle border-4 px-3 py-2"
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
          onClick={submitCode}
        >
          <IoSend className="mb-1 me-2" />
          Submit
        </button>
      </Stack>

      <Tabs defaultActiveKey={"result"}>
        <Tab className="bg-black" eventKey={`result`} title={`Output`} key={0}>
          <ResultTab data={valuation} />
          <PopupAIEval data={valuation} problemData={problemData} />
        </Tab>
        {results?.map((result, index) => (
          <Tab
            className="bg-black"
            eventKey={`output-${index}`}
            title={`Output ${index + 1}`}
            key={index + 1}
          >
            <OutputTab submision={result} />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ProblemOutput;
