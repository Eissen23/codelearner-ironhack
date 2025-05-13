import React from "react";
import { Stack, Tab, Tabs } from "react-bootstrap";
import { FaCirclePlay } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { LANGUAGE_MAPPING } from "../../../data/LanguageMapping";
import { TestCase } from "../../../types/content/problem.type";
import { createBatchSubmission } from "../../../utils/code/createBatchSub";
import { runTestCase } from "../../../service/api/judge0-code/RunTestCase";
import { parseEscapeSequences } from "../../../utils/parseEscapeSequence";

interface OutputProps {
  editorRef: React.RefObject<any>;
  language: string;
  testCase?: TestCase;
  onSubmit?: () => void;
}

const ProblemOutput: React.FC<OutputProps> = ({
  editorRef,
  language,
  testCase,
  onSubmit,
}) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [output, setOutput] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<Boolean[]>([true]);

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
      const subs = await createBatchSubmission(code, languageCode, testCase);

      const { submissions } = await runTestCase(subs);
      console.log("Submission", submissions);

      const batch_status = submissions.map((sub) => {
        return sub.status.id === 3;
      });
      const batch_outputs = submissions.map((sub) => {
        return sub.stdout || sub.stderr || "";
      });

      setStatus(batch_status);
      setOutput(batch_outputs);
    } catch (error) {
      setOutput(["An error occurred while running the code"]);
      setStatus([false]);
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
      {/* TODO: Tách rieng thành 1 element riêng, truyền submission vào, chỉ hiện thị accepted khi tất cả đều accept, nếu có 1 test case 0 dat
            hiển thị tab đấy màu đỏ, với UserSubmission, trạng thái là Wrong answer khi 1 trong các element sai, (tham khảo ở hàm wait trong code
            sevice)
          */}
      <Tabs defaultActiveKey={"output-0"} className="mb-3">
        {status.map((stat, index) => (
          <Tab
            className="bg-black"
            eventKey={`output-${index}`}
            title={`Output ${index + 1}`}
            key={index}
          >
            <div
              className={stat ? "text-success" : "text-danger"}
              style={{ height: "32vh" }}
            >
              <h6 className="fw-semibold text-uppercase ms-3">
                {stat ? "Output" : "Error"}
              </h6>
              <div className="final_output">
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {output[index]
                    ? parseEscapeSequences(output[index])
                    : "Click run to see the code"}
                </p>
              </div>
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ProblemOutput;
