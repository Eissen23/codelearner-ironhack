import React from "react";
import { ResultData } from "../../../../types/code/judge0.type";

const ResultTab: React.FC<{ data?: ResultData }> = ({ data }) => {
  if (!data) {
    return (
      <div className="p-3" style={{ minHeight: "15vh" }}>
        Click run to see the output
      </div>
    );
  }

  return (
    <div className=" py-3">
      <h5 className="fs-5">Results</h5>
      <div className="row">
        <div className="col-md-3">
          <p className="mb-1">
            <strong>Status:</strong>
          </p>
          <p
            className={
              data.result === "Accepted" ? "text-success" : "text-danger"
            }
          >
            {data.result}
          </p>
        </div>
        <div className="col-md-3">
          <p className="mb-1">
            <strong>Points:</strong>
          </p>
          <p className="text-success">{data.points || 0}</p>
        </div>
        <div className="col-md-3">
          <p className="mb-1">
            <strong>Time:</strong>
          </p>
          <p>{data.time || 0} seconds</p>
        </div>
        <div className="col-md-3">
          <p className="mb-1">
            <strong>Memory:</strong>
          </p>
          <p>{data.memory || 0} KB</p>
        </div>
      </div>
    </div>
  );
};

export default ResultTab;
