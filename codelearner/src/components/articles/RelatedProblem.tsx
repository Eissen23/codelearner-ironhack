import React, { useState } from "react";
import { ProblemResponse } from "../../types/content/problem.type";
import { ListGroup, Spinner, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getProblems } from "../../service/api/problem-manage/getProblems";

const RelatedProblem: React.FC<{
  page?: string;
  per_page?: string;
  name?: string;
  sort?: string;
  tags?: string;
}> = ({ page, name, sort, per_page, tags }) => {
  const [problems, setProblems] = useState<ProblemResponse | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [loading, isLoading] = useState(false);

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        isLoading(true);
        const response = await getProblems({
          page,
          perPage: per_page,
          keyword: name,
          sort,
          tagged: tags,
        });
        setProblems(response);
      } catch (err) {
        console.log("An error has occured while fetching problem:", err);
      } finally {
        isLoading(false);
      }
    };

    fetchProblems();
  }, [page, per_page, name, sort, tags]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!problems?.data.length) {
    return <div></div>;
  }

  return (
    <div className="">
      <h3 className="mb-3 fs-5 fw-bold">Related Problems</h3>
      <ListGroup variant="flush">
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
              <Link to={`/problems/${problem.id}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-1 fs-6">
                    {problem.name.length > 25
                      ? problem.name.slice(0, 25) + "..."
                      : problem.name}
                  </h5>
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
              </Link>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {tags && (
        <Link to={`/problems?tags=${tags}`} className="d-block text-center">
          View more
        </Link>
      )}
    </div>
  );
};

export default RelatedProblem;
