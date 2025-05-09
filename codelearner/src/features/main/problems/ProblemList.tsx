import React, { useEffect, useState } from "react";
import { getProblemList } from "../../../service/api/problem-manage/getProblemList";
import { ProblemResponse } from "../../../types/content/problem.type";
import { ListGroup, Button, Spinner, Badge } from "react-bootstrap";
import { parseEscapeSequences } from "../../../utils/parseEscapeSequence";
import { Link } from "react-router";
import { Link as page } from "../../../types/paginator.type";
import CustomPagination from "../../mislancenous/CustomPagination";

const ProblemList: React.FC<{ page?: string }> = ({ page }) => {
  const [problems, setProblems] = useState<ProblemResponse | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [loading, isLoading] = useState(false);
  const [paginations, setPaginations] = useState<page[]>();

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        isLoading(true);
        const response = await getProblemList(page);
        setProblems(response);
        setPaginations(response.links);
      } catch (err) {
        console.log("An error has occured while fetching problem:", err);
      } finally {
        isLoading(false);
      }
    };

    fetchProblems();
  }, [page]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!problems) {
    return <div>No data ....</div>;
  }

  return (
    <div className="problem-list">
      <ListGroup>
        {problems.data.map((problem, index) => (
          <ListGroup.Item
            key={problem.id}
            action
            onClick={() =>
              setSelectedProblem(selectedProblem === index ? null : index)
            }
            className="mb-2"
          >
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-1">{problem.name}</h5>
                <Badge
                  bg={
                    problem.difficulty <= 3
                      ? "success"
                      : problem.difficulty <= 7
                      ? "warning"
                      : "danger"
                  }
                >
                  Difficulty: {problem.difficulty}
                </Badge>
              </div>

              {selectedProblem === index && (
                <div className="mt-3">
                  <div
                    className="overflow-scroll bg-light p-3 mb-3"
                    style={{ maxHeight: "240px" }}
                  >
                    <p style={{ whiteSpace: "pre-wrap" }}>
                      {parseEscapeSequences(problem.description)}
                    </p>
                  </div>
                  <Button variant="primary">
                    <Link
                      className="text-white text-decoration-none"
                      to={`/problems/${problem.id}`}
                    >
                      Try problem
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {paginations && <CustomPagination links={paginations} />}
    </div>
  );
};

export default ProblemList;
