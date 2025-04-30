import { useEffect, useState } from "react";
import { getProblemList } from "../../../service/api/problem-manage/getProblemList";
import { ProblemResponse } from "../../../types/problem.type";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { parseEscapeSequences } from "../../../utils/parseEscapeSequence";

const ProblemList = () => {
  const [problems, setProblems] = useState<ProblemResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getProblemList();
        setProblems(response);
        // console.log(response);
      } catch (err) {
        setError("Failed to fetch problems");
      }
    };

    fetchProblems();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!problems) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }

  return (
    <div className="problem-list">
      <Accordion>
        {problems.data.map((problem, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header>
              <div className="d-flex w-100">
                <span>{problem.name}</span>
                <span className="ms-3">Difficulty: {problem.difficulty}</span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {parseEscapeSequences(problem.description)}
              </p>
              <Button variant="primary">View Problem</Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* {problems.links && (
        <div className="pagination">
          {problems.links.map((link, index) => (
            <button 
              key={index}
              className={`page-link ${link.active ? 'active' : ''}`}
              disabled={!link.url}
            >
              {link.label}
            </button>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default ProblemList;
