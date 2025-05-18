import React from "react";
import { SubmissionResponse } from "../../../../types/code/judge0.type";
import { parseEscapeSequences } from "../../../../utils/parseEscapeSequence";

const OutputTab: React.FC<{ submision: SubmissionResponse }> = ({
  submision,
}) => {
  return (
    <div
      className={submision.status.id === 3 ? "text-success" : "text-danger"}
      style={{ minHeight: "10vh", padding: "1rem 0" }}
    >
      <h6 className="fw-semibold text-uppercase ms-3">
        {submision.status.description || "Output"}
      </h6>

      <div className="mx-3  ">
        <div className="fs-6 text-white mb-1">Input:</div>
        <pre className="bg-light rounded-1 px-3 text-body">
          {submision && submision.stdin}
        </pre>
      </div>

      <div className="mx-3 ">
        <div className="fs-6 text-white mb-1"> Expected output: </div>
        <pre className="bg-light rounded-1 px-3 text-body">
          {submision && submision.expected_output}
        </pre>
      </div>

      <span className="ms-4 "> Actual output: </span>
      <div className="final_output">
        <p style={{ whiteSpace: "pre-wrap" }}>
          {submision.expected_output
            ? parseEscapeSequences(
                submision.stdout ||
                  submision.stderr ||
                  "Click run to see the code"
              )
            : "Click run to see the code"}
        </p>
      </div>
    </div>
  );
};

export default OutputTab;
