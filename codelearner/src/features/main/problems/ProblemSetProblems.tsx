import React from "react";
import { getProblemInPS } from "../../../service/api/problem-manage/getProblemInPS";
import { Alert, Badge, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { ProblemData } from "../../../types/content/problem.type";
import CustomPagination from "../../mislancenous/CustomPagination";
import { Link as page } from "../../../types/paginator.type";

const ProblemSetProblems: React.FC<{
  problemSetId: string;
  this_page?: string;
}> = ({ problemSetId, this_page }) => {
  const [problems, setProblems] = React.useState<ProblemData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [paginations, setPaginations] = React.useState<page[]>();

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const { data, links } = await getProblemInPS(problemSetId, this_page);
        setProblems(data);
        setPaginations(links);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [problemSetId, this_page]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (problems.length === 0) {
    return <Alert variant="info"> No data ...</Alert>;
  }

  return (
    <div className="mt-3">
      <ListGroup>
        {problems.map((problem) => (
          <ListGroup.Item key={problem.id}>
            <div className="d-flex justify-content-between">
              <Link className="text-black" to={`/problems/${problem.id}`}>
                {problem.name}
              </Link>
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
          </ListGroup.Item>
        ))}
      </ListGroup>
      {paginations && <CustomPagination links={paginations} />}
    </div>
  );
};

export default ProblemSetProblems;
