import { FaMemory } from "react-icons/fa";
import { PiSpeedometerBold } from "react-icons/pi";
import useSubInfo from "../../../features/hooks/submissions/useSubInfo";
import { Alert, Spinner } from "react-bootstrap";
import SourceView from "../../monaco/SourceView";
import { getLanguageKey } from "../../../data/LanguageMapping";
import { parseEscapeSequences } from "../../../utils/parseEscapeSequence";
import React from "react";

const SubmissionInfo: React.FC<{ user_sub_id: string }> = ({ user_sub_id }) => {
  const { problemData, submissionData, loading } = useSubInfo(
    user_sub_id || ""
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!submissionData) {
    return <Alert variant="info">No submission</Alert>;
  }
  if (!problemData) {
    return;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h3>Problem</h3>
          <div className="card">
            <div
              className="card-body"
              style={{ height: "45vh", overflow: "scroll" }}
            >
              <h5 className="card-title">{problemData.name}</h5>
              {problemData?.is_rich_text ? (
                <div
                  className="rich-text"
                  dangerouslySetInnerHTML={{
                    __html: problemData.description,
                  }}
                />
              ) : (
                <p style={{ whiteSpace: "pre-wrap" }}>
                  {parseEscapeSequences(problemData.description)}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h3>Submission</h3>
          <div className="card">
            <div className="card-body bg-black">
              <SourceView
                source={submissionData.source_code}
                lang={getLanguageKey(submissionData.language_id)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex gap-2 justify-content-between">
        <h5 className="display-5 fw-bold">Stats:</h5>

        <div className="points">
          <div className="display-6 fw-bold">{submissionData.points}</div>
          <span>Points</span>
        </div>

        <div className="memory">
          <div className="display-6 fw-bold">
            {submissionData.memory} <FaMemory />
          </div>
          <span> Memory used: Kilobytes</span>
        </div>

        <div className="time">
          <div className="display-6 fw-bold">
            {submissionData.time} <PiSpeedometerBold />
          </div>
          <span> Time runned: seconds</span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionInfo;
