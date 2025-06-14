import React from "react";
import { Alert, Badge, Button, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import { ProblemData } from "../../types/content/problem.type";
import CustomPagination from "../../features/mislancenous/CustomPagination";
import { Link as page } from "../../types/paginator.type";
import { getProblems } from "../../service/api/problem-manage/getProblems";
import { getDefaultParam } from "../../utils/getDefaultParam";

const ProblemSetProblems: React.FC<{
  problemSetId: string;
  editable?: boolean;
}> = ({ problemSetId, editable = false }) => {
  const { page, per_page, sort, keyword } = getDefaultParam();

  const [problems, setProblems] = React.useState<ProblemData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [paginations, setPaginations] = React.useState<page[]>();

  React.useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const { data, links } = await getProblems({
          problemSetId,
          page,
          perPage: per_page,
          keyword,
          sort,
        });
        setProblems(data);
        setPaginations(links);
      } catch (error) {
        console.error("Failed to fetch problems:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [problemSetId, page, keyword, per_page, sort]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-end mb-4">
        {editable && (
          <Button variant="primary">
            <Link
              className="text-white text-decoration-none"
              to={`add-problem`}
            >
              Add problem
            </Link>
          </Button>
        )}
      </div>

      {problems.length != 0 ? (
        <ListGroup>
          {problems.map((problem) => (
            <ListGroup.Item key={problem.id}>
              <div className="d-flex justify-content-between">
                <Link
                  className="text-black"
                  to={
                    !editable
                      ? `/problems/${problem.id}`
                      : `/setting/problem/${problem.id}`
                  }
                >
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
      ) : (
        <Alert variant="info"> No data ...</Alert>
      )}
      {paginations && <CustomPagination links={paginations} />}
    </div>
  );
};

export default ProblemSetProblems;
