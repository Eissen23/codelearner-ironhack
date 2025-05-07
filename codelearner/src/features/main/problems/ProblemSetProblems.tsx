import React from "react";
import { getProblemInPS } from "../../../service/api/problem-manage/getProblemInPS";
import { Alert, Badge, ListGroup } from "react-bootstrap";
import { Link } from "react-router";
import { ProblemData } from "../../../types/content/problem.type";

const ProblemSetProblems: React.FC<{ problemSetId: string }> = ({
  problemSetId,
}) => {
  const [problems, setProblems] = React.useState<ProblemData[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const { data } = await getProblemInPS(problemSetId);
        setProblems(data);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [problemSetId]);

  if (loading) {
    return <div> is Loading ....</div>;
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
              <Badge bg="secondary">Easy</Badge>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProblemSetProblems;
